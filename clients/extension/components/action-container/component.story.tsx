// Components
import upsertResponse from '@common/mock-data/graph-response/upsert-response.json'
import { ActionContainer as Component } from '.'

// Types
import type { ExtItem } from '../../types'
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const SavedOne: ExtItem = upsertResponse[0]?.data?.upsertSavedItem?.item
const SavedTwo: ExtItem = upsertResponse[1]?.data?.upsertSavedItem?.item
const SavedThree: ExtItem = upsertResponse[2]?.data?.upsertSavedItem?.item

const meta: Meta<typeof Component> = {
  title: 'Action - Complete',
  component: Component
}
export default meta

// Stories
export const ActionComplete: StoryObj<typeof Component> = {
  render: (args) => {
    return (
      <Component
        item={args.item}
        isOpen={true}
        errorMessage={args.errorMessage}
        actionUnSave={() => console.log('action unsave')}
        actionLogOut={() => console.log('action log out')}
      />
    )
  },
  argTypes: {
    item: {
      options: ['No Notes', 'Simple Notes', 'Complex Notes', 'Saving'],
      mapping: {
        'No Notes': SavedOne,
        'Simple Notes': SavedThree,
        'Complex Notes': SavedTwo,
        Saving: undefined
      },
      control: { type: 'select' }
    }
  },
  args: { item: SavedOne, errorMessage: undefined }
}
