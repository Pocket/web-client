import { memo } from 'react'
import { Item } from 'components/item/item'
import { useSelector, useDispatch } from 'react-redux'
import { setNoImage } from 'connectors/items/items-display.state'
import { mutationBulkSelectAction } from 'connectors/items/mutations-bulk.state'
import { mutationBulkDeSelectAction } from 'connectors/items/mutations-bulk.state'
import { selectShortcutItem } from 'connectors/shortcuts/shortcuts.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { SavedActions } from 'components/item/actions/saved'
import { EmptyCircledIcon } from 'components/icons/EmptyCircledIcon'
import { CheckCircledIcon } from 'components/icons/CheckCircledIcon'
import { mutationFavorite } from 'connectors/items/mutation-favorite.state'
import { mutationUnFavorite } from 'connectors/items/mutation-favorite.state'
import { mutationArchive } from 'connectors/items/mutation-archive.state'
import { mutationDelete } from 'connectors/items/mutation-delete.state'
import { mutationUpsert } from 'connectors/items/mutation-upsert.state'
import { mutationTagItem } from 'connectors/items/mutation-tagging.state'
import { shareAction } from 'connectors/items/mutation-share.state'
import { mutateListAddItem } from 'connectors/lists/mutation-add.state'
import { mutateListCreate } from 'connectors/lists/mutation-create.state'
import { mutationRefresh } from 'connectors/items/mutation-refresh.state'

/**
 * Article Card
 * Creates a connected `Card` with the appropriate data and actions
 * @param {object} {id, position} item_id for data and position for analytics
 */
export function ItemCard({
  id,
  snowplowId,
  position,
  type,
  columnCount,
  horizontalPadding,
  verticalPadding,
  width,
  height
}) {
  const dispatch = useDispatch()
  const appMode = useSelector((state) => state?.app?.mode)
  const bulkEdit = appMode === 'bulk'

  // Get data from state
  const isPremium = useSelector((state) => state.user.premium_status === '1')
  const item = useSelector((state) => state.itemsDisplay[id])
  const itemSaved = useSelector((state) => state.itemsSaved[id])
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))
  const bulkList = useSelector((state) => state.mutationBulk.itemIds)
  const bulkCurrent = useSelector((state) => state.mutationBulk.currentId)
  const bulkIsCurrent = bulkCurrent === id
  const bulkSelected = bulkList?.includes(id)
  const shortcutId = useSelector((state) => state.shortcuts.currentId)
  const shortcutSelected = shortcutId === id

  if (!item) return null

  const { isInternalItem, readUrl, itemUrl, externalUrl, analyticsData: passedAnalytics } = item
  const openUrl = readUrl || externalUrl || itemUrl
  const showExcerpt = type === 'detail'

  const onImageFail = () => dispatch(setNoImage(id))

  const analyticsData = {
    ...passedAnalytics,
    impressionId: id,
    position,
    destination: isInternalItem ? 'internal' : 'external',
    label: type
  }

  /** ITEM TRACKING
  --------------------------------------------------------------- */
  const onOpen = () => dispatch(sendSnowplowEvent(`${snowplowId}.card.open`, analyticsData))

  const onOpenOriginalUrl = () => {
    const data = { ...analyticsData, destination: 'external' }
    dispatch(sendSnowplowEvent(`${snowplowId}.card.view-original`, data))
  }

  const onItemInView = (inView) => {
    if (!impressionFired && inView) {
      dispatch(sendSnowplowEvent(`${snowplowId}.card.impression`, analyticsData))
    }
  }

  /** ITEM BULK ACTIONS
  --------------------------------------------------------------- */
  const itemBulkSelect = (shift) => dispatch(mutationBulkSelectAction(id, shift))
  const itemBulkDeSelect = (shift) => dispatch(mutationBulkDeSelectAction(id, shift))
  const bulkAction = bulkSelected ? itemBulkDeSelect : itemBulkSelect
  const selectBulk = (event) => (bulkEdit ? bulkAction(event.shiftKey) : null)

  /** ITEM SELECT ACTIONS
  --------------------------------------------------------------- */
  const shortcutSelect = () => dispatch(selectShortcutItem(id, position))
  const Actions = bulkEdit ? ActionsBulk : ActionsSaves

  /** ITEM DETAILS
  --------------------------------------------------------------- */
  const itemImage = item?.noImage ? '' : item?.thumbnail
  const { title, publisher, excerpt, timeToRead, isSyndicated, fromPartner, isUserList } = item //prettier-ignore
  const { tags } = itemSaved

  /** ITEM DIMENSIONS
  --------------------------------------------------------------- */

  const columnPosition = position % columnCount
  const rowPosition = Math.floor(position / columnCount)

  const horizontalSpacing = columnPosition * horizontalPadding
  const veriticalSpacing = rowPosition * verticalPadding
  const left = columnCount > 1 ? columnPosition * width + horizontalSpacing : 0
  const top = rowPosition * height + veriticalSpacing
  const positionStyle = { position: 'absolute', left, top, width, height }
  const visibleCount = type !== 'grid' ? 6 : 0

  return item ? (
    <Item
      style={positionStyle}
      itemId={id}
      externalUrl={externalUrl}
      tags={tags}
      title={title}
      itemImage={itemImage}
      publisher={publisher}
      excerpt={excerpt}
      timeToRead={timeToRead}
      isSyndicated={isSyndicated}
      isInternalItem={isInternalItem}
      fromPartner={fromPartner}
      position={position}
      cardShape={type}
      hiddenActions={true}
      showExcerpt={showExcerpt}
      bulkEdit={bulkEdit}
      bulkSelected={bulkSelected}
      bulkIsCurrent={bulkIsCurrent}
      shortcutSelected={shortcutSelected}
      shortcutSelect={shortcutSelect}
      clamp={true}
      type={type}
      visibleCount={visibleCount}
      isUserList={isUserList}
      // Open Actions
      openUrl={openUrl}
      onOpen={onOpen}
      onOpenOriginalUrl={onOpenOriginalUrl}
      onItemInView={onItemInView}
      selectBulk={selectBulk}
      onImageFail={onImageFail}
      isPremium={isPremium}
      Actions={Actions}
      snowplowId={snowplowId}
    />
  ) : null
}

