// Components
import { SavedFooter as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Saves - Footer',
  component: Component
}
export default meta

// Stories
export const SavesFooter: StoryObj<typeof Component> = {
  render: () => {
    const setShowNotes = () => {}
    return <Component setShowNotes={setShowNotes} />
  },
  args: {}
}
