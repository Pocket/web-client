import { memo } from 'react'
import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { itemsBulkSelectAction } from 'connectors/items-by-id/my-list/items.bulk'
import { itemsBulkDeSelectAction } from 'connectors/items-by-id/my-list/items.bulk'
import { selectShortcutItem } from 'connectors/shortcuts/shortcuts.state'
import { ActionsMyList } from 'connectors/item-card/my-list/card-actions'

import { trackItemImpression } from 'connectors/snowplow/snowplow.state'
import { trackItemOpen } from 'connectors/snowplow/snowplow.state'

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

  const showExcerpt = type === 'detail'
  const ActionMenu = bulkEdit ? <div /> : ActionsMyList

  /** ITEM TRACKING
  --------------------------------------------------------------- */

  const onOpen = () => {
    dispatch(trackItemOpen(position, item, 'my-list.card'))
  }

  const onOpenOriginalUrl = () => {
    dispatch(trackItemOpen(position, item, 'my-list.card.view-original'))
  }

  const onItemInView = (inView) => {
    if (!impressionFired && inView) dispatch(trackItemImpression(position, item, 'my-list.card'))
  }

  /** ITEM BULK ACTIONS
  --------------------------------------------------------------- */
  const itemBulkSelect = (shift) => dispatch(itemsBulkSelectAction(id, shift))
  const itemBulkDeSelect = (shift) => dispatch(itemsBulkDeSelectAction(id, shift))
  const bulkAction = bulkSelected ? itemBulkDeSelect : itemBulkSelect
  const selectBulk = (event) => (bulkEdit ? bulkAction(event.shiftKey) : null)

  /** ITEM SELECT ACTIONS
  --------------------------------------------------------------- */
  const shortcutSelect = () => dispatch(selectShortcutItem(id, position))

  return item ? (
    <Card
      item={item}
      position={position}
      cardShape={type}
      hiddenActions={true}
      showExcerpt={showExcerpt}
      bulkEdit={bulkEdit}
      bulkSelected={bulkSelected}
      bulkIsCurrent={bulkIsCurrent}
      shortcutSelected={shortcutSelected}
      shortcutSelect={shortcutSelect}
      openUrl={openUrl}
      onOpen={onOpen}
      onOpenOriginalUrl={onOpenOriginalUrl}
      onItemInView={onItemInView}
      selectBulk={selectBulk}
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
