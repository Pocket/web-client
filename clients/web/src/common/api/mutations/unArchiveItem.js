import { gql } from 'common/utilities/gql/gql'
import { requestGQL } from 'common/utilities/request/request'

const itemUnArchiveQuery = gql`
  mutation ItemUnArchive($itemId: ID!) {
    updateSavedItemUnArchive(id: $itemId) {
      _updatedAt
      id
      status
      isArchived
      archivedAt
    }
  }
`

// ?? NOTE:  THis is not functionality we currently use in web-client
// ?? the current (3/2022) expectations is that re-adding move the item
// ?? to the top of the users list.  This is achieved with the upsert mutation
export function itemUnArchive(itemId) {
  return requestGQL({
    query: itemUnArchiveQuery,
    operationName: 'ItemUnArchive',
    variables: { itemId }
  })
    .then((response) => response?.data?.updateSavedItemUnArchive)
    .catch((error) => console.error(error))
}

export function bulkUnArchive(items) {
  const arrayOfQueries = items.map(
    (itemId) => `
    unarchive${itemId}: updateSavedItemUnArchive(id: "${itemId}"){
      _updatedAt
      id
      status
      isArchived
      archivedAt
    }
  `
  )

  const query = `mutation ItemsBulkUnArchive{
    ${arrayOfQueries.join('')}
  }`

  return requestGQL({
    query,
    operationName: 'ItemsBulkUnArchive'
  })
    .then((response) => response?.data)
    .catch((error) => console.error(error))
}
