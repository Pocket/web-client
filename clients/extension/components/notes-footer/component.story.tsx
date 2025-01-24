// Components
import { NotesFooter as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Notes - Footer',
  component: Component
}
export default meta

// Stories
export const NotesFooter: StoryObj<typeof Component> = {
  render: () => {
    const setShowNotes = () => {}
    return (
      <Component
        setShowNotes={setShowNotes}
        handleAddNote={function (): void {
          throw new Error('Function not implemented.')
        }}
      />
    )
  },
  args: {}
}
