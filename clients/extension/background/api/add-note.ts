import { extensionRequest } from '../../utilities/request'
import { verifySession } from '../auth'
import { FRAGMENT_ITEM_PREVIEW } from './fragments/preview'
import { FRAGMENT_SAVED_ITEM } from './fragments/saved-item'

import type { ExtItem, ExtSavedItem } from '../../types'
import type { CreateNoteMarkdownInput } from '@common/types/pocket'

interface ExtCreateNoteMarkdown {
  archived: boolean
  contentPreview: string
  createdAt: string
  deleted: boolean
  docMarkdown: boolean
  id: string
  source: string | undefined
  title: string | undefined
  updatedAt: string
  savedItem: ExtSavedItem
}

const gql = String.raw
const query = gql`
  mutation CreateNoteMarkdown($input: CreateNoteMarkdownInput!) {
    createNoteMarkdown(input: $input) {
      archived
      contentPreview
      createdAt
      deleted
      docMarkdown
      id
      source
      title
      updatedAt
      savedItem {
        ...ItemSaved
        item {
          ... on Item {
            preview {
              ...ItemPreview
            }
          }
        }
      }
    }
  }

  ${FRAGMENT_SAVED_ITEM}
  ${FRAGMENT_ITEM_PREVIEW}
`

export async function addNote(input: CreateNoteMarkdownInput) {
  // We need a token to save. This will create a session if need be
  // be requesting a new bearer if the current one is expired
  const token = await verifySession()

  // Set up the variables we need for this request
  const data = { variables: { input }, query }

  // Make the request and return it
  const response = await extensionRequest<{ createNoteMarkdown: ExtCreateNoteMarkdown }>(
    data,
    token
  )

  const responseItem = response?.createNoteMarkdown?.savedItem
  const { item, ...savedItem } = responseItem
  const preview = item?.preview

  // We have got a pending item back from the server ... we should handle it
  if (!item || !preview) throw new Error(`Trouble creating note`)

  const validItem: ExtItem = { savedItem, preview }
  return validItem
}
