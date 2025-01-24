// Components
import { Notes as Component } from '.'
import type { SetStateAction } from 'react'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Notes - Complete',
  component: Component
}
export default meta

// Stories
export const NotesComplete: StoryObj<typeof Component> = {
  render: () => {
    return (
      <Component
        setShowNotes={function (value: SetStateAction<boolean>): void {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          throw new Error(`Function not implemented. ${value}`)
        }}
      />
    )
  },
  args: {}
}
