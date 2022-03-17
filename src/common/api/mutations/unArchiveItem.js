import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'
import { FRAGMENT_ITEM } from 'common/api/fragments/fragment.item'

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
      item {
        ...ItemDetails
      }
    }
  }
  ${FRAGMENT_ITEM}
`

// ?? NOTE:  THis is not functionality we currently use in web-client
// ?? the current (3/2022) expectations is that re-adding move the item
// ?? to the top of the users list.  This is achieved with the upsert mutation
export function itemUnArchive(itemId) {
  return requestGQL({
    query: itemUnArchiveQuery,
    variables: { itemId }
  })
    .then((response) => response?.data?.updateSavedItemUnArchive)
    .catch((error) => console.error(error))
}
