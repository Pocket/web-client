// Decorators
import { inCenter } from '../_decorators/inCenter'

// Components
import { ItemActionsSave as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Item — Actions / Save',
  component: Component,
  decorators: [inCenter]
}
export default meta

// Stories
export const Save: StoryObj<typeof Component> = {
  render: () => {
    return <Component id="abc123" />
  }
}
