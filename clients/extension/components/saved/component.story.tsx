// Components
import { SavedScreen as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Saved - Complete ',
  component: Component
}
export default meta

// Stories
export const SavedComplete: StoryObj<typeof Component> = {
  render: () => {
    return <Component actionUnSave={() => null} />
  },
  args: {}
}
