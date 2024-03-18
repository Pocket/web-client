import { gql } from 'common/utilities/gql/gql'
import { requestGQL } from 'common/utilities/request/request'

const itemFavoriteQuery = gql`
  mutation ItemFavorite($itemId: ID!) {
    updateSavedItemFavorite(id: $itemId) {
      _updatedAt
      id
      status
      isFavorite
      favoritedAt
    }
  }
`

export function itemFavorite(itemId) {
  return requestGQL({
    query: itemFavoriteQuery,
    operationName: 'ItemFavorite',
    variables: { itemId }
  })
    .then((response) => response?.data?.updateSavedItemFavorite)
    .catch((error) => console.error(error))
}

export function bulkFavorite(items) {
  const arrayOfQueries = items.map(
    (itemId) => `
    favorite${itemId}: updateSavedItemFavorite(id: "${itemId}"){
      _updatedAt
      id
      status
      isFavorite
      favoritedAt
    }
  `
  )

  const query = `mutation ItemsBulkFavorite{
    ${arrayOfQueries.join('')}
  }`

  return requestGQL({ query })
    .then((response) => response?.data)
    .catch((error) => console.error(error))
}
