import { gql } from 'common/utilities/gql/gql'
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
    operationName: 'ItemUnFavorite',
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

  return requestGQL({
    query,
    operationName: 'ItemsBulkUnFavorite'
  })
    .then((response) => response?.data)
    .catch((error) => console.error(error))
}
