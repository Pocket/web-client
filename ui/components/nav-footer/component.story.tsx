// Components
import { NavFooter as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Nav - Footer / Complete',
  component: Component
}
export default meta

// Stories
export const Complete: StoryObj<typeof Component> = {
  render: () => {
    return <Component />
  },
  args: {}
}
