import React, { Component } from 'react'
import { css, cx } from '@emotion/css'
import { AnnotationMenu } from './annotations.menu'
import { cardStyles, Quote, CreatedDate } from './annotations.card'
import { EmptyList } from './annotations.empty-list'
import { LimitNotice } from './annotations.limit'
import { Trans } from 'next-i18next'

const listWrapper = css`
  height: 100%;
  overflow: auto;
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0;
  width: 100%;
  transform: translateX(-500px);
  transition: transform 150ms ease-in-out;
  padding-top: 64px;
  &.visible {
    transform: translateX(0);
  }
`

const menuWrapper = css`
  position: absolute;
  bottom: 15px;
  right: 20px;

  button {
    box-shadow: none;
    .icon {
      margin-top: -5px;
    }
  }
`

const activeCardStyles = css`
  transition: box-shadow 150ms ease-in-out;
  box-shadow: 0 0 0 1px var(--color-dividerTertiary);
  &.active {
    box-shadow: 0 0 0 1px var(--color-dividerPrimary);
  }
`

const headingStyles = css`
  font-family: 'Graphik Web';
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  padding: 25px 25px 2px;
  margin-bottom: 0;
`

export class QuoteList extends Component {
  renderCards = () => {
    const { annotations, onClickEvent, shareItem, deleteAnnotation, handleImpression } = this.props
    const cards = []

    const annotationsWithPositon = annotations.map((annotation) => {
      const id = annotation.id
      const nodeList = document.querySelectorAll(`[data-annotation-id="${id}"]`)
      const node = nodeList[0]
      if (!node) return annotation
      return { ...annotation, position: node.offsetTop }
    })

    annotationsWithPositon
      .sort((a, b) => a.position - b.position)
      .forEach((annot) => {
        // const active = annot.coordY > viewPort.top && annot.coordY < viewPort.bottom
        const active = false
        const id = annot.annotation_id || annot.id
        const createdAt = annot.created_at || annot._createdAt * 1000

        cards.push(
          <div
            onClick={(e) => e.stopPropagation()}
            key={id}
            className={cx(cardStyles, activeCardStyles, active && 'active')}>
            <Quote
              // aria-label={translate('annotations.scrollTo')}
              onClick={() => onClickEvent(id)}>
              {annot.quote}
            </Quote>
            <CreatedDate>{createdAt}</CreatedDate>

            <div className={menuWrapper}>
              <AnnotationMenu
                visible
                alignRight
                id={id}
                shareItem={shareItem}
                deleteAnnotation={deleteAnnotation}
                quote={annot.quote}
              />
            </div>
          </div>
        )
      })

    if (cards.length === 3 && !this.props.isPremium) {
      cards.push(<LimitNotice key="notice" onVisible={handleImpression} />)
    }

    return cards
  }

  render() {
    const { visible, annotations, annotationCount } = this.props

    return annotations && annotationCount > 0 ? (
      <div className={cx(listWrapper, visible && 'visible')}>
        <h6 className={headingStyles}>
          <Trans i18nKey="annotations:my-highlights">My Highlights</Trans>
        </h6>
        {this.renderCards()}
      </div>
    ) : (
      <EmptyList />
    )
  }
}
