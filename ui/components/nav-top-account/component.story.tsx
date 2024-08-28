// Components
import { NavTopAccount as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Nav - Top / Account',
  component: Component
}
export default meta

// Stories
export const Account: StoryObj<typeof Component> = {
  render: () => {
    return <Component />
  }
}
