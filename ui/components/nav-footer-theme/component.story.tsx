// Components
import { NavFooterTheme as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Nav - Footer / Theme',
  component: Component
}
export default meta

// Stories
export const Theme: StoryObj<typeof Component> = {
  render: () => {
    return <Component />
  },
  args: {}
}
