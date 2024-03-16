import { gql } from 'common/utilities/gql/gql'
import { requestGQL } from 'common/utilities/request/request'

const itemsTagsAddQuery = gql`
  mutation ItemsTagsAdd($input: [SavedItemTagsInput!]!) {
    createSavedItemTags(input: $input) {
      status
      _updatedAt
      id
      tags {
        name
        id
      }
    }
  }
`

const itemTagsReplaceQuery = gql`
  mutation ItemTagsReplace($input: [SavedItemTagsInput!]!) {
    replaceSavedItemTags(input: $input) {
      tags {
        name
        id
      }
      status
      _updatedAt
      id
    }
  }
`

const itemTagsRemoveQuery = gql`
  mutation ItemTagsRemove($savedItemId: ID) {
    updateSavedItemRemoveTags(savedItemId: $savedItemId) {
      tags {
        name
        id
      }
      status
      _updatedAt
      id
    }
  }
`

export function itemTagsReplace(itemIds, tags) {
  const input = itemIds.map((id) => ({ savedItemId: id, tags }))

  return requestGQL({
    query: itemTagsReplaceQuery,
    operationName: 'ItemTagsReplace',
    variables: { input }
  })
    .then((response) => response?.data?.replaceSavedItemTags)
    .catch((error) => console.error(error))
}

export function itemTagsRemove(itemIds) {
  return requestGQL({
    query: itemTagsRemoveQuery,
    operationName: 'ItemTagsRemove',
    variables: { savedItemId: itemIds[0] }
  })
    .then((response) => response?.data?.updateSavedItemRemoveTags)
    .then((node) => [node])
    .catch((error) => console.error(error))
}

export function bulkTagging(itemIds, tags) {
  const input = itemIds.map((itemId) => ({ savedItemId: itemId, tags }))
  return requestGQL({
    query: itemsTagsAddQuery,
    operationName: 'ItemsTagsAdd',
    variables: { input }
  })
    .then((response) => response?.data?.createSavedItemTags)
    .then((nodes) => nodes)
    .catch((error) => console.error(error))
}
