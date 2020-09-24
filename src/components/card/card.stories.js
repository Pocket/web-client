import { Card as CardComponent } from './card'
import { deriveItemData } from 'connectors/items/items.state'

import response from 'mock/discover.json'

export default {
  title: 'Components/Card/Card',
  component: CardComponent
}

export const Card = () => {
  const items = deriveItemData(response.feed)
  const list = items.slice(0, 1)
  return list.map((item) => <CardComponent item={item} />)
}
