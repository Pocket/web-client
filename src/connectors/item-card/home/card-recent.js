import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { ActionsRecent } from './card-recent-actions'

export const RecentCard = ({
  id,
  position,
  className,
  cardShape = 'block',
  showMedia = true,
  showExcerpt = false
}) => {
  const dispatch = useDispatch()

  // Get data from state
  const item = useSelector((state) => state.myListItemsById[id])
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))

  if (!item) return null

  const { item_id, resolved_url, original_url, openExternal } = item
  const url = resolved_url || original_url
  const openUrl = !openExternal ? `/read/${item_id}` : original_url
  const analyticsData = {
    id,
    url,
    position,
    destination: !openExternal ? 'internal' : 'external'
  }

  /**
   * ITEM TRACKING
   * ----------------------------------------------------------------
   */
   const onOpenOriginalUrl = () => {
    const data = { ...analyticsData, destination: 'external' }
    dispatch(sendSnowplowEvent('home.recent.view-original', data))
  }
  const onOpen = () => dispatch(sendSnowplowEvent('home.recent.open', analyticsData))
  const onImpression = () => dispatch(sendSnowplowEvent('home.recent.impression', analyticsData))
  const onItemInView = (inView) => (!impressionFired && inView ? onImpression() : null)

  return item ? (
    <Card
      item={item}
      position={position}
      className={className}
      cardShape={cardShape}
      showExcerpt={showExcerpt}
      showMedia={showMedia}
      openUrl={openUrl}
      // Tracking
      onItemInView={onItemInView}
      onOpen={onOpen}
      onOpenOriginalUrl={onOpenOriginalUrl}
      ActionMenu={ActionsRecent}
    />
  ) : null
}
