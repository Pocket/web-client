import { css, cx } from '@emotion/css'
import { breakpointSmallTablet } from 'common/constants'

export const flexListStyles = css`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 1.5rem;
  grid-row-gap: 1.5rem;
  padding: 2.5rem 0;

  &.border {
    border-bottom: 1px solid var(--color-dividerTertiary);
    ${breakpointSmallTablet} {
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

export function FlexList({
  items,
  offset = 0,
  count = 3,
  border = false,
  compact = false,
  className,
  cardShape = 'wide',
  ItemCard,
  showExcerpt = true,
  showMedia,
  dataCy = 'offset',
  children
}) {
  const start = offset
  const end = offset + count
  const hasChildren = !!children
  const listClass = cx(
    flexListStyles,
    compact && 'compact',
    border && 'border',
    hasChildren && 'no-space',
    className
  )

  return (
    <div className={listClass} data-testid={dataCy}>
      {items.slice(start, end).map((id, index) => (
        <ItemCard
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
