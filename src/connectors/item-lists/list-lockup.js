import { css } from 'linaria'
import { cardsGrid } from 'components/items-layout/base'

const heroType = {
  center: {
    className: 'lockup hero-center',
    showExcerpt: true,
    cardShape: 'grid'
  },
  right: {
    className: 'lockup hero-right',
    showExcerpt: true,
    cardShape: 'grid'
  },
  left: {
    className: 'lockup hero-left',
    showExcerpt: true,
    cardShape: 'grid'
  }
}

const base = {
  className: 'lockup',
  cardShape: 'grid'
}

export const cardLockupStyle = css`
  ${cardsGrid};
  border-bottom: 1px solid var(--color-dividerTertiary);
  padding: 2rem 0;
`

export function Lockup({ items, offset = 0, count = 5, heroPosition = 'center', ItemCard }) {
  const start = offset
  const end = offset + count
  const hero = heroType[heroPosition]
  return (
    <div className={cardLockupStyle}>
      {items.slice(start, end).map((id, index) => {
        const layoutProps = index === 0 ? hero : base
        return <ItemCard id={id} key={id} position={index} {...layoutProps} />
      })}
    </div>
  )
}
