import { ItemSignaled as Item } from 'components/item/item.signaled'
import { useSelector, useDispatch } from 'react-redux'
import { setNoImage } from 'connectors/items/items-display.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { SignaledActions } from 'components/item/actions/signaled'
import { mutationUpsertTransitionalItem } from 'connectors/items/mutation-upsert.state'
import { mutationDeleteTransitionalItem } from 'connectors/items/mutation-delete.state'
import { completeDemotion } from 'containers/home/home.state'

/**
 * Article Card
 * Creates a connected `Card` with the appropriate data and actions
 * @param {object} {id, position} item_id for data and position for analytics
 */
export function ItemCard({
  id,
  slateId,
  position,
  className,
  cardShape,
  showExcerpt = true,
  useMarkdown,
  onDemote,
  onPromote,
  clamp,
  snowplowId
}) {
  const dispatch = useDispatch()

  // Get data from state
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))
  const analyticsInitialized = useSelector((state) => state.analytics.initialized)
  const isDemoted = useSelector((state) => state.pageHome.demotedIds.includes(id))

  const item = useSelector((state) => state.itemsDisplay[id])
  if (!item) return null

  const onCompleteDemotion = () => dispatch(completeDemotion(slateId, id))
  const { readUrl, externalUrl, openExternal, syndicatedUrl, isCollection, authors, saveUrl } = item

  const openUrl = openExternal ? externalUrl : syndicatedUrl || readUrl || externalUrl || saveUrl

  const onImageFail = () => dispatch(setNoImage(id))
  const analyticsData = {
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

  const onOpenOriginalUrl = () => {
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
      position={position}
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
      Actions={ActionsSignaled}
      snowplowId={snowplowId}
      // Signal
      onDemote={onDemote}
      onCompleteDemotion={onCompleteDemotion}
      onPromote={onPromote}
      isDemoted={isDemoted}
    />
  )
}

export function ActionsSignaled(props) {
  const { id, position, snowplowId, onPromote, onDemote, completeDemotion } = props
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.itemsDisplay[id])

  const saveItemId = useSelector((state) => state.itemsTransitions[id])
  const saveStatus = saveItemId ? 'saved' : 'unsaved'

  if (!item) return null
  const { saveUrl } = item
  const analyticsData = { position, ...item?.analyticsData }

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

  return item ? (
    <SignaledActions
      id={id}
      isAuthenticated={isAuthenticated}
      saveStatus={saveStatus}
      onSave={onSave}
      onUnSave={onUnSave}
      handlePromote={onPromote}
      handleDemote={onDemote}
    />
  ) : null
}
