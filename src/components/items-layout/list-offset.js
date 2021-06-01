import { css, cx } from 'linaria'
import { cardsGrid } from 'components/items-layout/base'
import { breakpointLargeHandset } from '@pocket/web-ui'

export const offsetListStyle = css`
  ${cardsGrid};
  padding: 2.5rem 0;
  grid-row-gap: 2.5rem;
  grid-column-gap: 0;

  &.border {
    border-bottom: 1px solid var(--color-dividerTertiary);
    ${breakpointLargeHandset} {
      border-bottom: 0;
    }
  }

  &.no-space {
    padding-bottom: 0;
  }
`

export function OffsetList({
  items,
  offset = 0,
  count = 5,
  border = false,
  className,
  cardShape = 'wide',
  ItemCard,
  children
}) {
  const start = offset
  const end = offset + count
  const hasChildren = !!children
  const listClass = cx(offsetListStyle, border && 'border', hasChildren && 'no-space', className)
  return (
    <div className={listClass}>
      {items.slice(start, end).map((id, index) => (
        <ItemCard id={id} key={id} position={index} cardShape={cardShape} showExcerpt={true} />
      ))}
      {children}
    </div>
  )
}
