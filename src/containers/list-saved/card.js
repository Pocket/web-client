import { memo } from 'react'
import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { setNoImage } from 'connectors/items-by-id/saves/items.state'
import { mutationBulkSelectAction } from 'connectors/items/mutations-bulk.state'
import { mutationBulkDeSelectAction } from 'connectors/items/mutations-bulk.state'

import { selectShortcutItem } from 'connectors/shortcuts/shortcuts.state'
import { ActionsSaves } from './card-actions'
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
  const itemSaved = useSelector((state) => state.itemsSaved[id])
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))
  const bulkList = useSelector((state) => state.mutationBulk.itemIds)
  const bulkCurrent = useSelector((state) => state.mutationBulk.currentId)
  const bulkIsCurrent = bulkCurrent === id
  const bulkSelected = bulkList?.includes(id)
  const shortcutId = useSelector((state) => state.shortcuts.currentId)
  const shortcutSelected = shortcutId === id

  if (!item) return null

  /** ITEM DETAILS
   --------------------------------------------------------------- */
  const { isInternalItem, readUrl, externalUrl, analyticsData: passedAnalytics } = item
  const itemImage = item?.noImage ? '' : item?.thumbnail
  const { title, publisher, excerpt, timeToRead, isSyndicated, fromPartner } = item 
  const { tags } = itemSaved

  const openUrl = readUrl || externalUrl
  const showExcerpt = type === 'detail'

  const analyticsData = {
    ...passedAnalytics,
    impressionId: id,
    position,
    destination: isInternalItem ? 'internal' : 'external',
    label: type
  }

  const analyticsMeta = {title, publisher, isSyndicated}


  /** ITEM TRACKING
  --------------------------------------------------------------- */
  const onOpen = () => dispatch(sendSnowplowEvent('saves.card.open', analyticsData))

  const onOpenOriginalUrl = () => {
    const data = { ...analyticsData, destination: 'external' }
    dispatch(sendSnowplowEvent('saves.card.view-original', data))
  }

  const onItemInView = (inView) => {
    if (!impressionFired && inView) {
      dispatch(sendSnowplowEvent('saves.card.impression', analyticsData, analyticsMeta))
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
  const ActionMenu = bulkEdit ? ActionsBulk : ActionsSaves
  const onImageFail = () => dispatch(setNoImage(id))

  /** ITEM DIMENSIONS
  --------------------------------------------------------------- */

  const columnPosition = position % columnCount
  const rowPosition = Math.floor(position / columnCount)

  const horizontalSpacing = columnPosition * horizontalPadding
  const veriticalSpacing = rowPosition * verticalPadding
  const left = columnCount > 1 ? columnPosition * width + horizontalSpacing : 0
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
