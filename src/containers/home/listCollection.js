import { HomeCollectionHeader } from 'components/headers/home-header'
import { CardSkeleton } from 'components/item-card/card-skeleton'
import { CollectionCard } from 'connectors/item-card/home/card-collection'
import { css } from 'linaria'
import { cardsGrid } from 'components/items-layout/base'
import { useSelector } from 'react-redux'
import { breakpointLargeHandset } from '@pocket/web-ui'
import { trackEngagement } from 'connectors/snowplow/snowplow.state'
import { ENGAGEMENT_TYPE_GENERAL } from 'connectors/snowplow/events'
import { UI_COMPONENT_LINK } from 'connectors/snowplow/entities'

/* Analytics Event */
export const sendEngagementEvent = (topic) =>
  trackEngagement(
    ENGAGEMENT_TYPE_GENERAL,
    UI_COMPONENT_LINK,
    0, // position in list (zero since it's not in list)
    'home.topic.view-more',
    topic
  )

const homeCollections = css`
  ${cardsGrid};
  grid-template-columns: repeat(8, 1fr);
  ${breakpointLargeHandset} {
    grid-template-columns: repeat(4, 1fr);
  }
`

export const HomeCollectionList = () => {
  const collectionSet = useSelector((state) => state.home.collectionSet)
  const showSkeleton = collectionSet?.length < 2

  const clickEvent = () => {
    dispatch(sendEngagementEvent())
  }

  return (
    <section data-cy="collections-row">
      <HomeCollectionHeader
        sectionTitle="Our most-read Collections"
        sectionDescription="Dive into our editors’ curated lists of stories around a unique subject"
        clickEvent={clickEvent}
      />
      <section className={homeCollections}>
        {showSkeleton ? (
          <CardSkeleton type="grid" name="collectionSkeleton" count={2} />
        ) : (
          collectionSet.map((collection, index) => (
            <CollectionCard key={collection.title} collection={collection} position={index} />
          ))
        )}
      </section>
    </section>
  )
}
