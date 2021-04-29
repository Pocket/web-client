import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { ActionsTopic } from './card-topic-actions'

import { trackItemImpression } from 'connectors/snowplow/snowplow.state'
import { trackItemOpen } from 'connectors/snowplow/snowplow.state'

export const CardTopic = ({ id, position }) => {
  const dispatch = useDispatch()

  // Get data from state
  const impressionFired = useSelector((state) => state.home.impressions[id])
  const item = useSelector((state) => state.discoverItemsById[id])
  const { save_status, item_id, original_url, openExternal } = item
  const openUrl = save_status === 'saved' && !openExternal ? `/read/${item_id}` : original_url

  /**
   * ITEM TRACKING
   * ----------------------------------------------------------------
   */
  const onImpression = () => dispatch(trackItemImpression(position, item, 'home.topic.impression'))
  const onItemInView = (inView) => (!impressionFired && inView ? onImpression() : null)
  const onOpen = () => dispatch(trackItemOpen(position, item, 'home.topic.open'))

  return (
    <Card
      id={id}
      cardShape="grid"
      position={position}
      item={item}
      onItemInView={onItemInView}
      openAction={onOpen}
      hiddenActions={false}
      openUrl={openUrl}
      ActionMenu={ActionsTopic}
    />
  )
}
