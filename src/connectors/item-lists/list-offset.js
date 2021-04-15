import { css } from 'linaria'
import { cardsGrid } from 'components/items-layout/base'

export const offsetListStyle = css`
  ${cardsGrid};
  padding: 1rem 0;
  grid-column-gap: 0;
  border-bottom: 1px solid var(--color-dividerTertiary);
`

export function OffsetList({ items, offset = 0, count = 5, cardShape = 'wide', ItemCard }) {
  const start = offset
  const end = offset + count
  return (
    <div className={offsetListStyle}>
      {items.slice(start, end).map((id, index) => (
        <ItemCard id={id} key={id} position={index} cardShape={cardShape} showExcerpt={true} />
      ))}
    </div>
  )
}
