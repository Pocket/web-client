// Decorators
import { inCard } from '../_decorators/inCard'
import { inGrid } from '../_decorators/inGrid'

// Components
import { ItemActions as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Item / Actions',
  component: Component,
  decorators: [(Story) => inGrid(Story, 2)]
}
export default meta

// Stories
export const Actions: StoryObj<typeof Component> = {
  decorators: [inCard],
  render: () => {
    return (
      <div
        style={{
          minHeight: '300px',
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '0.5rem'
        }}>
        <Component />
      </div>
    )
  },
  args: {}
}
