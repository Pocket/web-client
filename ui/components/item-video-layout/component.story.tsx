// Components
import { ItemVideoLayout as Component } from '.'
import { ItemVideo } from '../item-video'

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
  title: 'Item - Video / Layout',
  component: Component,
  decorators: [withState]
}
export default meta

// Stories
export const Layout: StoryObj<typeof Component> = {
  render: (args) => {
    return (
      <div className="page-container">
        <Component {...args}>
          {Object.keys(itemsById).map((id) => (
            <ItemVideo key={id} id={id} />
          ))}
        </Component>
      </div>
    )
  }
}
