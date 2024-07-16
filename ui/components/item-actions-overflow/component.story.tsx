// Decorators
import { inCenter } from '../_decorators/inCenter'

// Components
import { ItemActionsOverflow as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Item / Actions - Overflow',
  component: Component,
  decorators: [inCenter]
}
export default meta

// Stories
export const ActionsOverflow: StoryObj<typeof Component> = {
  render: () => {
    return <Component id="abc123" />
  }
}
