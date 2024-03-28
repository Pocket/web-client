// Components
import { NavTopAccountProfile as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Nav - Top / Account - Profile',
  component: Component
}
export default meta

// Stories
export const AccountProfile: StoryObj<typeof Component> = {
  render: () => {
    return <Component />
  },
  args: {}
}
