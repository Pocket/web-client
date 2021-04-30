/** ----------------------------------------------------------- */
import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { collectionImpressionEvent } from 'containers/home/home.analytics'
import { collectionOpenEvent } from 'containers/home/home.analytics'

export const CollectionCard = ({ collection, position }) => {
  const dispatch = useDispatch()

  // Get data from state
  const isAuthenticated = useSelector((state) => state.user.auth)

  /** ITEM TRACKING
  --------------------------------------------------------------- */
  const onOpen = () => dispatch(collectionOpenEvent(collection, position))

  const onItemInView = (inView) => {
    if (!inView) return
    dispatch(collectionImpressionEvent(collection, position))
  }

  // Mini Deriver. We should make this more official when we hook up slates for
  // this.  CollectionsById and arrays.
  const item = {
    item_id: collection?.title,
    title: collection?.title,
    thumbnail: collection?.image,
    // publisher: collection?.curator,
    excerpt: collection?.subtitle,
    openExternal: true,
    original_url: collection?.url
  }

  return collection ? (
    <Card
      id={collection.id}
      item={item}
      position={position}
      cardShape="grid"
      showExcerpt={true}
      onItemInView={onItemInView}
      openAction={onOpen}
      openUrl={collection?.url}
      isAuthenticated={isAuthenticated}
    />
  ) : null
}
