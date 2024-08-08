// Components
import { ItemMicro as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Item / Micro',
  component: Component
}
export default meta

// Stories
export const Micro: StoryObj<typeof Component> = {
  render: () => {
    return <Component />
  },
  args: {}
}
