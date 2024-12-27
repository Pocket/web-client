// Components
import upsertResponse from '@common/mock-data/graph-response/upsert-response.json'
import { ActionContainer as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const item = upsertResponse?.data?.upsertSavedItem?.item
const meta: Meta<typeof Component> = {
  title: 'Action - Complete',
  component: Component
}
export default meta

// Stories
export const ActionComplete: StoryObj<typeof Component> = {
  render: (args) => {
    return (
      <Component item={args.item} actionUnSave={() => console.log('action unsave')} isOpen={true} />
    )
  },
  argTypes: {
    item: {
      options: ['Saved', 'Saving'],
      mapping: {
        Saved: item,
        Saving: undefined
      },
      control: { type: 'select' }
    }
  },
  args: { item }
}
