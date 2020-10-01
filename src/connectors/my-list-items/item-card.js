import { Card } from 'components/my-list-card/card'
import { useSelector } from 'react-redux'

/**
 * Article Card
 * Creates a connected `Card` with the appropriate data and actions
 * @param {object} {id, position} item_id for data and position for analytics
 */
export function ItemCard({ id }) {
  // Get data from state
  const item = useSelector((state) => state.myListItemsById[id])

  return <Card item={item} />
}
