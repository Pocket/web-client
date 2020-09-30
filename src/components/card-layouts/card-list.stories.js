import { Card } from 'components/card/card'
import response from 'mock/discover.json'
import { cardList } from './card-list'
import { deriveItemData } from 'connectors/discoverItems/items.state'

export default {
  title: 'Components/Card Layouts/cardList'
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
