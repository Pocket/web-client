// Components
import upsertResponse from '@common/mock-data/graph-response/upsert-response.json'
import { NotesList as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

const NotesOne = upsertResponse[0]?.data?.upsertSavedItem?.item?.savedItem?.notes?.edges
const NotesTwo = upsertResponse[1]?.data?.upsertSavedItem?.item?.savedItem?.notes?.edges
const NotesThree = upsertResponse[2]?.data?.upsertSavedItem?.item?.savedItem?.notes?.edges

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Notes - List',
  component: Component
}
export default meta

// Stories
export const NotesList: StoryObj<typeof Component> = {
  render: (args) => {
    return <Component notes={args.notes} />
  },
  argTypes: {
    notes: {
      options: ['NotesOne', 'NotesTwo', 'NotesThree'],
      mapping: {
        NotesOne,
        NotesTwo,
        NotesThree
      },
      control: { type: 'select' }
    }
  },
  args: { notes: NotesOne }
}
