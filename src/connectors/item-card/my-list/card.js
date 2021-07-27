import { memo } from 'react'
import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { setNoImage } from 'connectors/items-by-id/my-list/items.state'
import { itemsBulkSelectAction } from 'connectors/items-by-id/my-list/items.bulk'
import { itemsBulkDeSelectAction } from 'connectors/items-by-id/my-list/items.bulk'
import { selectShortcutItem } from 'connectors/shortcuts/shortcuts.state'
import { ActionsMyList } from 'connectors/item-card/my-list/card-actions'
import { ActionsBulk } from 'connectors/item-card/my-list/card-actions'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { determineOpenUrl } from 'common/utilities/urls/urls'

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
  
  if (!item) return null

  const openUrl = determineOpenUrl(item)
  const showExcerpt = type === 'detail'
  const ActionMenu = bulkEdit ? ActionsBulk : ActionsMyList

  const onImageFail = () => dispatch(setNoImage(id))

  const analyticsData = {
    id,
    url: openUrl,
    position,
    destination: openExternal ? 'external' : 'internal'
  }

  /** ITEM TRACKING
  --------------------------------------------------------------- */
  const onOpen = () => dispatch(sendSnowplowEvent('my-list.card.open', analyticsData))

  const onOpenOriginalUrl = () => {
    const data = { ...analyticsData, destination: 'external' }
    dispatch(sendSnowplowEvent('my-list.card.view-original', data))
  }

  const onItemInView = (inView) => {
    if (!impressionFired && inView) dispatch(sendSnowplowEvent('my-list.card.impression', analyticsData))
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
      onImageFail={onImageFail}
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
