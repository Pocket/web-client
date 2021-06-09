/** ----------------------------------------------------------- */
import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { BASE_URL } from 'common/constants'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const CollectionCard = ({ collection: item, position }) => {
  const dispatch = useDispatch()

  // Get data from state
  const isAuthenticated = useSelector((state) => state.user.auth)

  const analyticsData = {
    url: `${BASE_URL}/collection?.url`,
    position
  }

  /** ITEM TRACKING
  --------------------------------------------------------------- */
  const onOpen = () => dispatch(sendSnowplowEvent('home.collection.open', analyticsData))

  const onItemInView = (inView) => {
    if (!inView) return
    dispatch(sendSnowplowEvent('home.collection.impression', analyticsData))
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
