import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { css } from 'linaria'

import { OverflowMenuIcon } from '@pocket/web-ui'
import { IosShareIcon } from '@pocket/web-ui'
import { DeleteIcon } from '@pocket/web-ui'
import { PopupMenuGroup } from '@pocket/web-ui'
import { PopupMenuItem } from '@pocket/web-ui'

import { buttonReset } from 'components/buttons/button-reset'
import { ShareMenu } from 'components/share-menu/share-menu'
import { overlayBase } from 'components/overlay/overlay'

const inlineMenuStyles = css`
  position: absolute;
`

const buttonStyles = css`
  background: var(--color-popoverCanvas);
  color: var(--color-textSecondary);
  font-size: var(--size150);
  border-radius: 50%;
  height: 32px;
  width: 32px;
  text-align: center;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.15);
  transform: translate(-24px, -24px);
  opacity: 0;
  transition: opacity 200ms ease-in-out 600ms;

  &.visible,
  &:hover {
    opacity: 1;
    transition: opacity 150ms ease-in-out 0ms;
  }

  &:hover {
    color: var(--color-textPrimary);
    background-color: var(--color-actionPrimarySubdued);
  }
  .icon {
    margin-top: 0;
  }
`

const relativeWrapper = css`
  position: relative;
`

const menuWrapper = css`
  min-width: 200px;
  list-style-type: none;
  padding-left: 0;
  transform: translate(-24px, -20px);
  position: absolute;
  top: 0;
  left: 0;
  z-index: var(--zIndexTooltip);

  & > li {
    padding: 0;
  }

  &.alignRight {
    left: -160px;
  }
  &.flipDirection  {
    bottom: -24px;
    top: unset;
  }
`

export const AnnotationMenu = ({
  alignRight,
  visible,
  top = 0,
  left = 0,
  shareItem,
  shareData,
  quote,
  id,
  deleteAnnotation
}) => {
  const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  const [shareOpen, setShareOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [flipDirection, setFlipDirection] =  useState(false)
  const selfRef = useRef(null)
  let timer

  useEffect(() => {
    return () => clearTimeout(timer)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const startTimer = () => {
    timer = setTimeout(() => {
      setMenuOpen(false)
      setShareOpen(false)
    }, 1000)
  }

  const checkDirection = () => {
    if (selfRef.current.getBoundingClientRect().top > screenHeight/2) {
      setFlipDirection(true)
    }
    else {
      setFlipDirection(false)
    }
  }

  const clearTimer = () => clearTimeout(timer)

  const toggleShare = () => {
    checkDirection()
    setShareOpen(!shareOpen)
  }

  const toggleMenu = () => {
    checkDirection()
    setMenuOpen(!menuOpen)
  }

  const handleDelete = () => {
    deleteAnnotation(id)
  }

  const handleShare = (destination) => {
    shareItem({
      destination,
      quote
    })
  }

  return (
    <div className={inlineMenuStyles} style={{ top, left }}>
      <div className={relativeWrapper}>
        <button
          ref={selfRef}
          onClick={toggleMenu}
          className={classNames(buttonReset, buttonStyles, { visible })}>
          <OverflowMenuIcon />
        </button>
        {menuOpen ? (
          shareOpen ? (
            <ul
              onMouseEnter={clearTimer}
              onMouseLeave={startTimer}
              className={classNames(menuWrapper, { alignRight, flipDirection })}>
              <ShareMenu shareItem={handleShare} quote={quote} {...shareData} />
            </ul>
          ) : (
            <ul
              onMouseEnter={clearTimer}
              onMouseLeave={startTimer}
              className={classNames(overlayBase, menuWrapper, { alignRight, flipDirection })}>
              <PopupMenuGroup>
                <PopupMenuItem onClick={handleDelete} icon={<DeleteIcon />}>
                  Delete
                </PopupMenuItem>
                <PopupMenuItem onClick={toggleShare} icon={<IosShareIcon />}>
                  Share
                </PopupMenuItem>
              </PopupMenuGroup>
            </ul>
          )
        ) : null}
      </div>
    </div>
  )
}
