import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { ActionsCollection } from './collection-actions'
import { setNoImage } from 'connectors/items-by-id/discover/items.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { BASE_URL } from 'common/constants'

/**
 * Article Card
 * Creates a connected `Card` with the appropriate data and actions
 * @param {object} {id, position} item_id for data and position for analytics
 */
export function ItemCard({
  id,
  cardShape,
  className,
  showExcerpt = false,
  position,
  lockup,
  useHero = false
}) {
  const dispatch = useDispatch()

  // Get data from state
  const storedItem = useSelector((state) => state.collectionsBySlug[id])
  const { url } = storedItem
  const fullUrl = `${BASE_URL}${url}`
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(fullUrl))
  const analyticsInitialized = useSelector((state) => state.analytics.initialized)
  const onImageFail = () => dispatch(setNoImage(id))

  // for hero items in a lockup, use the heroImage instead of thumbnail
  const thumbnail = lockup || useHero ? storedItem.heroImage : storedItem.thumbnail
  const item = { ...storedItem, thumbnail }
  const analyticsItem = {
    url: fullUrl,
    position,
    destination: 'internal'
  }

  /**
   * ITEM TRACKING
   * ----------------------------------------------------------------
   */
  const onImpression = () => dispatch(sendSnowplowEvent('collection.impression', analyticsItem))
  const onItemInView = (inView) =>
    !impressionFired && inView && analyticsInitialized ? onImpression() : null
  const onOpen = () => dispatch(sendSnowplowEvent('collection.open', analyticsItem))

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
      // Actions
      actionId={item.slug}
      ActionMenu={ActionsCollection}
    />
  )
}
