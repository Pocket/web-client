// Components
import { NavTop as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Nav - Top / Complete',
  component: Component,
  parameters: {
    layout: 'fullscreen'
  }
}
export default meta

// Stories
export const Complete: StoryObj<typeof Component> = {
  render: (args) => {
    return <Component {...args} />
  },
  args: {
    isLoggedIn: false
  }
}
