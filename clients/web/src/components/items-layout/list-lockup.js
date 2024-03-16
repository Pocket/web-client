import { css, cx } from '@emotion/css'
import { cardsGrid } from 'components/items-layout/base'
import { breakpointLargeHandset } from 'common/constants'

const heroType = {
  center: {
    className: 'lockup hero-center',
    showExcerpt: true,
    cardShape: 'block',
    lockup: true
  },
  right: {
    className: 'lockup hero-right',
    showExcerpt: true,
    cardShape: 'block',
    lockup: true
  },
  left: {
    className: 'lockup hero-left',
    showExcerpt: true,
    cardShape: 'block',
    lockup: true
  }
}

export const cardLockupStyle = css`
  ${cardsGrid};
  padding: 2rem 0 0;

  ${breakpointLargeHandset} {
    border-bottom: 0;
    padding: 1rem 0 0;
  }
`

const withBorder = css`
  border-bottom: 1px solid var(--color-dividerTertiary);
  padding-bottom: 2rem;
  ${breakpointLargeHandset} {
    border-bottom: 0;
    padding-bottom: 1rem;
  }
`

export function Lockup({
  items,
  offset = 0,
  count = 5,
  heroPosition = 'center',
  cardShape = 'block',
  lockupShape = 'hero',
  border = true,
  useHero,
  dataCy = 'lockup',
  ItemCard
}) {
  const start = offset
  const end = offset + count
  const hero = heroType[heroPosition]
  const lockupShapeClass = `lockup-${lockupShape}`
  const lockupClass = cx(cardLockupStyle, lockupShapeClass, border && withBorder)

  return (
    <div className={lockupClass} data-testid={dataCy}>
      {items.slice(start, end).map((id, index) => {
        const layoutProps = index === 0 ? hero : { className: 'lockup', cardShape }
        return <ItemCard id={id} key={id} position={index} useHero={useHero} {...layoutProps} />
      })}
    </div>
  )
}
