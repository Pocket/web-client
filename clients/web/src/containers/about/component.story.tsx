// Components
import { About as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Marketing / About',
  component: Component
}
export default meta

// Stories
export const About: StoryObj<typeof Component> = {
  render: () => {
    return <Component />
  },
  args: {}
}
