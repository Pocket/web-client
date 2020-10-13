import React, { Component } from 'react'
import { css } from 'linaria'
import classNames from 'classnames'
import { IosShareIcon } from '@pocket/web-ui'

// import { AnnotationMenu } from './annotations.menu'
import { cardStyles, Quote, CreatedDate } from './annotations.card'

import { buttonReset } from 'components/buttons/button-reset'
import { EmptyList } from './annotations.empty-list'

// import { LimitNotice } from './annotations.limit'

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
  &.visible {
    transform: translateX(0);
  }
`

const menuWrapper = css`
  position: absolute;
  bottom: 15px;
  right: 20px;
`

const menuTrigger = css`
  height: 24px;
  cursor: pointer;
  color: var(--color-textPrimary);
  &:hover {
    color: var(--color-textLinkHover);
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
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  padding: 25px 0 2px 25px;
`

export class QuoteList extends Component {
  renderCards = () => {
    const { annotations, annotationList, viewPort } = this.props
    const cards = []

    // Map the annotationList (which has vertical position as key)
    // to each matching annotation, and sort by that value
    annotations
      .map(a => {
        let coordY
        Object.keys(annotationList).forEach(key => {
          if (a.annotation_id === annotationList[key].id) {
            coordY = key
          }
        })

        return {
          ...a,
          coordY
        }
      })
      .sort((a, b) => a.coordY - b.coordY)
      .forEach(annot => {
        const active = annot.coordY > viewPort.top && annot.coordY < viewPort.bottom

        cards.push(
          <div
            onClick={e => e.stopPropagation()}
            key={annot.annotation_id}
            addedStyles={cardStyles}
            className={classNames(cardStyles, activeCardStyles, { active })}>
            <Quote
              // aria-label={translate('annotations.scrollTo')}
              onClick={() => this.props.onClickEvent(annot.coordY)}>
              {annot.quote}
            </Quote>
            <CreatedDate>{annot.created_at}</CreatedDate>

            <div className={menuWrapper}>
              {/*<AnnotationMenu
                annotation_id={annot.annotation_id}
                deleteAnnotation={this.props.deleteAnnotation}
                item_id={this.props.item_id}
                item={this.props.item}
                shareItem={this.props.shareItem}
                socialShare={this.props.socialShare}
                annotation={annot}>
                <button className={classNames(buttonReset, menuTrigger)}>
                  <IosShareIcon />
                </button>
              </AnnotationMenu>*/}
            </div>
          </div>
        )
      })

    if (cards.length === 3 && !this.props.isPremium) {
      cards.push(
        <div>LIMIT!!!</div>
        // <LimitNotice
          // key='notice'
          // trackClick={this.props.trackClick} />
      )
    }

    return cards.length > 0
      ? cards
      : <EmptyList />
  }

  render() {
    const { visible, heading, annotationList } = this.props

    return annotationList ? (
      <div className={classNames(listWrapper, { visible })}>
        {heading && <h6 className={headingStyles}>{heading}</h6>}
        {this.renderCards()}
      </div>
    ) : null
  }
}
