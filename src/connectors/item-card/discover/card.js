import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { ActionsDiscover } from './card-actions'
import { setNoImage } from 'connectors/items-by-id/discover/items.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

/**
 * Article Card
 * Creates a connected `Card` with the appropriate data and actions
 * @param {object} {id, position} item_id for data and position for analytics
 */
export function ItemCard({ id, position, className, cardShape, showExcerpt = false }) {
  const dispatch = useDispatch()

  // Get data from state
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))

  const item = useSelector((state) => state.discoverItemsById[id])
  if (!item) return null
  
const { save_status, item_id, open_url, openExternal, recommendationId, slateLineup, slate } = item 

  const analyticsInitialized = useSelector((state) => state.analytics.initialized)
  const openUrl = save_status === 'saved' && !openExternal ? `/read/${item_id}` : open_url
  const onImageFail = () => dispatch(setNoImage(id))
  const analyticsData = {
    id,
    url: open_url,
    position,
    destination: (save_status === 'saved' && !openExternal) ? 'internal' : 'external',
    recommendationId,
    slateLineupId: slateLineup?.id,
    slateLineupRequestId: slateLineup?.requestId,
    slateLineupExperiment: slateLineup?.experimentId,
    slateId: slate?.id,
    slateRequestId: slate?.requestId,
    slateExperiment: slate?.experimentId
  }

  /**
   * ITEM TRACKING
   * ----------------------------------------------------------------
   */
  const onImpression = () => dispatch(sendSnowplowEvent('discover.impression', analyticsData))
  const onItemInView = (inView) => (!impressionFired && inView && analyticsInitialized ? onImpression() : null)
  const onOpen = () => dispatch(sendSnowplowEvent('discover.open', analyticsData))

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
      onOpen={onOpen}
      ActionMenu={ActionsDiscover}
    />
  )
}
