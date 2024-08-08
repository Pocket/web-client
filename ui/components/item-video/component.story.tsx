// Decorators
import { type LayoutType, inArticleLayout } from '../_decorators/inArticleLayout'

// Components
import { ItemVideo as Component } from '.'

// State
import { HydrateItemDisplay } from '@common/state/item-display/hydrate'

// Mock Data
import itemsById from '@common/mock-data/in-state/videosById.json'

// Types
import type { Meta, StoryFn, StoryObj } from '@storybook/react'

// Setting up required state
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
  title: 'Item - Video / Complete',
  component: Component,
  decorators: [withState]
}
export default meta

// Stories
type ComponentPropsAndCustomArgs = {
  layoutType: LayoutType
} & React.ComponentProps<typeof Component>

export const Complete: StoryObj<ComponentPropsAndCustomArgs> = {
  render: (args) => {
    return <Component id={args.id} />
  },
  decorators: [(Story, { args }) => inArticleLayout(Story, args.layoutType)],
  argTypes: {
    id: {
      options: Object.keys(itemsById),
      control: { type: 'select' },
      mapping: {}
    },
    layoutType: {
      options: [1, 2],
      control: { type: 'inline-radio' }
    }
  },
  args: {
    id: Object.keys(itemsById)[0],
    layoutType: 3
  }
}
