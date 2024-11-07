// Components
import { ItemArticle as Component } from '../item-article'
import { ItemArticleLayout, type LayoutType } from '../item-article-layout'

// Mock Data
import itemData from '@common/mock-data/in-state/itemsById.json'

// Types
import { Item } from '@common/types'
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Item - Article / Layout',
  component: Component
}
export default meta

// Stories
type ComponentPropsAndCustomArgs = {
  gridCount: LayoutType
} & React.ComponentProps<typeof Component>

const itemsById: Record<string, Item> = itemData

export const Layout: StoryObj<ComponentPropsAndCustomArgs> = {
  render: (args) => {
    return (
      <ItemArticleLayout layoutType={args.gridCount}>
        {Object.keys(itemsById).map((id) => (
          <Component key={id} item={itemsById[id]!} />
        ))}
      </ItemArticleLayout>
    )
  },
  argTypes: {
    gridCount: {
      options: [1, 2, 3, 4, 5, 'lockup'],
      control: { type: 'inline-radio' }
    },
    item: {
      table: {
        disable: true
      }
    }
  },
  args: {
    gridCount: 3
  }
}
