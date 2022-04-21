import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'

const itemUnFavoriteQuery = gql`
  mutation ItemUnFavorite($itemId: ID!) {
    updateSavedItemUnFavorite(id: $itemId) {
      _updatedAt
      id
      status
      isFavorite
      favoritedAt
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

export function bulkUnFavorite(items) {
  const arrayOfQueries = items.map(
    (itemId) => `
    unfavorite${itemId}: updateSavedItemUnFavorite(id: "${itemId}"){
      _updatedAt
      id
      status
      isFavorite
      favoritedAt
    }
  `
  )

  const query = `mutation ItemsBulkUnFavorite{
    ${arrayOfQueries.join('')}
  }`

  return requestGQL({ query })
    .then((response) => response?.data)
    .catch((error) => console.error(error))
}
