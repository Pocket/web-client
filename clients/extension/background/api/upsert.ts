import { extensionRequest } from '../../utilities/request'
import { verifySession } from '../auth'

import { FRAGMENT_ITEM_PREVIEW } from './fragments/preview'
import { FRAGMENT_SAVED_ITEM } from './fragments/saved-item'
import type { ExtSave, ExtItemResponse, ExtItem } from '../../types'

interface upsertSavedItem {
  item: ExtItemResponse
}

const gql = String.raw
const query = gql`
  mutation ItemUpsert($input: SavedItemUpsertInput!) {
    upsertSavedItem(input: $input) {
      item {
        ... on Item {
          preview {
            ...ItemPreview
          }
          savedItem {
            ...ItemSaved
          }
        }
      }
    }
  }

  ${FRAGMENT_SAVED_ITEM}
  ${FRAGMENT_ITEM_PREVIEW}
`

export async function upsertItem(saveData: ExtSave) {
  const { url } = saveData

  // We need a token to save. This will create a session if need be
  // be requesting a new bearer if the current one is expired
  const token = await verifySession()

  // Set up the variables we need for this request
  const data = { variables: { input: { url } }, query }

  // Make the request and return it
  const response = await extensionRequest<{ upsertSavedItem: upsertSavedItem }>(data, token)

  const item = response?.upsertSavedItem?.item

  // We have got a pending item back from the server ... we should handle it
  if (item && 'status' in item) throw new Error(`Item save is pending: ${item?.status}`)

  const validItem = item as ExtItem
  // If we don't have a preview, something has gone awry and we should be in
  // in the land of sending an error already ... but if we're not let's throw
  if (!validItem?.preview) throw new Error('There was an error while saving')

  return { item: validItem }
}
