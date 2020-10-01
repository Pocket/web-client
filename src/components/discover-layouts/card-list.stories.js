import { Card } from 'components/discover-card/card'
import response from 'mock/discover.json'
import { cardList } from './card-list'
import { deriveItemData } from 'connectors/discover-items/items.state'

export default {
  title: 'components/discover-card Layouts/cardList'
}

export const Normal = () => {
  const items = deriveItemData(response.feed)
  const list = items.slice(0, 5)
  return (
    <div className={cardList}>
      {list.map((item) => (
        <Card key={item.resolved_id} item={item} />
      ))}
    </div>
  )
}
