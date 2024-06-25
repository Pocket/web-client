// Components
import { ErrorNotFound as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Error / Four',
  component: Component
}
export default meta

// Stories
export const Four: StoryObj<typeof Component> = {
  render: () => {
    return <Component />
  },
  args: {}
}
