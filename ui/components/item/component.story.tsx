// Decorators
import { type GridCount, inGrid } from '../_decorators/inGrid'

// Components
import { Item as Component } from '.'

import { HydrateItemDisplay } from '@common/state/item-display/hydrate'

// Mock Data
import itemsById from '@common/mock-data/in-state/itemsById.json'
import savedItemsById from '@common/mock-data/in-state/itemsRaw.json'

// Types
import type { Meta, StoryFn, StoryObj } from '@storybook/react'

const state = { itemsById }
const withState = (Story: StoryFn) => {
  return (
    <>
      <HydrateItemDisplay state={state} />
      <Story />
    </>
  )
}

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Item',
  component: Component,
  decorators: [withState]
}
export default meta

// Stories
type ComponentPropsAndCustomArgs = React.ComponentProps<typeof Component> & {
  gridCount: GridCount
}

export const Complete: StoryObj<ComponentPropsAndCustomArgs> = {
  render: (args) => {
    return <Component id={args.id.toString()} />
  },
  decorators: [(Story, { args }) => inGrid(Story, args.gridCount)],
  argTypes: {
    gridCount: {
      options: [1, 2, 3, 4, 5],
      control: { type: 'inline-radio' }
    },
    id: {
      options: Object.keys(itemsById),
      control: { type: 'select' },
      mapping: {}
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
          <Component key={id} id={id} />
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
    }
  },
  args: {
    gridCount: 'lockup'
  }
}
