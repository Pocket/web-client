import { memo } from 'react'
import { useEffect } from 'react'
import { Card } from 'components/item-card/my-list/card'
import { useSelector, useDispatch } from 'react-redux'
import { useInView } from 'react-intersection-observer'

import { itemsArchiveAction } from 'connectors/items-by-id/my-list/items.archive'
import { itemsUnArchiveAction } from 'connectors/items-by-id/my-list/items.archive'

import { itemsFavoriteAction } from 'connectors/items-by-id/my-list/items.favorite'
import { itemsUnFavoriteAction } from 'connectors/items-by-id/my-list/items.favorite'

import { itemsDeleteAction } from 'connectors/items-by-id/my-list/items.delete'
import { itemsTagAction } from 'connectors/items-by-id/my-list/items.tag'
import { itemsShareAction } from 'connectors/items-by-id/my-list/items.share'

import { itemsBulkSelectAction } from 'connectors/items-by-id/my-list/items.bulk'
import { itemsBulkDeSelectAction } from 'connectors/items-by-id/my-list/items.bulk'

import { fireItemImpression } from 'connectors/item-card/my-list/card.analytics'
import { fireItemOpen } from 'connectors/item-card/my-list/card.analytics'
import { trackItemOpen } from 'connectors/item-card/my-list/card.analytics'

/**
 * Article Card
 * Creates a connected `Card` with the appropriate data and actions
 * @param {object} {id, position} item_id for data and position for analytics
 */
export function ItemCard({ id, position, fluidHeight, type }) {
  const dispatch = useDispatch()

  const appMode = useSelector((state) => state?.app?.mode)
  const bulkEdit = appMode === 'bulk'

  // Get data from state
  const item = useSelector((state) => state.myListItemsById[id])

  const bulkList = useSelector((state) => state.bulkEdit)
  const bulkSelected = bulkList?.selected?.map((item) => item.id).includes(id)

  // Fire item impression
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })
  useEffect(
    //prettier-ignore
    () => fireItemImpression(position, item, inView, dispatch),
    [position, item, inView]
  )

  const itemShare = () => dispatch(itemsShareAction({ id, position }))
  const itemDelete = () => dispatch(itemsDeleteAction([{ id, position }]))

  const itemArchive = () => dispatch(itemsArchiveAction([{ id, position }]))
  const itemUnArchive = () => dispatch(itemsUnArchiveAction([{ id, position }]))

  const itemFavorite = () => dispatch(itemsFavoriteAction([{ id, position }]))
  const itemUnFavorite = () => dispatch(itemsUnFavoriteAction([{ id, position }])) //prettier-ignore

  const itemTag = () => dispatch(itemsTagAction([{ id, position }]))

  const itemBulkSelect = (shift) => {dispatch(itemsBulkSelectAction(id, shift))} //prettier-ignore
  const itemBulkDeSelect = (shift) => {dispatch(itemsBulkDeSelectAction(id, shift))} //prettier-ignore

  const onOpen = () => {
    trackItemOpen(position + 1, item, type) // legacy analytics uses 1 based position
    fireItemOpen(position, item, dispatch)
  }

  return item ? (
    <Card
      ref={ref}
      item={item}
      position={position}
      fluidHeight={fluidHeight}
      type={type}
      bulkEdit={bulkEdit}
      bulkSelected={bulkSelected}
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
        itemBulkDeSelect
      }}
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
