import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { ActionsCollection } from './story-actions'
import { setNoImage } from 'connectors/items-by-id/discover/items.state'
import { trackItemImpression } from 'connectors/snowplow/snowplow.state'
import { trackItemOpen } from 'connectors/snowplow/snowplow.state'

/**
 * Article Card
 * Creates a connected `Card` with the appropriate data and actions
 * @param {object} {id, position} item_id for data and position for analytics
 */
export function ItemCard({ id, cardShape, className, showExcerpt = false, position }) {
  const dispatch = useDispatch()
  // Get data from state
  const item = useSelector((state) => state.collectionStoriesById[id])
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))

  if (!item) return null

  const { open_url: url } = item
  const onImageFail = () => dispatch(setNoImage(id))

  /**
   * ITEM TRACKING
   * ----------------------------------------------------------------
   */
  const onImpression = () => dispatch(trackItemImpression(position, { url }, 'collection.impression'))
  const onItemInView = (inView) => (!impressionFired && inView ? onImpression() : null)
  const onOpen = () => dispatch(trackItemOpen(position, { url }, 'collection.open', url))

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
