import { Item } from 'components/item/item'
import { useSelector, useDispatch } from 'react-redux'
import { ActionsTransitional } from './item-actions-transitional'
import { setNoImage } from 'connectors/items/items-display.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

/**
 * Article Card
 * Creates a connected `Card` with the appropriate data and actions
 * @param {object} {id, position} item_id for data and position for analytics
 */
export function ItemCard({
  id,
  position,
  className,
  cardShape,
  showExcerpt = true,
  clamp,
  snowplowId
}) {
  const dispatch = useDispatch()

  // Get data from state
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))
  const analyticsInitialized = useSelector((state) => state.analytics.initialized)

  const item = useSelector((state) => state.itemsDisplay[id])
  if (!item) return null

  const { itemId, readUrl, externalUrl, openExternal, syndicatedUrl } = item
  const openUrl = openExternal ? externalUrl : syndicatedUrl || readUrl || externalUrl

  const onImageFail = () => dispatch(setNoImage(id))
  const analyticsData = {
    id,
    position,
    destination: !openExternal ? 'internal' : 'external',
    ...item?.analyticsData
  }

  /**
   * ITEM TRACKING
   * ----------------------------------------------------------------
   */
  const onImpression = () => dispatch(sendSnowplowEvent(`${snowplowId}.impression`, analyticsData))
  const onItemInView = (inView) =>
    !impressionFired && inView && analyticsInitialized ? onImpression() : null
  const onOpen = () => dispatch(sendSnowplowEvent(`${snowplowId}.open`, analyticsData))

  /** ITEM DETAILS
  --------------------------------------------------------------- */
  const itemImage = item?.noImage ? '' : item?.thumbnail
  const {tags, title, publisher, excerpt, timeToRead, isSyndicated, isInternalItem, fromPartner, storyCount } = item //prettier-ignore

  return (
    <Item
      itemId={itemId}
      externalUrl={externalUrl}
      tags={tags}
      title={title}
      itemImage={itemImage}
      publisher={publisher}
      excerpt={excerpt}
      timeToRead={timeToRead}
      authors={authors}
      isCollection={isCollection}
      storyCount={storyCount}
      isSyndicated={isSyndicated}
      isInternalItem={isInternalItem}
      fromPartner={fromPartner}
      onImageFail={onImageFail}
      position={position}
      className={className}
      cardShape={cardShape}
      showExcerpt={showExcerpt}
      openUrl={openUrl}
      clamp={clamp}
      // Tracking
      onItemInView={onItemInView}
      onOpen={onOpen}
      Actions={ActionsTransitional}
      snowplowId="discover"
    />
  )
}
