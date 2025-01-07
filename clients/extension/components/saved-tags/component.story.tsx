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
  args: {
    tags: ['peace', 'love', 'video games']
  }
}
