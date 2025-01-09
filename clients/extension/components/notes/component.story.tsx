// Components
import { SavedNotes as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Saved - Notes ',
  component: Component
}
export default meta

// Stories
export const SavedNotes: StoryObj<typeof Component> = {
  render: () => {
    return <Component />
  },
  args: {}
}
