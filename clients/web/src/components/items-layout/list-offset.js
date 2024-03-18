import { css, cx } from '@emotion/css'
import { cardsGrid } from 'components/items-layout/base'
import { breakpointLargeHandset } from 'common/constants'
import { CardSkeleton } from 'components/item-card/card-skeleton'

export const offsetListStyle = css`
  ${cardsGrid};
  padding: 2.5rem 0;
  grid-row-gap: 2.5rem;
  grid-column-gap: 1rem;

  &.border {
    border-bottom: 1px solid var(--color-dividerTertiary);
    ${breakpointLargeHandset} {
      border-bottom: 0;
    }
  }

  &.no-space {
    padding-bottom: 0;
  }

  &.compact {
    padding: 1.5rem 0 0;
  }
`

export function OffsetList({
  items,
  offset = 0,
  count = 5,
  border = false,
  compact = false,
  className,
  cardShape = 'wide',
  ItemCard,
  showExcerpt = true,
  showMedia,
  dataCy = 'offset',
  children,
  showTopicName = false,
  showSkeleton = false
}) {
  const start = offset
  const end = offset + count
  const hasChildren = !!children
  const listClass = cx(
    offsetListStyle,
    compact && 'compact',
    border && 'border',
    hasChildren && 'no-space',
    className
  )

  return (
    <div className={listClass} data-testid={dataCy}>
      {!items.length && showSkeleton
        ? [...Array(count)].map((x, i) => <CardSkeleton key={i} />)
        : null}
      {items.slice(start, end).map((id, index) => (
        <ItemCard
          showTopicName={showTopicName}
          id={id}
          key={id}
          position={index}
          cardShape={cardShape}
          showMedia={showMedia}
          showExcerpt={showExcerpt}
        />
      ))}
      {children}
    </div>
  )
}
