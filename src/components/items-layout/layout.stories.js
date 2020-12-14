import { Card as CardComponent } from 'components/item-card/card'
import { deriveMyListItems } from 'connectors/items-by-id/my-list/items.derive'
import { deriveDiscoverItems } from 'connectors/items-by-id/discover/items.derive'
import { arrayToObject } from 'common/utilities'
import myListResponse from 'mock/my-list.json'
import discoverResponse from 'mock/discover.json'
import { css } from 'linaria'

const discoverItems = deriveDiscoverItems(discoverResponse.feed)
const discoverItem = discoverItems[0]

const myListItems = deriveMyListItems(Object.values(myListResponse.list))
const itemsToDisplay = arrayToObject(myListItems, 'item_id')

const grid = css`
  display: grid;
  align-items: start;
  grid-column-gap: var(--spacing150);
  grid-template-columns: repeat(12, 1fr);
  article {
    grid-column: span 4;
  }
`

export default {
  title: 'Card/Card Layouts',
  component: CardComponent,
  argTypes: {
    itemType: {
      control: {
        type: 'inline-radio'
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

export const ListOfCards = (args) => {
  return discoverItems.map((item) => (
    <CardComponent item={item} position={0} actions={{}} {...args} />
  ))
}
ListOfCards.args = {
  showExcerpt: true,
  showMedia: true,
  itemType: null,
  cardShape: 'block'
}

export const GridOfCards = (args) => {
  return (
    <div className={grid}>
      {discoverItems.map((item) => (
        <CardComponent item={item} position={0} actions={{}} {...args} />
      ))}
    </div>
  )
}

GridOfCards.args = {
  showExcerpt: true,
  showMedia: true,
  itemType: 'myList',
  cardShape: 'block'
}