export const MemoizedItemCard = memo(ItemCard)

function ActionsSaves({ id, snowplowId, visibleCount }) {
  const dispatch = useDispatch()

  const isPremium = useSelector((state) => state.user.premium_status === '1')
  const itemSaved = useSelector((state) => state.itemsSaved[id])
  const { filters, sort } = useSelector((state) => state.pageSavedInfo)
  const position = useSelector((state) => state.pageSavedIds.indexOf(id))
  const item = useSelector((state) => state.itemsDisplay[id])
  const hasLists = useSelector((state) => state.pageListsInfo.listsIds)

  if (!itemSaved || !item) return null
  const { isFavorite, isArchived, tags} = itemSaved //prettier-ignore
  const { givenUrl, permanentUrl, analyticsData: passedAnalyticsData } = item
  const analyticsData = { ...passedAnalyticsData, position }

  /** ITEM MENU ITEMS
  --------------------------------------------------------------- */
  const actionShare = () => {
    dispatch(sendSnowplowEvent(`${snowplowId}.share`, analyticsData))
    dispatch(shareAction({ item, position }))
  }
  const actionDelete = () => {
    dispatch(sendSnowplowEvent(`${snowplowId}.delete`, analyticsData))
    dispatch(mutationDelete(id))
  }
  const actionArchive = () => {
    dispatch(sendSnowplowEvent(`${snowplowId}.archive`, analyticsData))
    dispatch(mutationArchive(id))
  }
  const actionUpsert = () => {
    dispatch(sendSnowplowEvent(`${snowplowId}.unarchive`, analyticsData))
    dispatch(mutationUpsert(givenUrl, filters, sort, true))
  }
  const actionFavorite = () => {
    dispatch(sendSnowplowEvent(`${snowplowId}.favorite`, analyticsData))
    dispatch(mutationFavorite(id))
  }
  const actionUnFavorite = () => {
    dispatch(sendSnowplowEvent(`${snowplowId}.un-favorite`, analyticsData))
    dispatch(mutationUnFavorite(id))
  }
  const actionTag = () => {
    dispatch(sendSnowplowEvent(`${snowplowId}.tag`, analyticsData))
    dispatch(mutationTagItem(id, tags))
  }
  const actionAddToList = () => {
    const listAction = hasLists.length ? mutateListAddItem : mutateListCreate
    dispatch(sendSnowplowEvent(`${snowplowId}.add-to-list`, analyticsData))
    dispatch(listAction(id))
  }

  const actionPermLibOpen = () => {
    const data = { ...analyticsData, url: permanentUrl }
    dispatch(sendSnowplowEvent(`${snowplowId}.card.permanent-library`, data))
  }

  const actionRefresh = () => {
    dispatch(sendSnowplowEvent(`${snowplowId}.refresh`, analyticsData))
    dispatch(mutationRefresh(item.givenUrl))
  }

  return (
    <SavedActions
      visibleCount={visibleCount}
      isPremium={isPremium}
      isArchived={isArchived}
      isFavorite={isFavorite}
      actionShare={actionShare}
      actionDelete={actionDelete}
      actionArchive={actionArchive}
      actionUpsert={actionUpsert}
      actionFavorite={actionFavorite}
      actionUnFavorite={actionUnFavorite}
      actionTag={actionTag}
      actionPremLibOpen={actionPermLibOpen}
      actionRefresh={actionRefresh}
      actionAddToList={actionAddToList}
      permanentUrl={permanentUrl}
    />
  )
}

export function ActionsBulk({ id }) {
  const bulkList = useSelector((state) => state.mutationBulk.itemIds)
  const selected = bulkList?.includes(id)
  const BulkIcon = selected ? CheckCircledIcon : EmptyCircledIcon
  return (
    <div className="actions">
      <div className="item-actions"></div>
      <div>
        <BulkIcon />
      </div>
    </div>
  )
}
