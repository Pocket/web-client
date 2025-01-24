// Components
import { ExtensionError as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Action - Error',
  component: Component
}
export default meta

// Stories
export const ActionError: StoryObj<typeof Component> = {
  render: (args) => {
    return <Component errorMessage={args.errorMessage} />
  },
  args: {
    errorMessage: 'Oops, something is awry.'
  }
}
