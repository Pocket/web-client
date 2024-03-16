import { gql } from 'common/utilities/gql/gql'
import { requestGQL } from 'common/utilities/request/request'

const itemArchiveQuery = gql`
  mutation ItemArchive($itemId: ID!) {
    updateSavedItemArchive(id: $itemId) {
      _updatedAt
      id
      status
      isArchived
      archivedAt
    }
  }
`

export function itemArchive(itemId) {
  return requestGQL({
    query: itemArchiveQuery,
    operationName: 'ItemArchive',
    variables: { itemId }
  })
    .then((response) => response?.data?.updateSavedItemArchive)
    .catch((error) => console.error(error))
}

export function bulkArchive(items) {
  const arrayOfQueries = items.map(
    (itemId) => `
    archive${itemId}: updateSavedItemArchive(id: "${itemId}"){
      _updatedAt
      id
      status
      isArchived
      archivedAt
    }
  `
  )

  const query = `mutation ItemsBulkArchive{
    ${arrayOfQueries.join('')}
  }`

  return requestGQL({ query })
    .then((response) => response?.data)
    .catch((error) => console.error(error))
}
