import { Card as CardComponent } from 'components/item-card/card'
import { deriveMyListItems } from 'connectors/items-by-id/my-list/items.derive'
import { deriveDiscoverItems } from 'connectors/items-by-id/discover/items.derive'
import myListResponse from 'mock/my-list.json'
import discoverResponse from 'mock/discover.json'
import { css } from 'linaria'
import { cardsGrid } from './base'

const discoverItems = deriveDiscoverItems(discoverResponse.feed).map((item) => {
  item.story_name = `Discover - ${item.title}`
  return item
})

const myListItems = deriveMyListItems(Object.values(myListResponse.list)).map((item) => {
  item.story_name = `My List - ${item.title}`
  return item
})

const itemsToDisplay = [...myListItems, ...discoverItems]

const grid = css`
  max-width: 936px;
  ${cardsGrid};
`

export default {
  title: 'Card/Card Layouts',
  component: CardComponent,
  argTypes: {
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
GridOfCards.args = {
  showExcerpt: true,
  showMedia: true,
  itemType: 'myList',
  cardShape: 'block'
}

export const MixedLayout = (args) => {
  const hero = {
    cardShape: 'block',
    className: 'hero-block',
    showMedia: true
  }
  const subset = {
    cardShape: 'detail',
    className: 'subset',
    showExcerpt: true,
    showMedia: true,
    itemType: 'discover'
  }

  const layout = {
    0: hero,
    1: subset,
    2: subset,
    3: subset
  }

  return (
    <div className={grid}>
      {itemsToDisplay.map((item, index) => {
        const argsToPass = { ...args, ...layout[index] }
        return <CardComponent item={item} position={0} actions={{}} {...argsToPass} />
      })}
    </div>
  )
}

MixedLayout.args = {
  showExcerpt: true,
  showMedia: true,
  itemType: 'discover',
  cardShape: 'block'
}

export const CenterLockup = (args) => {
  const hero = {
    className: 'hero-center',
    cardShape: 'grid',
    itemType: 'discover',
    showExcerpt: true
  }
  const base = {
    className: 'lockup',
    cardShape: 'grid',
    itemType: 'discover'
  }

  const layout = {
    0: hero,
    1: base,
    2: base,
    3: base,
    4: base
  }

  return (
    <div className={grid}>
      {itemsToDisplay.slice(0, 5).map((item, index) => {
        const argsToPass = { ...args, ...layout[index] }
        return <CardComponent item={item} position={0} actions={{}} {...argsToPass} />
      })}
    </div>
  )
}

export const LeftLockup = (args) => {
  const hero = {
    className: 'hero-left',
    cardShape: 'grid',
    itemType: 'discover',
    showExcerpt: true
  }

  const base = {
    className: 'lockup',
    cardShape: 'grid',
    itemType: 'discover'
  }

  const layout = {
    0: hero,
    1: base,
    2: base,
    3: base,
    4: base
  }

  return (
    <div className={grid}>
      {itemsToDisplay.slice(0, 5).map((item, index) => {
        const argsToPass = { ...args, ...layout[index] }
        return <CardComponent item={item} position={0} actions={{}} {...argsToPass} />
      })}
    </div>
  )
}

export const RightLockup = (args) => {
  const hero = {
    className: 'hero-right',
    cardShape: 'grid',
    itemType: 'discover',
    showExcerpt: true
  }
  const base = {
    className: 'lockup',
    cardShape: 'grid',
    itemType: 'discover'
  }

  const layout = {
    0: hero,
    1: base,
    2: base,
    3: base,
    4: base
  }

  return (
    <div className={grid}>
      {itemsToDisplay.slice(0, 5).map((item, index) => {
        const argsToPass = { ...args, ...layout[index] }
        return <CardComponent item={item} position={0} actions={{}} {...argsToPass} />
      })}
    </div>
  )
}
