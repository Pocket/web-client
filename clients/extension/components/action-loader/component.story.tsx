// Components
import { ActionLoader as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Action - Loader ',
  component: Component
}
export default meta

// Stories
export const ActionLoader: StoryObj<typeof Component> = {
  render: () => {
    return <Component />
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '0 1rem' }}>
        <Story />
      </div>
    )
  ],
  args: {}
}
