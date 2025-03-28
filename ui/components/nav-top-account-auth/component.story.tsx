// Components
import { NavTopAccountAuth as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Nav - Top / Account - Auth',
  component: Component
}
export default meta

// Stories
export const AccountAuth: StoryObj<typeof Component> = {
  render: () => {
    return <Component />
  },
  args: {}
}
