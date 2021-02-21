import { HomeSectionHeader } from 'components/headers/home-header'
import { useSelector } from 'react-redux'
import { css } from 'linaria'
import { ItemCard } from './cardRecent'
import { cardGrid } from 'components/items-layout/virtualized-list'
import classnames from 'classnames'
import { RecentSavesSkeleton } from 'components/item-card/home/skeleton'

const topicRowStyles = css`
  margin-bottom: 1.5rem;
`

const cardRowStyles = css`
  margin-bottom: var(--spacing100);
  padding-bottom: 2rem;
  border-bottom: var(--dividerStyle);
`

export const HomeRecentList = () => {
  const recentSaves = useSelector((state) => state.home.recentSaves)
  const displayItems = recentSaves?.slice(0, 3)
  const showSkeleton = displayItems?.length < 3
  const totalSkeltons = 3 - displayItems.length

  return (
    <div className={topicRowStyles}>
      <HomeSectionHeader
        sectionTitle="Your recent saves"
        sectionDescription="The latest items you've saved to your list"
      />
      <section className={classnames(cardGrid, cardRowStyles)}>
        {showSkeleton ? (
          <RecentSavesSkeleton
            type="grid"
            name={'recentSkeleton'}
            count={displayItems.length}
          />
        ) : null}
        {displayItems.map((id, index) => (
          <ItemCard key={id} id={id} position={index} />
        ))}
      </section>
    </div>
  )
}
