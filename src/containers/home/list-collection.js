import { useTranslation } from 'next-i18next'
import { HomeCollectionHeader } from 'components/headers/home-header'
import { CardSkeleton } from 'components/item-card/card-skeleton'
import { CollectionCard } from 'connectors/item-card/home/card-collection'
import { css } from 'linaria'
import { cardsGrid } from 'components/items-layout/base'
import { useSelector, useDispatch } from 'react-redux'
import { breakpointLargeHandset } from '@pocket/web-ui'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

const homeCollections = css`
  ${cardsGrid};
  grid-template-columns: repeat(8, 1fr);
  ${breakpointLargeHandset} {
    grid-template-columns: repeat(4, 1fr);
  }
`

export const HomeCollectionList = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const collectionSet = useSelector((state) => state.home.collectionSet)
  const showSkeleton = collectionSet?.length < 2

  const clickEvent = () => {
    dispatch(sendSnowplowEvent('home.collection.view-more'))
  }

  const title = t('home:most-read-collections', 'Our most-read Collections')
  const description = t('home:fill-pocket-collections', 'Fill your Pocket with our curated guides to the best of the web')

  return (
    <section data-cy="collections-row">
      <HomeCollectionHeader
        sectionTitle={title}
        sectionDescription={description}
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
