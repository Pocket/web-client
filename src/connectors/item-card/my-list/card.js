import { memo } from 'react'
import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { itemsBulkSelectAction } from 'connectors/items-by-id/my-list/items.bulk'
import { itemsBulkDeSelectAction } from 'connectors/items-by-id/my-list/items.bulk'

import { trackItemImpression } from 'connectors/snowplow/snowplow.state'
import { trackItemAction } from 'connectors/snowplow/snowplow.state'
import { trackItemOpen } from 'connectors/snowplow/snowplow.state'

import { selectShortcutItem } from 'connectors/shortcuts/shortcuts.state'
import { ActionsMyList } from 'connectors/item-card/my-list/card-actions'

/**
 * Article Card
 * Creates a connected `Card` with the appropriate data and actions
 * @param {object} {id, position} item_id for data and position for analytics
 */
export function ItemCard({ id, position, type }) {
  const dispatch = useDispatch()
  const appMode = useSelector((state) => state?.app?.mode)
  const bulkEdit = appMode === 'bulk'

  // Get data from state
  const isPremium = useSelector((state) => state.user.premium_status === '1')
  const item = useSelector((state) => state.myListItemsById[id])
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))
  const bulkList = useSelector((state) => state.bulkEdit.selected)
  const bulkCurrent = useSelector((state) => state.bulkEdit.currentId)
  const bulkIsCurrent = bulkCurrent === id
  const bulkSelected = bulkList?.map((item) => item.id).includes(id)
  const shortcutId = useSelector((state) => state.shortcuts.currentId)
  const shortcutSelected = shortcutId === id

  const { openExternal, original_url } = item
  const openUrl = openExternal ? original_url : `/read/${id}`

  const ActionMenu = bulkEdit ? <div /> : ActionsMyList

  /** ITEM TRACKING
  --------------------------------------------------------------- */

  const itemImpression = () => {
    if (!impressionFired) dispatch(trackItemImpression(position, item, 'my-list.card'))
  }

  const onOpen = () => {
    dispatch(trackItemOpen(position, item, 'my-list.card'))
  }

  const itemOriginalOpen = () => {
    dispatch(trackItemOpen(position, item, 'my-list.card.view-original'))
  }

  /** ITEM BULK ACTIONS
  --------------------------------------------------------------- */
  const itemBulkSelect = (shift) => dispatch(itemsBulkSelectAction(id, shift))
  const itemBulkDeSelect = (shift) => dispatch(itemsBulkDeSelectAction(id, shift))
  const selectBulk = (event) => {
    if (!bulkEdit) return
    return bulkSelected ? itemBulkDeSelect(event.shiftKey) : itemBulkSelect(event.shiftKey)
  }

  /**
  /** ITEM SELECT ACTIONS
  --------------------------------------------------------------- */
   */
  const itemShare = () => {
    dispatch(trackItemAction(position, item, 'my-list.share'))
    dispatch(itemsShareAction({ id, position }))
  }
  const itemDelete = () => {
    dispatch(trackItemAction(position, item, 'my-list.delete'))
    dispatch(itemsDeleteAction([{ id, position }]))
  }

  const itemArchive = () => {
    dispatch(trackItemAction(position, item, 'my-list.archive'))
    dispatch(itemsArchiveAction([{ id, position }]))
  }
  const itemUnArchive = () => {
    // bool to denote save action
    dispatch(trackItemAction(position, item, true, 'my-list.unarchive'))
    dispatch(itemsUnArchiveAction([{ id, position }]))
  }

  const itemFavorite = () => {
    dispatch(trackItemAction(position, item, 'my-list.favorite'))
    dispatch(itemsFavoriteAction([{ id, position }]))
  }
  const itemUnFavorite = () => {
    dispatch(trackItemAction(position, item, 'my-list.un-favorite'))
    dispatch(itemsUnFavoriteAction([{ id, position }])) //prettier-ignore
  }

  const itemTag = () => {
    dispatch(trackItemAction(position, item, 'my-list.tag'))
    dispatch(itemsTagAction([{ id, position }]))
  }

  const itemBulkSelect = (shift) => dispatch(itemsBulkSelectAction(id, shift)) //prettier-ignore
  const itemBulkDeSelect = (shift) => dispatch(itemsBulkDeSelectAction(id, shift)) //prettier-ignore

  const copyAction = () => ({ type: COPY_ITEM_URL })
  const itemCopy = async () => {
    await copy(item?.open_url)
    dispatch(copyAction())
  }

  const shortcutSelect = () => dispatch(selectShortcutItem(id, position))
  console.log(position, id)
  return item ? (
    <Card
      item={item}
      position={position}
      itemType="myList"
      cardShape={type}
      showExcerpt={true}
      bulkEdit={bulkEdit}
      bulkSelected={bulkSelected}
      bulkIsCurrent={bulkIsCurrent}
      shortcutSelected={shortcutSelected}
      shortcutSelect={shortcutSelect}
      onOpen={onOpen}
      openUrl={openUrl}
      selectBulk={selectBulk}
      itemImpression={itemImpression}
      itemOriginalOpen={itemOriginalOpen}
      isPremium={isPremium}
      ActionMenu={ActionMenu}
    />
  ) : null
}

// This seems like an over-optimization so do some actual testing here
const isEqual = (prev, next) => {
  const isTheSame =
    prev.id === next.id && prev.position === next.position && prev.type === next.type
  return isTheSame
}

export const MemoizedItem = memo(ItemCard, isEqual)
