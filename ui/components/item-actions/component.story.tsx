// Components
import { ItemActions as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Item / Actions',
  component: Component
}
export default meta

// Stories
export const Actions: StoryObj<typeof Component> = {
  render: () => {
    return <Component />
  },
  args: {}
}
