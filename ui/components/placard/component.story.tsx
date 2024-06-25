// Components
import { Placard as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Placard / Complete',
  component: Component
}
export default meta

// Stories
export const Complete: StoryObj<typeof Component> = {
  render: () => {
    return <Component/>
  },
  args: {}
}
