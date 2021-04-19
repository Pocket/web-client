import { Card as CardComponent } from 'components/item-card/card'
import { deriveMyListItems } from 'connectors/items-by-id/my-list/items.derive'
import { deriveDiscoverItems } from 'connectors/items-by-id/discover/items.derive'
import myListResponse from 'mock/my-list.json'
import discoverResponse from 'mock/discover.json'
import { css } from 'linaria'
import { cardsGrid } from './base'
import { Lockup } from 'components/items-layout/list-lockup'
import { OffsetList } from 'components/items-layout/list-offset'
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
const items = arrayToObject(itemsToDisplay, 'item_id')
const itemIds = Object.keys(items)

const grid = css`
  max-width: 936px;
  ${cardsGrid};
`

export default {
  title: 'Card/Card Layouts',
  component: CardComponent,
  argTypes: {
    cardShape: { control: { type: 'inline-radio' } },
    item: { table: { disable: true } },
    actions: { table: { disable: true } },
    position: { table: { disable: true } },
    className: { table: { disable: true } },
    impressionAction: { table: { disable: true } },
    engagementAction: { table: { disable: true } },
    saveAction: { table: { disable: true } },
    reportAction: { table: { disable: true } },
    unSaveAction: { table: { disable: true } },
    openAction: { table: { disable: true } },
    itemBulkSelect: { table: { disable: true } },
    itemBulkDeSelect: { table: { disable: true } }
  }
}

export const ListOfCards = (args) => {
  return (
    <div className={grid}>
      {itemsToDisplay.map((item) => (
        <CardComponent item={item} position={0} actions={{}} {...args} />
      ))}
    </div>
  )
}
ListOfCards.args = {
  showExcerpt: true,
  showMedia: true,
  cardShape: 'block'
}

// This emulates a connected item
const ItemCard = ({ id, ...rest }) => {
  return <CardComponent item={items[id]} {...rest} />
}

export const HeroCenter = (args) => (
  <Lockup items={itemIds} offset={0} heroPosition="center" ItemCard={ItemCard} />
)

export const HeroLeft = (args) => (
  <Lockup items={itemIds} offset={0} heroPosition="left" ItemCard={ItemCard} />
)

export const HeroRight = (args) => (
  <Lockup items={itemIds} offset={0} heroPosition="right" ItemCard={ItemCard} />
)

export const FiniteList = (args) => (
  <OffsetList items={itemIds} offset={10} cardShape="wide" ItemCard={ItemCard} />
)
