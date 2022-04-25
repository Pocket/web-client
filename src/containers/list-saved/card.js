import { memo } from 'react'
import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { setNoImage } from 'connectors/items-by-id/my-list/items.state'
import { mutationBulkSelectAction } from 'connectors/items/mutations-bulk.state'
import { mutationBulkDeSelectAction } from 'connectors/items/mutations-bulk.state'

import { selectShortcutItem } from 'connectors/shortcuts/shortcuts.state'
import { ActionsMyList } from './card-actions'
import { ActionsBulk } from './card-actions'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

/**
 * Article Card
 * Creates a connected `Card` with the appropriate data and actions
 * @param {object} {id, position} item_id for data and position for analytics
 */
export function ItemCard({
  id,
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
  const item = useSelector((state) => state.items[id])
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))
  const bulkList = useSelector((state) => state.mutationBulk.itemIds)
  const bulkCurrent = useSelector((state) => state.mutationBulk.currentId)
  const bulkIsCurrent = bulkCurrent === id
  const bulkSelected = bulkList?.includes(id)
  const shortcutId = useSelector((state) => state.shortcuts.currentId)
  const shortcutSelected = shortcutId === id

  if (!item) return null

  const { readUrl, externalUrl, analyticsData: passedAnalytics } = item
  const openUrl = readUrl || externalUrl
  const showExcerpt = type === 'detail'
  // const ActionMenu = bulkEdit ? ActionsBulk : ActionsMyList

  const onImageFail = () => dispatch(setNoImage(id))

  const analyticsData = {
    ...passedAnalytics,
    position,
    destination: readUrl ? 'internal' : 'external'
  }

  /** ITEM TRACKING
  --------------------------------------------------------------- */
  const onOpen = () => dispatch(sendSnowplowEvent('my-list.card.open', analyticsData))

  const onOpenOriginalUrl = () => {
    const data = { ...analyticsData, destination: 'external' }
    dispatch(sendSnowplowEvent('my-list.card.view-original', data))
  }

  const onItemInView = (inView) => {
    if (!impressionFired && inView)
      dispatch(sendSnowplowEvent('my-list.card.impression', analyticsData))
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
  const ActionMenu = bulkEdit ? ActionsBulk : ActionsMyList

  /** ITEM DETAILS
  --------------------------------------------------------------- */
  const itemImage = item?.noImage ? '' : item?.thumbnail
  const { tags, title, publisher, excerpt, timeToRead, isSyndicated, fromPartner } = item //prettier-ignore

  /** ITEM DIMENSIONS
  --------------------------------------------------------------- */

  const columnPosition = position % columnCount
  const rowPosition = Math.floor(position / columnCount)

  const horizontalSpacing = columnPosition * horizontalPadding
  const veriticalSpacing = rowPosition * verticalPadding
  const left = columnPosition * width + horizontalSpacing
  const top = rowPosition * height + veriticalSpacing
  const positionStyle = { position: 'absolute', left, top, width, height }

  return item ? (
    <Card
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
      // Open Actions
      openUrl={openUrl}
      onOpen={onOpen}
      onOpenOriginalUrl={onOpenOriginalUrl}
      onItemInView={onItemInView}
      selectBulk={selectBulk}
      onImageFail={onImageFail}
      isPremium={isPremium}
      ActionMenu={ActionMenu}
    />
  ) : null
}

export const MemoizedItemCard = memo(ItemCard)
