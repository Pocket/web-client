import { css } from 'linaria'
import { cardsGrid } from 'components/items-layout/base'

const heroType = {
  center: {
    className: 'lockup hero-center',
    showExcerpt: true,
    cardShape: 'block'
  },
  right: {
    className: 'lockup hero-right',
    showExcerpt: true,
    cardShape: 'block'
  },
  left: {
    className: 'lockup hero-left',
    showExcerpt: true,
    cardShape: 'block'
  }
}

export const cardLockupStyle = css`
  ${cardsGrid};
  border-bottom: 1px solid var(--color-dividerTertiary);
  padding: 2rem 0;
`

export function Lockup({
  items,
  offset = 0,
  count = 5,
  heroPosition = 'center',
  cardShape = 'block',
  lockupShape = 'hero',
  ItemCard
}) {
  const start = offset
  const end = offset + count
  const hero = heroType[heroPosition]
  return (
    <div className={`${cardLockupStyle} lockup-${lockupShape}`}>
      {items.slice(start, end).map((id, index) => {
        const layoutProps = index === 0 ? hero : { className: 'lockup', cardShape }
        return <ItemCard id={id} key={id} position={index} {...layoutProps} />
      })}
    </div>
  )
}
