// Components
import { SavedLoader as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Saved - Loader ',
  component: Component
}
export default meta

// Stories
export const SavedLoader: StoryObj<typeof Component> = {
  render: () => {
    return <Component />
  },
  args: {}
}
