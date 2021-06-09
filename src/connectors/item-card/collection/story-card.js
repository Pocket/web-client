import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { ActionsCollection } from './story-actions'
import { setNoImage } from 'connectors/items-by-id/discover/items.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

/**
 * Article Card
 * Creates a connected `Card` with the appropriate data and actions
 * @param {object} {id, position} item_id for data and position for analytics
 */
export function ItemCard({ id, cardShape, className, showExcerpt = false, position }) {
  const dispatch = useDispatch()
  // Get data from state
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))
  const item = useSelector((state) => state.collectionStoriesById[id])
  if (!item) return null

  const { url } = item
  const openUrl = url
  const onImageFail = () => dispatch(setNoImage(id))
  const analyticsData = {
    url,
    position,
    destination: 'external'
  }

  /**
   * ITEM TRACKING
   * ----------------------------------------------------------------
   */
  const onImpression = () => dispatch(sendSnowplowEvent('collection.impression', analyticsData))
  const onItemInView = (inView) => (!impressionFired && inView ? onImpression() : null)
  const onOpen = () => dispatch(sendSnowplowEvent('collection.open', analyticsData))

  return (
    <Card
      item={item}
      onImageFail={onImageFail}
      position={position}
      className={className}
      cardShape={cardShape}
      showExcerpt={showExcerpt}
      openUrl={url}
      useMarkdown={true}
      // Tracking
      onItemInView={onItemInView}
      onOpen={onOpen}
      ActionMenu={ActionsCollection}
    />
  )
}
