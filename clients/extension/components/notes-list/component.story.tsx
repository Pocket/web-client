// Components
import { NotesList as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Notes - List',
  component: Component
}
export default meta

// Stories
export const NotesList: StoryObj<typeof Component> = {
  render: () => {
    return <Component />
  },
  args: {}
}
