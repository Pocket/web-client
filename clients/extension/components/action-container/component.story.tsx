// Components
import upsertResponse from '@common/mock-data/graph-response/upsert-response.json'
import { ActionContainer as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
// Storybook Meta
const SavedOne = upsertResponse[0]?.data?.upsertSavedItem?.item?.preview
const SavedTwo = upsertResponse[1]?.data?.upsertSavedItem?.item?.preview

const meta: Meta<typeof Component> = {
  title: 'Action - Complete',
  component: Component
}
export default meta

// Stories
export const ActionComplete: StoryObj<typeof Component> = {
  render: (args) => {
    const preview = args?.preview
    const tags = args.tags
    return (
      <Component
        preview={preview}
        isOpen={true}
        errorMessage={args.errorMessage}
        tags={tags}
        actionUnSave={() => console.log('action unsave')}
      />
    )
  },
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
  args: { preview: SavedOne, tags: ['peace', 'love', 'video games'], errorMessage: undefined }
}
