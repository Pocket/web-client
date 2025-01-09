// Components
import { ExtensionFooter as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Action - Footer',
  component: Component
}
export default meta

// Stories
export const ActionFooter: StoryObj<typeof Component> = {
  render: () => {
    return <Component />
  },
  args: {}
}
