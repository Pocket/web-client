import { Card as CardComponent } from './card'
import { deriveMyListItems } from 'connectors/items-by-id/my-list/items.derive'

import response from 'mock/discover.json'

export default {
  title: 'Card/My List',
  component: CardComponent
}

export const Card = () => {
  const items = deriveMyListItems(response.feed)
  const list = items.slice(0, 1)
  return list.map((item) => <CardComponent item={item} />)
}
