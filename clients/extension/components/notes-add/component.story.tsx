// Components
import { useRef } from 'react'
import { NotesAdd as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Notes - Add',
  component: Component
}
export default meta

// Stories
export const NotesAdd: StoryObj<typeof Component> = {
  render: () => {
    const textRef = useRef<HTMLTextAreaElement | null>(null)
    return <Component textRef={textRef} />
  },
  args: {}
}
