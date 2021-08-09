import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { ActionsRec } from './card-rec-actions'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const RecCard = ({ id, position, className, cardShape = 'detail', showExcerpt = true }) => {
  const dispatch = useDispatch()

  // Get data from state
  const item = useSelector((state) => state.recit.recentRecs[id])
  const { save_status, item_id, resolved_url, original_url, openExternal } = item
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))
  const openUrl = save_status === 'saved' && !openExternal ? `/read/${item_id}` : original_url
  const analyticsData = {
    id,
    url: resolved_url,
    position,
    destination: save_status === 'saved' && !openExternal ? 'internal' : 'external'
  }

  /**
   * ITEM TRACKING
   * ----------------------------------------------------------------
   */
  const onOpen = () => dispatch(sendSnowplowEvent('home.rec.open', analyticsData))
  const onImpression = () => dispatch(sendSnowplowEvent('home.rec.impression', analyticsData))
  const onItemInView = (inView) => (!impressionFired && inView ? onImpression() : null)

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
      onOpen={onOpen}
      ActionMenu={ActionsRec}
    />
  ) : null
}
