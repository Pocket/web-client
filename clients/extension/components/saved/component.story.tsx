// Components
import upsertResponse from '@common/mock-data/graph-response/upsert-response.json'
import { SavedScreen as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const preview = upsertResponse?.data?.upsertSavedItem?.item?.preview
const meta: Meta<typeof Component> = {
  title: 'Saved - Complete ',
  component: Component
}
export default meta

// Stories
export const SavedComplete: StoryObj<typeof Component> = {
  render: (args) => {
    const preview = args?.preview

    return <Component preview={preview} />
  },
  argTypes: {
    preview: {
      options: ['Saved', 'Saving'],
      mapping: {
        Saved: preview,
        Saving: undefined
      },
      control: { type: 'select' }
    }
  },
  args: { preview }
}
