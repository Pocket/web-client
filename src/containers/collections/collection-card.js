import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { ActionsCollection } from './collection-actions'
import { setNoImage } from 'connectors/items/items-display.state'
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
  position
}) {
  const dispatch = useDispatch()

  // Get data from state
  const item = useSelector((state) => state.collectionsBySlug[id])
  const { slug, readUrl, externalUrl, openExternal } = item

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
  const itemImage = item?.noImage ? '' : item.heroImage
  const {tags, title, authors, excerpt, timeToRead, isSyndicated, isInternalItem, fromPartner } = item //prettier-ignore

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
      itemId={slug}
      externalUrl={externalUrl}
      tags={tags}
      title={title}
      itemImage={itemImage}
      publisher={false}
      excerpt={excerpt}
      timeToRead={timeToRead}
      isSyndicated={isSyndicated}
      isInternalItem={isInternalItem}
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
