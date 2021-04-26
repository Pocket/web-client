import { HomeSectionHeader } from 'components/headers/home-header'
import { CardSkeleton } from 'components/item-card/card-skeleton'
import { CollectionCard } from 'connectors/item-card/home/card-collection'
import { css } from 'linaria'
import { cardsGrid } from 'components/items-layout/base'
import { useSelector } from 'react-redux'
import { breakpointLargeHandset } from '@pocket/web-ui'

const homeCollections = css`
  ${cardsGrid};
  grid-template-columns: repeat(2, 1fr);
  ${breakpointLargeHandset} {
    grid-template-columns: repeat(1, 1fr);
  }
`

export const HomeCollectionList = () => {
  const collectionSet = useSelector((state) => state.home.collectionSet)
  const showSkeleton = collectionSet?.length < 2

  return (
    <section data-cy="collections-row">
      <HomeSectionHeader
        sectionTitle="Our most-read Collections"
        sectionDescription="Dive into our editors’ curated lists of stories around a unique subject"
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
