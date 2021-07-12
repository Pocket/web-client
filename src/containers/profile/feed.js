import { css } from 'linaria'
import { RecommendedFeedCard } from 'connectors/item-card/profile/card'

const cardRowStyles = css`
  max-width: 980px;
  margin: 0 auto;

  .recommendedWrapper {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--color-dividerTertiary);

    &:last-of-type {
      border-bottom: none;
    }
  }
`

export const ProfileFeed = ({ items }) => {
  return (
    <section className={cardRowStyles}>
      {items.map((itemId, index) => (
        <RecommendedFeedCard key={`${itemId}-${index}`} id={itemId} position={index} />
      ))}
    </section>
  )
}
