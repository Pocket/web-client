import { HomeSectionHeader } from 'components/headers/home-header'
import { useSelector } from 'react-redux'
import { css } from 'linaria'
import { RecentCard } from 'connectors/item-card/home/card-recent'
import { CardSkeleton } from 'components/item-card/card-skeleton'

const recentGrid = css`
  display: grid;
  align-items: start;
  grid-column-gap: var(--spacing150);
  grid-template-columns: repeat(12, 1fr);
  padding: 1rem 0;
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
          <CardSkeleton cardShape="wide" name="recentSkeleton" count={skeletonCount} />
        ) : null}
      </section>
    </div>
  ) : null
}
