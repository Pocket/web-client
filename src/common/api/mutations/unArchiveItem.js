import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'

const itemUnArchiveQuery = gql`
  mutation ItemUnArchive($itemId: ID!) {
    updateSavedItemUnArchive(id: $itemId) {
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
    }
  }
`

export function itemUnArchive(itemId) {
  return requestGQL({
    query: itemUnArchiveQuery,
    variables: { itemId }
  })
    .then((response) => response?.data?.updateSavedItemUnArchive)
    .catch((error) => console.error(error))
}
