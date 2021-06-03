import { Card as CardComponent } from 'components/item-card/card'
import { deriveMyListItems } from 'connectors/items-by-id/my-list/items.derive'
import { deriveDiscoverItems } from 'connectors/items-by-id/discover/items.derive'
import { OffsetList as OffsetComponent } from './list-offset'
import myListResponse from 'mock/my-list.json'
import discoverResponse from 'mock/discover.json'
import { arrayToObject } from 'common/utilities'

const discoverItems = deriveDiscoverItems(discoverResponse.feed).map((item) => {
  item.story_name = `Discover - ${item.title}`
  return item
})

const myListItems = deriveMyListItems(Object.values(myListResponse.list)).map((item) => {
  item.story_name = `My List - ${item.title}`
  return item
})

const itemsToDisplay = [...myListItems, ...discoverItems]
const itemsById = arrayToObject(itemsToDisplay, 'item_id')
const items = Object.keys(itemsById)

export default {
  title: 'Card Layouts/Offset',
  component: OffsetComponent
}

const ItemCard = ({ id, position, ...rest }) => {
  return <CardComponent key={id} item={itemsById[id]} position={position} {...rest} />
}

export const OffsetList = () => {
  return (
    <OffsetComponent items={items} offset={5} cardShape="wide" ItemCard={ItemCard} border={true} />
  )
}
