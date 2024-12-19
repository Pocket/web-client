// Components
import { SavedPreview as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Saved - Preview ',
  component: Component
}
export default meta

// Stories
export const SavedPreview: StoryObj<typeof Component> = {
  render: () => {
    return <Component />
  },
  args: {}
}
