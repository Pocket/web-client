import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { ActionsDiscover } from './card-actions'

import { trackItemImpression } from 'connectors/snowplow/snowplow.state'
import { trackItemOpen } from 'connectors/snowplow/snowplow.state'

/**
 * Article Card
 * Creates a connected `Card` with the appropriate data and actions
 * @param {object} {id, position} item_id for data and position for analytics
 */
export function ItemCard({ id, position, className, cardShape, showExcerpt = false }) {
  const dispatch = useDispatch()

  // Get data from state
  const item = useSelector((state) => state.discoverItemsById[id])
  const { save_status, item_id, original_url, openExternal } = item
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))
  const openUrl = save_status && !openExternal ? `/read/${item_id}` : original_url

  /**
   * ITEM TRACKING
   * ----------------------------------------------------------------
   */
  const onImpression = () => dispatch(trackItemImpression(position, item, 'discover.impression'))
  const onItemInView = (inView) => (impressionFired || !inView ? onImpression() : null)
  const onOpen = () => dispatch(trackItemOpen(position, item, 'discover.open'))

  return (
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
      ActionMenu={ActionsDiscover}
    />
  )
}
