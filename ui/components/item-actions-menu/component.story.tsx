// Decorators
import { inGrid } from '../_decorators/inGrid'

// Components
import { ItemActionsMenu as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Item / Actions - Menu',
  component: Component,
  decorators: [(Story) => inGrid(Story, 3)]
}
export default meta

// Stories
export const ActionsMenu: StoryObj<typeof Component> = {
  render: () => {
    return <Component />
  },
  args: {}
}
