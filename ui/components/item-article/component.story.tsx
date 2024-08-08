// Components
import { ItemArticle as Component } from '.'
// Types
import { ItemArticleLayout, type LayoutType } from '../item-article-layout'

// Mock Data
import itemData from '@common/mock-data/in-state/itemsById.json'

import { Item } from '@common/types'
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Item - Article / Complete',
  component: Component
}
export default meta

// Stories
type ComponentPropsAndCustomArgs = {
  gridCount: LayoutType
  id: string
} & React.ComponentProps<typeof Component>

const itemsById: Record<string, Item> = itemData

export const Complete: StoryObj<ComponentPropsAndCustomArgs> = {
  render: (args) => {
    const itemId = args.id ?? 0
    const item = itemsById[itemId]
    return (
      <ItemArticleLayout layoutType={args.gridCount}>
        <Component item={item as Item} />
      </ItemArticleLayout>
    )
  },
  argTypes: {
    gridCount: {
      options: [1, 2, 3, 4, 5],
      control: { type: 'inline-radio' }
    },
    id: {
      options: Object.keys(itemsById),
      control: { type: 'select' }
    },
    item: {
      table: {
        disable: true
      }
    }
  },
  args: {
    gridCount: 3,
    id: Object.keys(itemsById)[0]
  }
}
