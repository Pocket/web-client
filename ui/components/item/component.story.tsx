// Decorators
import { type GridCount, inGrid } from '../_decorators/inGrid'

// Components
import { Item as Component } from '.'

// Mock Data
import itemData from '@common/mock-data/in-state/itemsById.json'

// Types
import { Item } from '@common/types'
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Item',
  component: Component
}
export default meta

// Stories
type ComponentPropsAndCustomArgs = {
  gridCount: GridCount
  id: string
} & React.ComponentProps<typeof Component>

const itemsById: Record<string, Item> = itemData

export const Complete: StoryObj<ComponentPropsAndCustomArgs> = {
  render: (args) => {
    const itemId = args.id ?? 0
    const item = itemsById[itemId]
    return <Component item={item as Item} />
  },
  decorators: [(Story, { args }) => inGrid(Story, args.gridCount)],
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

export const InLayout: StoryObj<ComponentPropsAndCustomArgs> = {
  render: () => {
    return (
      <>
        {Object.keys(itemsById).map((id) => (
          <Component key={id} item={itemsById[id] as Item} />
        ))}
      </>
    )
  },
  decorators: [(Story, { args }) => inGrid(Story, args.gridCount)],
  argTypes: {
    id: {
      table: {
        disable: true
      }
    },
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
    gridCount: 'lockup'
  }
}
