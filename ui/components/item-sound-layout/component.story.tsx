// Components
import { ItemSoundLayout as Component } from '.'
import { ItemSound } from '../item-sound'

// State
import { HydrateItemDisplay } from '@common/state/item-display/hydrate'

// Mock Data
import itemsById from '@common/mock-data/in-state/soundById.json'

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
  title: 'Item - Sound / Layout',
  component: Component,
  decorators: [withState]
}
export default meta

// Stories
export const Layout: StoryObj<typeof Component> = {
  render: (args) => {
    return (
      <Component {...args}>
        {Object.keys(itemsById).map((id) => (
          <ItemSound key={id} id={id} />
        ))}
      </Component>
    )
  }
}
