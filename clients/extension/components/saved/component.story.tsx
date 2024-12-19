// Components
import upsertResponse from '@common/mock-data/graph-response/upsert-response.json'
import { SavedScreen as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Saved - Complete ',
  component: Component
}
export default meta

// Stories
export const SavedComplete: StoryObj<typeof Component> = {
  render: () => {
    const item = upsertResponse?.data?.upsertSavedItem?.item

    return <Component item={item} actionUnSave={() => null} />
  },
  args: {}
}
