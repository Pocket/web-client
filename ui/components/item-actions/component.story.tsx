// Decorators
import { inCard } from '../_decorators/inCard'
import { inCenter } from '../_decorators/inCenter'

// Components
import { ItemActions as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Item - Actions / Complete',
  component: Component,
  decorators: [inCenter]
}
export default meta

// Stories
export const Complete: StoryObj<typeof Component> = {
  decorators: [inCard],
  render: () => {
    return (
      <article
        style={{
          maxWidth: '300px',
          minHeight: '150px',
          boxShadow: 'var(--shadow-high)',
          padding: '1rem',
          borderRadius: '8px',
          position: 'relative'
        }}>
        <br />
        <br />
        <br />
        <br />
        <footer>
          <Component id="abc123" />
        </footer>
      </article>
    )
  },
  args: {}
}
