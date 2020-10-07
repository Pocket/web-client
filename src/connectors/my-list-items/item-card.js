import { Card } from 'components/my-list-card/card'
import { useSelector } from 'react-redux'

/**
 * Article Card
 * Creates a connected `Card` with the appropriate data and actions
 * @param {object} {id, position} item_id for data and position for analytics
 */
export function ItemCard({ id, position }) {
  // Get data from state
  const item = useSelector((state) => state.myListItemsById[id])

  return <Card item={item} position={position} />
}

// This seems like an over-optimization so do some actual testing here
const isEqual = (prev, next) => {
  const isTheSame = prev.id === next.id && prev.position === next.position
  return isTheSame
}

export const MemoizedItem = React.memo(ItemCard, isEqual)
