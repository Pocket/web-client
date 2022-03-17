import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'
import { FRAGMENT_ITEM } from 'common/api/fragments/fragment.item'

const itemArchiveQuery = gql`
  mutation ItemArchive($itemId: ID!) {
    updateSavedItemArchive(id: $itemId) {
      _createdAt
      _updatedAt
      id
      status
      isFavorite
      favoritedAt
      isArchived
      archivedAt
      tags {
        id
        name
      }
      item {
        ...ItemDetails
      }
    }
  }
  ${FRAGMENT_ITEM}
`

export function itemArchive(itemId) {
  return requestGQL({
    query: itemArchiveQuery,
    variables: { itemId }
  })
    .then((response) => response?.data?.updateSavedItemArchive)
    .catch((error) => console.error(error))
}
