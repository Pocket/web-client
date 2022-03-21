import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'
import { FRAGMENT_ITEM } from 'common/api/fragments/fragment.item'

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
      item {
        ...ItemDetails
      }
    }
  }
  ${FRAGMENT_ITEM}
`

export function itemUnFavorite(itemId) {
  return requestGQL({
    query: itemUnFavoriteQuery,
    variables: { itemId }
  })
    .then((response) => response?.data?.updateSavedItemUnFavorite)
    .catch((error) => console.error(error))
}
