import { Card as CardComponent } from 'components/item-card/card'
import { deriveMyListItems } from 'connectors/items-by-id/my-list/items.derive'
import { deriveDiscoverItems } from 'connectors/items-by-id/discover/items.derive'
import myListResponse from 'mock/my-list.json'
import discoverResponse from 'mock/discover.json'
import { css } from 'linaria'

const discoverItems = deriveDiscoverItems(discoverResponse.feed).map((item) => {
  item.story_name = `Discover - ${item.title}`
  return item
})

const myListItems = deriveMyListItems(Object.values(myListResponse.list)).map(
  (item) => {
    item.story_name = `My List - ${item.title}`
    return item
  }
)

const itemsToDisplay = [...myListItems, ...discoverItems]

const grid = css`
  max-width: 936px;
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
  return itemsToDisplay.map((item) => (
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
      {itemsToDisplay.map((item) => (
        <CardComponent item={item} position={0} actions={{}} {...args} />
      ))}
    </div>
  )
}

export const MixedLayout = (args) => {
  return (
    <div className={grid}>
      {itemsToDisplay.map((item, index) => {
        const hero = {
          cardShape: 'block',
          className: 'hero'
        }
        const subset = {
          cardShape: 'wide',
          className: 'subset',
          showExcerpt: true,
          showMedia: true
        }

        const layout = {
          0: hero,
          1: subset,
          2: subset
        }

        const argsToPass = { ...args, ...layout[index] }
        return (
          <CardComponent
            item={item}
            position={0}
            actions={{}}
            {...argsToPass}
          />
        )
      })}
    </div>
  )
}

GridOfCards.args = {
  showExcerpt: true,
  showMedia: true,
  itemType: 'myList',
  cardShape: 'block'
}
