// Components
import { ActionContainer as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Action - Complete',
  component: Component
}
export default meta

// Stories
export const ActionComplete: StoryObj<typeof Component> = {
  render: () => {
    return <Component actionUnSave={() => console.log('action unsave')} />
  },
  args: {}
}
