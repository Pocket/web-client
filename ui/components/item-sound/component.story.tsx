// Decorators
import { type LayoutType, inArticleLayout } from '../_decorators/inArticleLayout'

// Components
import { ItemSound as Component } from '.'

// Mock Data
import itemData from '@common/mock-data/in-state/soundById.json'

// Types
import { Item } from '@common/types'
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Item - Sound / Complete',
  component: Component
}
export default meta

// Stories
type ComponentPropsAndCustomArgs = {
  layoutType: LayoutType
  id: string
} & React.ComponentProps<typeof Component>

// Stories
const itemsById: Record<string, Item> = itemData

export const Complete: StoryObj<ComponentPropsAndCustomArgs> = {
  render: (args) => {
    const item = itemsById[args.id]!
    return <Component item={item} />
  },
  decorators: [(Story, { args }) => inArticleLayout(Story, args.layoutType)],
  argTypes: {
    id: {
      options: Object.keys(itemsById),
      control: { type: 'select' },
      mapping: {}
    },
    layoutType: {
      options: [1, 2, 3, 4, 5],
      control: { type: 'inline-radio' }
    },
    item: {
      table: {
        disable: true
      }
    }
  },
  args: {
    id: Object.keys(itemsById)[0],
    layoutType: 3
  }
}
