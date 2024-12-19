// Components
import { ExtensionHeader as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Action - Header',
  component: Component
}
export default meta

// Stories
export const ActionHeader: StoryObj<typeof Component> = {
  render: () => {
    return <Component />
  },
  args: {}
}
