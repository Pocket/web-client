import { Card as CardComponent } from './card'
import { deriveDiscoverItems } from 'connectors/items-by-id/discover/items.derive'

import response from 'mock/discover.json'

export default {
  title: 'Card/Discover',
  component: CardComponent
}

export const Card = () => {
  const items = deriveDiscoverItems(response.feed)
  const list = items.slice(0, 1)
  return list.map((item) => <CardComponent item={item} />)
}
