// Decorators
import { type LayoutType, inArticleLayout } from '../_decorators/inArticleLayout'

// Components
import { ItemShort as Component } from '.'

// Mock Data
import itemData from '@common/mock-data/in-state/shortsById.json'

// Types
import type { Item } from '@common/types'
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Item - Short / Complete',
  component: Component
}
export default meta

// Stories
type ComponentPropsAndCustomArgs = {
  layoutType: LayoutType
  id: string
} & React.ComponentProps<typeof Component>

const itemsById: Record<string, Item> = itemData

export const Complete: StoryObj<ComponentPropsAndCustomArgs> = {
  render: (args) => {
    const item = itemsById[args.id] as unknown as Item
    return <Component item={item} />
  },
  decorators: [(Story, { args }) => inArticleLayout(Story, args.layoutType)],
  argTypes: {
    layoutType: {
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
    id: Object.keys(itemsById)[0],
    layoutType: 3
  }
}
