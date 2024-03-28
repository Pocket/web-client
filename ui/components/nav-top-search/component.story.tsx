// Components
import { NavTopSearch as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Nav - Top / Search',
  component: Component
}
export default meta

// Stories
export const Search: StoryObj<typeof Component> = {
  render: () => {
    return <Component />
  },
  args: {}
}
