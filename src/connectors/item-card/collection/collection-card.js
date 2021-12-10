import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { ActionsCollection } from './collection-actions'
import { setNoImage } from 'connectors/items-by-id/discover/items.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

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
  const item = useSelector((state) => state.collectionsBySlug[id])
  const { itemId, readUrl, externalUrl, openExternal } = item

  const impressionFired = useSelector((state) => state.analytics.impressions.includes(openExternal))
  const analyticsInitialized = useSelector((state) => state.analytics.initialized)
  const onImageFail = () => dispatch(setNoImage(id))

  if (!item) return null

  const openUrl = readUrl && !openExternal ? readUrl : externalUrl
  const analyticsData = {
    id,
    position,
    destination: 'internal',
    ...item?.analyticsData
  }
  /** ITEM DETAILS
   --------------------------------------------------------------- */
  // for hero items in a lockup, use the heroImage instead of thumbnail
  const preferredImage = lockup ? item.heroImage : item.thumbnail
  const itemImage = item?.noImage ? '' : preferredImage
  const {tags, title, authors, excerpt, timeToRead, isSyndicated, fromPartner } = item //prettier-ignore

  /**
   * ITEM TRACKING
   * ----------------------------------------------------------------
   */
  const onImpression = () => dispatch(sendSnowplowEvent('collection.impression', analyticsData))
  const onItemInView = (inView) =>
    !impressionFired && inView && analyticsInitialized ? onImpression() : null
  const onOpen = () => dispatch(sendSnowplowEvent('collection.open', analyticsData))

  return (
    <Card
      itemId={itemId}
      externalUrl={externalUrl}
      tags={tags}
      title={title}
      itemImage={itemImage}
      publisher={false}
      excerpt={excerpt}
      timeToRead={timeToRead}
      isSyndicated={isSyndicated}
      fromPartner={fromPartner}
      authors={authors}
      onImageFail={onImageFail}
      position={position}
      className={className}
      cardShape={cardShape}
      showExcerpt={showExcerpt}
      openUrl={openUrl}
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
