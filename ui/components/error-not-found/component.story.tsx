// Components
import { ErrorNotFound as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Error / Not Found',
  component: Component
}
export default meta

// Stories
export const NotFound: StoryObj<typeof Component> = {
  render: () => {
    return <Component />
  },
  args: {}
}
