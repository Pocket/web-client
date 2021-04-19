import { Card as CardComponent } from './card'
import { deriveMyListItems } from 'connectors/items-by-id/my-list/items.derive'
import { deriveDiscoverItems } from 'connectors/items-by-id/discover/items.derive'
import { arrayToObject } from 'common/utilities'
import { ItemActions } from 'components/item-actions/inline'
import { IosShareIcon } from '@pocket/web-ui'
import { DeleteIcon } from '@pocket/web-ui'
import { ArchiveIcon } from '@pocket/web-ui'
import { FavoriteIcon } from '@pocket/web-ui'
import { TagIcon } from '@pocket/web-ui'
import { PermanentCopyIcon } from '@pocket/web-ui'

import myListResponse from 'mock/my-list.json'
import discoverResponse from 'mock/discover.json'

import { css } from 'linaria'
import { cardsGrid } from 'components/items-layout/base'

const grid = css`
  max-width: 936px;
  ${cardsGrid};
`

const discoverItems = deriveDiscoverItems(discoverResponse.feed).map((item) => {
  item.story_name = `Discover - ${item.title}`
  return item
})

const myListItems = deriveMyListItems(Object.values(myListResponse.list)).map((item) => {
  item.story_name = `My List - ${item.title}`
  return item
})

const itemsToDisplay = arrayToObject([...myListItems, ...discoverItems], 'story_name')

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
  const item = itemsToDisplay[args.itemToDisplay] || itemsToDisplay[myListItems[0].story_name]
  return (
    <div className={grid}>
      <CardComponent item={item} position={0} actions={{}} {...args} ItemActions={dummyActions} />
    </div>
  )
}

Card.args = {
  showExcerpt: true,
  showMedia: true,
  tags: []
}

const noop = function () {}
const dummyActions = ({ id, position }) => (
  <ItemActions
    menuItems={[
      {
        key: `favorite-${id}`,
        label: 'Favorite',
        icon: <FavoriteIcon />,
        onClick: noop
      },
      {
        key: `tag-${id}`,
        label: 'Tag',
        icon: <TagIcon />,
        onClick: noop
      },
      {
        key: `share-${id}`,
        label: 'Share',
        icon: <IosShareIcon />,
        onClick: noop
      },
      {
        key: `delete-${id}`,
        label: 'Delete',
        icon: <DeleteIcon />,
        onClick: noop
      }
    ]}
  />
)
