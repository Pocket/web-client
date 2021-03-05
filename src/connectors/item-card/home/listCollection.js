import { HomeSectionHeader } from 'components/headers/home-header'
import { ItemCard } from './cardCollection'
import { Skeleton } from 'components/item-card/home/skeleton'
import { homeCollections } from 'components/items-layout/home-collections'

export const HomeCollectionList = ({ collectionSet, impressionAction, openAction }) => {
  const showSkeleton = collectionSet?.length < 2

  return (
    <>
      <HomeSectionHeader
        sectionTitle="Our Most Read Collections"
        sectionDescription="Discover some of our most interesting reads in these collections."
      />
      <section className={homeCollections}>
        {showSkeleton ? (
          <Skeleton type="grid" name="collectionSkeleton" count={2} />
        ) : collectionSet.map((collection, index) => (
          <ItemCard
            key={collection.title}
            collection={collection}
            position={index}
            openAction={openAction}
            impressionAction={impressionAction}
          />
        ))}
      </section>
    </>
  )
}
