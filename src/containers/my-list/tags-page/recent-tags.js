import { useSelector, useDispatch } from 'react-redux'
import { DisplayCard } from 'components/item-card/my-list/card-display-only'
import { css } from 'linaria'

const recentTagStyle = css`
  h3 {
    font-family: var(--fontSansSerif);
    font-size: var(--fontSize100);
    font-weight: 600;
  }

  .cards {
    padding: 0;
    font-family: var(--fontSansSerif);
    font-weight: 400;
    color: var(--color-textPrimary);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 1rem;
    grid-column-gap: 2rem;
  }
`

export function RecentTags() {
  const taggedItems = useSelector((state) => state.userTags.itemsWithTags)

  console.log(taggedItems)
  return (
    <div className={recentTagStyle}>
      <h3>Recently Tagged</h3>
      <div className="cards">
        {taggedItems.map((itemId) => (
          <DisplayCard key={itemId} id={itemId} />
        ))}
      </div>
    </div>
  )
}
