import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'

const itemTagsReplaceQuery = gql`
  mutation ItemTagsReplace($input: [SavedItemTagsInput!]!) {
    replaceSavedItemTags(input: $input) {
      tags {
        name
        id
      }
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
      _updatedAt
      id
    }
  }
`

const itemTagDeleteQuery = gql`
  mutation ItemTagsDelete($deleteInput: [DeleteSavedItemTagsInput!]!) {
    deleteSavedItemTags(input: $deleteInput) {
      savedItemId
      tagId
    }
  }
`

const itemTagAddQuery = gql`
  mutation ItemTagsCreate($addInput: [TagCreateInput!]!) {
    createTags(input: $addInput) {
      _updatedAt
      savedItems {
        edges {
          node {
            itemId: id
            tags {
              name
              id
            }
          }
        }
      }
    }
  }
`

const itemTagUpdateQuery = gql`
  mutation ItemTagsUpdate(
    $addInput: [TagCreateInput!]!
    $deleteInput: [DeleteSavedItemTagsInput!]!
  ) {
    createTags(input: $addInput) {
      _updatedAt
      savedItems {
        edges {
          node {
            itemId: id
            tags {
              name
              id
            }
          }
        }
      }
    }
    deleteSavedItemTags(input: $deleteInput) {
      savedItemId
      tagId
    }
  }
`

export function itemTagUpdate(itemIds, idsToRemove, tagsToAdd) {
  const query =
    idsToRemove.length && tagsToAdd.length
      ? itemTagUpdateQuery
      : tagsToAdd.length
      ? itemTagAddQuery
      : itemTagDeleteQuery

  const addInput = itemIds.map((savedItemId) =>
    tagsToAdd.map((name) => ({
      name,
      savedItemId
    }))
  )

  const deleteInput = itemIds.map((savedItemId) => ({ savedItemId, tagIds: idsToRemove }))

  return requestGQL({
    query,
    variables: { addInput: addInput.flat(), deleteInput }
  })
    .then((response) => response?.data)
    .catch((error) => console.error(error))
}

export function itemTagsReplace(itemIds, tags) {
  const input = itemIds.map((id) => ({ savedItemId: id, tags }))

  return requestGQL({
    query: itemTagsReplaceQuery,
    variables: { input }
  })
    .then((response) => response?.data?.replaceSavedItemTags)
    .catch((error) => console.error(error))
}

export function itemTagsRemove(itemIds) {
  return requestGQL({
    query: itemTagsRemoveQuery,
    variables: { savedItemId: itemIds[0] }
  })
    .then((response) => response?.data?.updateSavedItemRemoveTags)
    .then((node) => [node])
    .catch((error) => console.error(error))
}
