import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { ActionsTopic } from './card-topic-actions'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const CardTopic = ({ id, position }) => {
  const dispatch = useDispatch()

  // Get data from state
  const impressionFired = useSelector((state) => state.home.impressions[id])
  const item = useSelector((state) => state.discoverItemsById[id])
  const { save_status, item_id, original_url, openExternal } = item
  const openUrl = save_status === 'saved' && !openExternal ? `/read/${item_id}` : original_url
  const analyticsData = {
    id,
    url: openUrl,
    position,
    destination: (save_status === 'saved' && !openExternal) ? 'internal' : 'external'
  }

  /**
   * ITEM TRACKING
   * ----------------------------------------------------------------
   */
  const onOpen = () => dispatch(sendSnowplowEvent('home.topic.open', analyticsData))
  const onImpression = () => dispatch(sendSnowplowEvent('home.topic.impression', analyticsData))
  const onItemInView = (inView) => (!impressionFired && inView ? onImpression() : null)

  return (
    <Card
      id={id}
      cardShape="grid"
      position={position}
      item={item}
      onItemInView={onItemInView}
      onOpen={onOpen}
      hiddenActions={false}
      openUrl={openUrl}
      ActionMenu={ActionsTopic}
    />
  )
}
