// Decorators
import { type LayoutType, inArticleLayout } from '../_decorators/inArticleLayout'

// Components
import { ItemArticle as Component } from '.'

// State
import { HydrateItemDisplay } from '@common/state/item-display/hydrate'

// Mock Data
import itemsById from '@common/mock-data/in-state/itemsById.json'

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
  title: 'Item - Article / Complete',
  component: Component,
  decorators: [withState]
}
export default meta

// Stories
type ComponentPropsAndCustomArgs = {
  layoutType: LayoutType
} & React.ComponentProps<typeof Component>

export const Complete: StoryObj<ComponentPropsAndCustomArgs> = {
  decorators: [(Story, { args }) => inArticleLayout(Story, args.layoutType)],
  render: (args) => {
    return <Component id={args.id.toString()} />
  },
  argTypes: {
    layoutType: {
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
    layoutType: 3,
    id: Object.keys(itemsById)[0]
  }
}
