import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { ActionsDiscover } from './card-actions'
import { setNoImage } from 'connectors/items-by-id/discover/items.state'
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
  const openUrl = save_status === 'saved' && !openExternal ? `/read/${item_id}` : original_url
  const onImageFail = () => dispatch(setNoImage(id))

  /**
   * ITEM TRACKING
   * ----------------------------------------------------------------
   */
  const onImpression = () => dispatch(trackItemImpression(position, item, 'discover.impression'))
  const onItemInView = (inView) => (!impressionFired && inView ? onImpression() : null)
  const onOpen = () => dispatch(trackItemOpen(position, item, 'discover.open'))

  return (
    <Card
      item={item}
      onImageFail={onImageFail}
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
