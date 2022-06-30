<<<<<<< feat/highlight-annotations -- Incoming Change
import { css } from 'linaria'
import classNames from 'classnames'
=======
import React, { Component } from 'react'
import { css, cx } from 'linaria'
>>>>>>> main -- Current Change
import { AnnotationMenu } from './annotations.menu'
import { cardStyles, Quote, CreatedDate } from './annotations.card'
import { EmptyList } from './annotations.empty-list'
import { LimitNotice } from './highlights.limit'
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

  p.note {
    margin-top: 0.5rem;
    color: var(--color-textSecondary);
    font-style: italic;
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

<<<<<<< feat/highlight-annotations -- Incoming Change
const QuoteItem = ({
  id,
  position,
  quote,
  note,
  createdAt,
  deleteHighlight,
  shareItem,
  toggleAnnotations,
  onClickEvent
}) => {
  const stopProp = (e) => e.stopPropagation()
  const handleClick = () => onClickEvent(position)
=======
export class QuoteList extends Component {
  renderCards = () => {
    const { annotations, onClickEvent, shareItem, deleteAnnotation, handleImpression } = this.props
    const cards = []

    annotations
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
              onClick={() => onClickEvent(annot.position)}>
              {annot.quote}
            </Quote>
            <CreatedDate>{createdAt}</CreatedDate>
>>>>>>> main -- Current Change

  return (
    <div
      onClick={stopProp}
      key={id}
      className={classNames(cardStyles, activeCardStyles)}>
      <Quote onClick={handleClick}>
        {quote}
      </Quote>
      {note ? <p className="note">{note.text}</p> : null}
      <CreatedDate>{createdAt}</CreatedDate>

<<<<<<< feat/highlight-annotations -- Incoming Change
      <div className={menuWrapper}>
        <AnnotationMenu
          visible
          alignRight
          id={id}
          shareItem={shareItem}
          deleteHighlight={deleteHighlight}
          annotateItem={toggleAnnotations}
          quote={quote}
        />
=======
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
>>>>>>> main -- Current Change
      </div>
    </div>
  )
}

export const QuoteList = ({
  isPremium,
  annotations,
  annotationCount,
  onClickEvent,
  shareItem,
  deleteHighlight,
  toggleAnnotations,
  handleImpression,
  visible
}) => {
  return annotations && annotationCount > 0 ? (
    <div className={classNames(listWrapper, { visible })}>
      <h6 className={headingStyles}>
        <Trans i18nKey="annotations:my-highlights">My Highlights</Trans>
      </h6>
      {annotations.map(annot => (
        <QuoteItem
          key={annot.annotation_id || annot.id}
          id={annot.annotation_id || annot.id}
          createdAt={annot.created_at || annot._createdAt * 1000}
          onClickEvent={onClickEvent}
          shareItem={shareItem}
          deleteHighlight={deleteHighlight}
          toggleAnnotations={toggleAnnotations}
          {...annot}
        />
      ))}
      {(annotations.length === 3 && !isPremium) ? (
        <LimitNotice onVisible={handleImpression} />
      ) : null}
    </div>
  ) : (
    <EmptyList />
  )
}
