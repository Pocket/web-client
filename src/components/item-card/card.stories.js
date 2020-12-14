import { Card as CardComponent } from './card'
import { deriveMyListItems } from 'connectors/items-by-id/my-list/items.derive'
import { deriveDiscoverItems } from 'connectors/items-by-id/discover/items.derive'
import { arrayToObject } from 'common/utilities'

import myListResponse from 'mock/my-list.json'
import discoverResponse from 'mock/discover.json'

const discoverItems = deriveDiscoverItems(discoverResponse.feed)
const discoverItem = discoverItems[0]

const myListItems = deriveMyListItems(Object.values(myListResponse.list))
const itemsToDisplay = arrayToObject(myListItems, 'item_id')

export default {
  title: 'Card/Card Shapes',
  component: CardComponent,
  argTypes: {
    itemToDisplay: {
      control: {
        type: 'select',
        options: Object.keys(itemsToDisplay)
      }
    },
    itemType: {
      control: {
        type: 'inline-radio',
        options: ['display', 'myList', 'discover', 'message']
      }
    },
    cardShape: {
      control: {
        type: 'inline-radio'
      }
    },
    item: {
      table: {
        disable: true
      }
    },
    actions: {
      table: {
        disable: true
      }
    },
    position: {
      table: {
        disable: true
      }
    }
  }
}

export const Card = (args) => {
  const item =
    itemsToDisplay[args.itemToDisplay] || itemsToDisplay[myListItems[0].item_id]
  return <CardComponent item={item} position={0} actions={{}} {...args} />
}
Card.args = {
  showExcerpt: true,
  showMedia: true,
  itemType: null,
  cardShape: 'block'
}
