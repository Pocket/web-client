import { HomeSectionHeader } from 'components/headers/home-header'
import { useSelector } from 'react-redux'
import { css } from 'linaria'
import { RecentCard } from 'connectors/item-card/home/cardRecent'
import { CardSkeleton } from 'components/item-card/card-skeleton'
import { EmptyCircledIcon, CheckFilledIcon } from '@pocket/web-ui'

const recentGrid = css`
  display: grid;
  align-items: start;
  grid-column-gap: var(--spacing150);
  grid-template-columns: repeat(12, 1fr);
  padding: 1rem 0;
  article {
    grid-column: span 4;
    border-bottom: none;
    padding: 0.5rem 0;
    &:first-of-type {
      border-bottom: 2px solid var(--color-actionPrimary);
    }
    .title {
      font-size: 1rem;
    }
    .details {
      font-size: 0.75rem;
    }
  }
`

const recentSelection = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 0 2rem;
  .icon {
    margin-left: 5px;
    height: 24px;
  }
`

export const HomeRecentList = () => {
  const recentSaves = useSelector((state) => state.home.recentSaves)
  const total = recentSaves?.length
  const skeletonCount = 3 - total
  const showSkeleton = total <= 3 && total > 0
  return total ? (
    <div>
      <HomeSectionHeader sectionTitle="Your Latest Saves" />
      <section className={recentGrid}>
        {recentSaves.slice(0, 3).map((itemId, index) => (
          <RecentCard key={`recent-${itemId}`} id={itemId} position={index} />
        ))}
        {showSkeleton ? (
          <CardSkeleton
            cardShape="wide"
            name="recentSkeleton"
            count={skeletonCount}
          />
        ) : null}
      </section>
      <div className={recentSelection}>
        <CheckFilledIcon />
        <EmptyCircledIcon />
        <EmptyCircledIcon />
        <EmptyCircledIcon />
        <EmptyCircledIcon />
      </div>
    </div>
  ) : null
}
