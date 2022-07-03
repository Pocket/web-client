import { css, cx } from 'linaria'
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

  return (
    <div
      onClick={stopProp}
      key={id}
      className={cx(cardStyles, activeCardStyles)}>
      <Quote onClick={handleClick}>
        {quote}
      </Quote>
      {note ? <p className="note">{note.text}</p> : null}
      <CreatedDate>{createdAt}</CreatedDate>
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
    <div className={cx(listWrapper, visible && 'visible')}>
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
