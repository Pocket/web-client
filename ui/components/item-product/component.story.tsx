// Components
import { ItemProduct as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Item / Product',
  component: Component
}
export default meta

// Stories
export const Product: StoryObj<typeof Component> = {
  render: () => {
    return <Component />
  },
  args: {}
}
