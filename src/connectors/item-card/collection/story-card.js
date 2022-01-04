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
export function ItemCard({ id, cardShape, className, showExcerpt = false, position, partnerType }) {
  const dispatch = useDispatch()
  // Get data from state
  const analyticsInitialized = useSelector((state) => state.analytics.initialized)

  const item = useSelector((state) => state.collectionStoriesById[id])
  const impressionFired = useSelector((state) =>
    state.analytics.impressions.includes(item?.open_url)
  )

  if (!item) return null
  const { open_url } = item
  const onImageFail = () => dispatch(setNoImage(id))
  const analyticsData = {
    url: open_url,
    position,
    destination: 'external'
  }

  /**
   * ITEM TRACKING
   * ----------------------------------------------------------------
   */
  const onImpression = () => dispatch(sendSnowplowEvent('collection.story.impression', analyticsData))
  const onItemInView = (inView) =>
    !impressionFired && inView && analyticsInitialized ? onImpression() : null
  const onOpen = () => dispatch(sendSnowplowEvent('collection.story.open', analyticsData))

  return (
    <Card
      item={item}
      onImageFail={onImageFail}
      position={position}
      className={className}
      cardShape={cardShape}
      showExcerpt={showExcerpt}
      openUrl={open_url}
      useMarkdown={true}
      partnerType={partnerType}
      // Tracking
      onItemInView={onItemInView}
      onOpen={onOpen}
      ActionMenu={ActionsCollection}
    />
  )
}
