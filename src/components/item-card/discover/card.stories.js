import { Card as CardComponent } from './card'
import { deriveItemData } from 'connectors/items-by-id/discover/items.state'

import response from 'mock/discover.json'

export default {
  title: 'components/discover-card/Card',
  component: CardComponent
}

export const Card = () => {
  const items = deriveItemData(response.feed)
  const list = items.slice(0, 1)
  return list.map((item) => <CardComponent item={item} />)
}
