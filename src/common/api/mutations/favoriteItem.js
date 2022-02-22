import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'

const itemFavoriteQuery = gql`
  mutation ItemFavorite($itemId: ID!) {
    updateSavedItemFavorite(id: $itemId) {
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

export function itemFavorite(itemId) {
  return requestGQL({
    query: itemFavoriteQuery,
    variables: { itemId }
  })
    .then((response) => response?.data?.updateSavedItemFavorite)
    .catch((error) => console.error(error))
}
