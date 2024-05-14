import { Item } from 'components/item/item'
import { useSelector, useDispatch } from 'react-redux'
import { setNoImage } from 'connectors/items/items-display.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { TransitionalActions } from 'components/item/actions/transitional'
import { itemReportAction } from 'connectors/items/mutation-report.state'
import { mutationUpsertTransitionalItem } from 'connectors/items/mutation-upsert.state'
import { mutationDeleteTransitionalItem } from 'connectors/items/mutation-delete.state'

/**
 * Article Card
 * Creates a connected `Card` with the appropriate data and actions
 * @param {object} {id, position} item_id for data and position for analytics
 */
export function ItemCard({
  id,
  className,
  cardShape,
  showExcerpt = true,
  useMarkdown,
  clamp,
  snowplowId,
  canBeRead,
  onOpenItem
}) {
  const dispatch = useDispatch()

  // Get data from state
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))
  const item = useSelector((state) => state.itemsDisplay[id])
  const sharedItem = useSelector((state) => state.sharedItem)
  const analyticsUrl = sharedItem?.shareUrl || ''

  if (!item || !sharedItem) return null

  const { readUrl, externalUrl, openExternal, syndicatedUrl, isCollection, authors, saveUrl } = item

  const primaryUrl = canBeRead ? readUrl : syndicatedUrl
  const openUrl = openExternal ? externalUrl : primaryUrl || readUrl || externalUrl || saveUrl

  const onImageFail = () => dispatch(setNoImage(id))
  const analyticsData = { ...item?.analyticsData, url: analyticsUrl }

  /**
   * ITEM TRACKING
   * ----------------------------------------------------------------
   */
  const onItemInView = (inView) => {
    if (!impressionFired && inView) {
      dispatch(sendSnowplowEvent(`${snowplowId}.impression`, analyticsData))
    }
  }

  const onOpen = () => {
    if (onOpenItem) onOpenItem()
    dispatch(sendSnowplowEvent(`${snowplowId}.open`, analyticsData))
  }

  const onOpenOriginalUrl = () => {
    if (onOpenItem) onOpenItem()
    const data = { ...analyticsData, destination: 'external' }
    dispatch(sendSnowplowEvent(`${snowplowId}.view-original`, data))
  }

  /** ITEM DETAILS
  --------------------------------------------------------------- */
  const itemImage = item?.noImage ? '' : item?.thumbnail
  const {tags, title, publisher, excerpt, timeToRead, isSyndicated, isInternalItem, fromPartner, storyCount, topic } = item //prettier-ignore

  return (
    <Item
      itemId={id}
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
      className={className}
      cardShape={cardShape}
      showExcerpt={showExcerpt}
      openUrl={openUrl}
      clamp={clamp}
      useMarkdown={useMarkdown}
      topicName={topic}
      // Tracking
      onItemInView={onItemInView}
      onOpenOriginalUrl={onOpenOriginalUrl}
      onOpen={onOpen}
      Actions={ActionsTransitional}
      snowplowId={snowplowId}
    />
  )
}

export function ActionsTransitional(props) {
  const { id, snowplowId } = props
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.itemsDisplay[id])
  const sharedItem = useSelector((state) => state.sharedItem)
  const analyticsUrl = sharedItem?.shareUrl || ''

  const saveItemId = useSelector((state) => state.itemsTransitions[id])
  const saveStatus = saveItemId ? 'saved' : 'unsaved'

  if (!item || !sharedItem) return null

  const { saveUrl } = item
  const analyticsData = { ...item?.analyticsData, url: analyticsUrl }

  // Prep save action
  const onSave = () => {
    if (!isAuthenticated) return
    dispatch(sendSnowplowEvent(`${snowplowId}.save`, analyticsData))
    dispatch(mutationUpsertTransitionalItem(saveUrl, id))
  }

  const onUnSave = () => {
    if (!isAuthenticated) return
    dispatch(sendSnowplowEvent(`${snowplowId}.unsave`, analyticsData))
    dispatch(mutationDeleteTransitionalItem(saveItemId, id))
  }

  // On Report
  const onReport = () => dispatch(itemReportAction(id))

  return item ? (
    <TransitionalActions
      id={id}
      isAuthenticated={isAuthenticated}
      saveStatus={saveStatus}
      onSave={onSave}
      onUnSave={onUnSave}
      onReport={onReport}
    />
  ) : null
}
