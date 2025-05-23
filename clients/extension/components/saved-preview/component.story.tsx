// Components
import upsertResponse from '@common/mock-data/graph-response/upsert-response.json'
import { SavedPreview as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const SavedOne = upsertResponse[0]?.data?.upsertSavedItem?.item?.preview
const SavedTwo = upsertResponse[1]?.data?.upsertSavedItem?.item?.preview

const meta: Meta<typeof Component> = {
  title: 'Saved - Preview ',
  component: Component
}
export default meta

// Stories
export const SavedPreview: StoryObj<typeof Component> = {
  render: (args) => {
    const preview = args?.preview
    return <Component preview={preview} />
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    )
  ],
  argTypes: {
    preview: {
      options: ['SavedOne', 'SavedTwo', 'Saving'],
      mapping: {
        SavedOne,
        SavedTwo,
        Saving: undefined
      },
      control: { type: 'select' }
    }
  },
  args: { preview: SavedOne }
}
