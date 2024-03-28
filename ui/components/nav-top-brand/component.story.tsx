// Components
import { NavTopBrand as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Nav - Top / Brand',
  component: Component
}
export default meta

// Stories
export const Brand: StoryObj<typeof Component> = {
  render: () => {
    return <Component />
  },
  args: {}
}
