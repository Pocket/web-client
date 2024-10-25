import { Item } from 'components/item/item'
import { useSelector, useDispatch } from 'react-redux'
import { ActionsCollection } from './card-actions'
import { setNoImage } from 'connectors/items/items-display.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

/**
 * Article Card
 * Creates a connected `Card` with the appropriate data and actions
 * @param {object} {id, position} item_id for data and position for analytics
 */
export function ItemCard({ id, showExcerpt = false, position, partnerType }) {
  const dispatch = useDispatch()
  // Get data from state
  const analyticsInitialized = useSelector((state) => state.analytics.initialized)

  const item = useSelector((state) => state.itemsDisplay[id])
  const { itemId, readUrl, externalUrl, openExternal } = item

  const impressionFired = useSelector((state) => state.analytics.impressions.includes(itemId))

  if (!item) return null

  const openUrl = readUrl && !openExternal ? readUrl : externalUrl
  const onImageFail = () => dispatch(setNoImage(id))
  const analyticsData = {
    position,
    destination: 'external',
    ...item?.analyticsData
  }

  /**
   * ITEM TRACKING
   * ----------------------------------------------------------------
   */
  const onImpression = () =>
    dispatch(sendSnowplowEvent('collection.story.impression', analyticsData))
  const onItemInView = (inView) =>
    !impressionFired && inView && analyticsInitialized ? onImpression() : null
  const onOpen = () => dispatch(sendSnowplowEvent('collection.story.open', analyticsData))

  /** ITEM DETAILS
  --------------------------------------------------------------- */
  const itemImage = item?.noImage ? '' : item?.thumbnail
  const {tags, title, publisher, excerpt, isSyndicated, isInternalItem, fromPartner, authors } = item //prettier-ignore

  return (
    <Item
      itemId={itemId}
      externalUrl={externalUrl}
      tags={tags}
      title={title}
      itemImage={itemImage}
      publisher={publisher}
      excerpt={excerpt}
      timeToRead={false}
      isSyndicated={isSyndicated}
      isInternalItem={isInternalItem}
      fromPartner={fromPartner}
      authors={authors}
      authorContext={true}
      onImageFail={onImageFail}
      position={position}
      className="wide"
      showExcerpt={showExcerpt}
      openUrl={openUrl}
      useMarkdown={true}
      partnerType={partnerType}
      // Tracking
      onItemInView={onItemInView}
      onOpen={onOpen}
      Actions={ActionsCollection}
    />
  )
}
