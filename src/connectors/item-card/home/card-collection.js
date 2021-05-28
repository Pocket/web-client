/** ----------------------------------------------------------- */
import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { collectionImpressionEvent } from 'containers/home/home.analytics'
import { collectionOpenEvent } from 'containers/home/home.analytics'

export const CollectionCard = ({ collection: item, position }) => {
  const dispatch = useDispatch()

  // Get data from state
  const isAuthenticated = useSelector((state) => state.user.auth)

  /** ITEM TRACKING
  --------------------------------------------------------------- */
  const onOpen = () => dispatch(collectionOpenEvent(item, position))

  const onItemInView = (inView) => {
    if (!inView) return
    dispatch(collectionImpressionEvent(item, position))
  }

  return item ? (
    <Card
      id={item.id}
      item={item}
      position={position}
      cardShape="grid"
      showExcerpt={true}
      onItemInView={onItemInView}
      onOpen={onOpen}
      openUrl={item?.url}
      useMarkdown={true}
      isAuthenticated={isAuthenticated}
    />
  ) : null
}
