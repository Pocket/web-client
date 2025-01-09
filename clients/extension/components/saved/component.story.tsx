// Components
import upsertResponse from '@common/mock-data/graph-response/upsert-response.json'
import { SavedScreen as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

const SavedOne = upsertResponse[0]?.data?.upsertSavedItem?.item?.preview
const SavedTwo = upsertResponse[1]?.data?.upsertSavedItem?.item?.preview

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
