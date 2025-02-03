// Components
import { SavedTags as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Saved - Tags ',
  component: Component
}
export default meta

// Stories
export const SavedTags: StoryObj<typeof Component> = {
  render: (args) => {
    const tags = args.tags
    return <Component tags={tags} />
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    )
  ],
  args: {
    tags: [
      { id: '1', name: 'peace' },
      { id: '2', name: 'love' },
      { id: '3', name: 'video games' }
    ]
  }
}
