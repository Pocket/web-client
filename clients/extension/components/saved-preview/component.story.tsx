// Components
import upsertResponse from '@common/mock-data/graph-response/upsert-response.json'
import { SavedPreview as Component } from '.'

// Types
import type { ExtItem } from '@common/types'
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Saved - Preview ',
  component: Component
}
export default meta

// Stories
export const SavedPreview: StoryObj<typeof Component> = {
  render: () => {
    const item = upsertResponse?.data?.upsertSavedItem?.item as ExtItem
    return <Component item={item} />
  },
  args: {}
}
