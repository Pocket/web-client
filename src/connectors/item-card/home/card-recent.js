import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { ActionsRecent } from './card-recent-actions'

import { trackItemImpression } from 'connectors/snowplow/snowplow.state'
import { trackItemOpen } from 'connectors/snowplow/snowplow.state'

export const RecCard = ({ id, position, className, cardShape = 'block', showExcerpt = false }) => {
  const dispatch = useDispatch()

  // Get data from state
  const item = useSelector((state) => state.myListItemsById[id])
  const { item_id, original_url, openExternal } = item
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))
  const openUrl = !openExternal ? `/read/${item_id}` : original_url

  /**
   * ITEM TRACKING
   * ----------------------------------------------------------------
   */
  const onImpression = () => dispatch(trackItemImpression(position, item, 'home.recent.impression'))
  const onItemInView = (inView) => (impressionFired || !inView ? onImpression() : null)
  const onOpen = () => dispatch(trackItemOpen(position, item, 'home.recent.open'))

  return item ? (
    <Card
      item={item}
      position={position}
      className={className}
      cardShape={cardShape}
      showExcerpt={showExcerpt}
      openUrl={openUrl}
      // Tracking
      onItemInView={onItemInView}
      openAction={onOpen}
      ActionMenu={ActionsRecent}
    />
  ) : null
}
