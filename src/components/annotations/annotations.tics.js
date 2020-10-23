import React, { useState, useEffect } from 'react'
import { css } from 'linaria'
import { CardPositioning, Quote, CreatedDate } from './annotations.card' // CardWrapper
import { AnnotationMenu } from './annotations.menu'
import classNames from 'classnames'

const ticTray = css`
  position: fixed;
  z-index: 2;
  top: 0;
  width: 350px;
  height: 100vh;
  transform: translateX(-500px);
  transition: transform 200ms ease-in-out;
  &.visible {
    transform: translateX(-320px);
    transition-delay: 70ms;
  }
  pointer-events: none;
`

const ticWrapper = css`
  position: absolute;
  left: 0;
  padding: 3px 0;
  width: 100%;
  z-index: 100;
  cursor: pointer;
  transition: transform 0 ease-in-out;
  &,
  &.loading {
    transform: translate(-100px, 0);
  }
  &.active {
    transition: transform 250ms ease-in-out;
    transform: translate(5px, -2px);
  }
  &.loaded {
    transition: transform 250ms ease-in-out;
    transform: translate(0, 0);
  }
`

const anchorWrapper = css`
  pointer-events: auto;
  position: relative;
  width: calc(100% - 6px);
  height: 3px;
  background-color: var(--color-amber);
  border-radius: 0 4px 4px 0;
`

const flyAwayWrapper = css`
  padding: 0 20px;
  position: absolute;
  transition: transform 150ms ease-in-out, opacity 125ms ease-in-out 0ms;
  transform: translate(250px, -40px);
  pointer-events: none;
  opacity: 0;
  &.show {
    transform: translate(350px, -40px);
    opacity: 1;
    pointer-events: auto;
    transition: transform 150ms ease-in-out, opacity 100ms ease-in-out 50ms;
  }
`

const menuWrapper = css`
  min-width: 200px;
  list-style-type: none;
  padding-left: 0;
  transform: translate(-24px, -20px);
  position: absolute;
  bottom: 0;
  right: -32px;
  z-index: var(--zIndexModal);

  button {
    box-shadow: none;
  }
  button .icon {
    margin-top: -5px;
  }

  & > div {
    right: 0;
    text-align: right;
  }
`

const floatingCardStyles = css`
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.15);
  position: relative;
`

const Card = ({ annotation, shareItem, shareData, deleteAnnotation }) => {
  return annotation ? (
    <CardPositioning
      show
      onClick={(e) => e.stopPropagation()}
      key={annotation.annotation_id}
      addedStyles={floatingCardStyles}>
      {' '}
      {/*activeCardStyles, */}
      <Quote
      // aria-label={translate('annotations.scrollTo')}
      /* onClick={() => onClickEvent(annotation.position)} */
      >
        {annotation.quote}
      </Quote>
      <CreatedDate>{annotation.created_at}</CreatedDate>
      <div className={menuWrapper}>
        <AnnotationMenu
          visible
          id={annotation.annotation_id}
          shareItem={shareItem}
          shareData={shareData}
          quote={annotation.quote}
          deleteAnnotation={deleteAnnotation}
        />
      </div>
    </CardPositioning>
  ) : null
}

const HighlightIndex = ({
  annotation,
  onClickEvent,
  top,
  shareItem,
  shareData,
  deleteAnnotation,
  children
}) => {
  const [hoverOpen, setHover] = useState(false)
  const [shareOpen, setShare] = useState(false)
  const [loading, setLoading] = useState(!annotation?.created_at)
  let timer

  useEffect(() => {
    setLoading(false)

    return () => clearTimeout(timer)
  }, [])

  const itemHoverOn = () => {
    clearTimeout(timer)
    setHover(true)
  }

  const itemHoverOff = () => {
    timer = setTimeout(() => {
      closeMenu()
    }, 500)
  }

  const closeMenu = () => {
    if (hoverOpen) {
      setHover(false)
      setShare(false)
    }
  }

  const onItemClick = (e) => {
    e.stopPropagation()
    onClickEvent(annotation.position)
  }

  const onScreen = false
  // const onScreen = yCoord > viewPort.top && yCoord < viewPort.bottom
  const activeClass = onScreen ? 'active' : 'loaded'
  const className = loading ? 'loading' : activeClass

  return (
    <div
      onMouseEnter={itemHoverOn}
      onMouseLeave={itemHoverOff}
      onClick={onItemClick}
      className={classNames(ticWrapper, className)}
      style={{ top }}>
      <div className={anchorWrapper}>
        <div className={classNames(flyAwayWrapper, { show: hoverOpen })}>
          <Card
            annotation={annotation}
            // active={onScreen}
            shareItem={shareItem}
            shareData={shareData}
            deleteAnnotation={deleteAnnotation}
          />
        </div>
        {children}
      </div>
    </div>
  )
}

export const TicList = ({
  onClickEvent,
  annotations,
  shareItem,
  shareData,
  deleteAnnotation,
  visible
}) => {
  const renderTics = () => {
    let body = document.body
    let html = document.documentElement

    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    )

    const screenHeight =
      Math.max(document.documentElement.clientHeight, window.innerHeight || 0) -
      105 // 75 for navbar height, 30 for extra top and bottom padding

    const tics = []

    annotations.forEach((annot) => {
      let percent = annot.position / docHeight
      let top = Math.round(percent * screenHeight) + 75 // top padding

      tics.push(
        <HighlightIndex
          key={annot.id}
          // yCoord={key}
          annotationId={annot.id}
          top={top}
          annotation={annot}
          onClickEvent={onClickEvent}
          shareItem={shareItem}
          shareData={shareData}
          deleteAnnotation={deleteAnnotation}
          // disabled={!visible || firstTime}
        />
      )
    })

    return tics
  }

  return annotations ? (
    <div className={classNames(ticTray, { visible })}>{renderTics()}</div>
  ) : null
}
