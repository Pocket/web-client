import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'

const itemUnFavoriteQuery = gql`
  mutation ItemUnFavorite($itemId: ID!) {
    updateSavedItemUnFavorite(id: $itemId) {
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

export function itemUnFavorite(itemId) {
  return requestGQL({
    query: itemUnFavoriteQuery,
    variables: { itemId }
  })
    .then((response) => response?.data?.updateSavedItemUnFavorite)
    .catch((error) => console.error(error))
}
