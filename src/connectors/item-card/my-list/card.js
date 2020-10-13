import { Card } from 'components/item-card/my-list/card'
import { useSelector, useDispatch } from 'react-redux'

import { itemsArchiveAction } from 'connectors/items-by-id/my-list/items.archive'
import { itemsUnArchiveAction } from 'connectors/items-by-id/my-list/items.archive'

import { itemsFavoriteAction } from 'connectors/items-by-id/my-list/items.favorite'
import { itemsUnFavoriteAction } from 'connectors/items-by-id/my-list/items.favorite'

import { itemsDeleteAction } from 'connectors/items-by-id/my-list/items.delete'

/**
 * Article Card
 * Creates a connected `Card` with the appropriate data and actions
 * @param {object} {id, position} item_id for data and position for analytics
 */
export function ItemCard({ id, position, fluidHeight }) {
  const dispatch = useDispatch()

  // Get data from state
  const item = useSelector((state) => state.myListItemsById[id])

  const itemShare = () => {}
  const itemDelete = () => dispatch(itemsDeleteAction([{ id, position }]))

  const itemArchive = () => dispatch(itemsArchiveAction([{ id, position }]))
  const itemUnArchive = () => dispatch(itemsUnArchiveAction([{ id, position }]))

  const itemFavorite = () => dispatch(itemsFavoriteAction([{ id, position }]))
  const itemUnFavorite = () => dispatch(itemsUnFavoriteAction([{ id, position }])) //prettier-ignore

  const itemTag = () => {}

  return (
    <Card
      item={item}
      position={position}
      fluidHeight={fluidHeight}
      actions={{
        itemShare,
        itemDelete,
        itemArchive,
        itemUnArchive,
        itemFavorite,
        itemUnFavorite,
        itemTag
      }}
    />
  )
}

// This seems like an over-optimization so do some actual testing here
const isEqual = (prev, next) => {
  const isTheSame = prev.id === next.id && prev.position === next.position
  return isTheSame
}

export const MemoizedItem = React.memo(ItemCard, isEqual)
