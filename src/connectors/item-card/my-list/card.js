import { memo } from 'react'
import { Card } from 'components/item-card/my-list/card'
import { useSelector, useDispatch } from 'react-redux'

import { itemsArchiveAction } from 'connectors/items-by-id/my-list/items.archive'
import { itemsUnArchiveAction } from 'connectors/items-by-id/my-list/items.archive'

import { itemsFavoriteAction } from 'connectors/items-by-id/my-list/items.favorite'
import { itemsUnFavoriteAction } from 'connectors/items-by-id/my-list/items.favorite'

import { itemsDeleteAction } from 'connectors/items-by-id/my-list/items.delete'
import { itemsTagAction } from 'connectors/items-by-id/my-list/items.tag'
import { itemsShareAction } from 'connectors/items-by-id/my-list/items.share'

import { itemsBulkSelectAction } from 'connectors/items-by-id/my-list/items.bulk'
import { itemsBulkDeSelectAction } from 'connectors/items-by-id/my-list/items.bulk'

import { fireItemOpen } from 'connectors/items-by-id/my-list/items.analytics'
import { trackItemOpen } from 'connectors/items-by-id/my-list/items.analytics'
import { setImpression } from 'connectors/items-by-id/my-list/items.analytics'
import { sendEngagementEvent } from 'connectors/items-by-id/my-list/items.analytics'
import { selectShortcutItem } from 'connectors/shortcuts/shortcuts.state'

import copy from 'clipboard-copy'
import { COPY_ITEM_URL } from 'actions'

/**
 * Article Card
 * Creates a connected `Card` with the appropriate data and actions
 * @param {object} {id, position} item_id for data and position for analytics
 */
export function ItemCard({ id, position, fluidHeight, type }) {
  const dispatch = useDispatch()

  const appMode = useSelector((state) => state?.app?.mode)
  const bulkEdit = appMode === 'bulk'

  const isPremium = useSelector((state) => state.user.premium_status === '1')

  // Get data from state
  const item = useSelector((state) => state.myListItemsById[id])
  const impression = useSelector((state) => state.itemsAnalytics.impressions)

  const bulkList = useSelector((state) => state.bulkEdit.selected)
  const bulkCurrent = useSelector((state) => state.bulkEdit.currentId)

  const bulkIsCurrent = bulkCurrent === id
  const bulkSelected = bulkList?.map((item) => item.id).includes(id)

  const shortcutId = useSelector((state) => state.shortcuts.currentId)
  const shortcutSelected = shortcutId === id

  const itemImpression = () => {
    if (!impression[item.item_id]) {
      dispatch(setImpression(position, item))
    }
  }

  const itemShare = () => {
    dispatch(sendEngagementEvent('my-list.share', position, item))
    dispatch(itemsShareAction({ id, position }))
  }
  const itemDelete = () => {
    dispatch(sendEngagementEvent('my-list.delete', position, item))
    dispatch(itemsDeleteAction([{ id, position }]))
  }

  const itemArchive = () => {
    dispatch(sendEngagementEvent('my-list.archive', position, item))
    dispatch(itemsArchiveAction([{ id, position }]))
  }
  const itemUnArchive = () => {
    // bool to denote save action
    dispatch(sendEngagementEvent('my-list.unarchive', position, item, true))
    dispatch(itemsUnArchiveAction([{ id, position }]))
  }

  const itemFavorite = () => {
    dispatch(sendEngagementEvent('my-list.favorite', position, item))
    dispatch(itemsFavoriteAction([{ id, position }]))
  }
  const itemUnFavorite = () => {
    dispatch(sendEngagementEvent('my-list.un-favorite', position, item))
    dispatch(itemsUnFavoriteAction([{ id, position }])) //prettier-ignore
  }

  const itemTag = () => {
    dispatch(sendEngagementEvent('my-list.tag', position, item))
    dispatch(itemsTagAction([{ id, position }]))
  }

  const itemBulkSelect = (shift) => dispatch(itemsBulkSelectAction(id, shift)) //prettier-ignore
  const itemBulkDeSelect = (shift) => dispatch(itemsBulkDeSelectAction(id, shift)) //prettier-ignore

  const copyAction = () => ({ type: COPY_ITEM_URL })
  const itemCopy = async () => {
    await copy(item?.open_url)
    dispatch(copyAction())
  }

  const onOpen = () => {
    trackItemOpen(position + 1, item, type) // legacy analytics uses 1 based position
    fireItemOpen(position, item, dispatch)
  }

  const shortcutSelect = () => dispatch(selectShortcutItem(id, position))

  return item ? (
    <Card
      item={item}
      position={position}
      fluidHeight={fluidHeight}
      type={type}
      bulkEdit={bulkEdit}
      bulkSelected={bulkSelected}
      bulkIsCurrent={bulkIsCurrent}
      shortcutSelected={shortcutSelected}
      shortcutSelect={shortcutSelect}
      onOpen={onOpen}
      actions={{
        itemShare,
        itemDelete,
        itemArchive,
        itemUnArchive,
        itemFavorite,
        itemUnFavorite,
        itemTag,
        itemBulkSelect,
        itemBulkDeSelect,
        itemImpression,
        itemCopy
      }}
      isPremium={isPremium}
    />
  ) : null
}

// This seems like an over-optimization so do some actual testing here
const isEqual = (prev, next) => {
  const isTheSame =
    prev.id === next.id &&
    prev.position === next.position &&
    prev.type === next.type
  return isTheSame
}

export const MemoizedItem = memo(ItemCard, isEqual)
