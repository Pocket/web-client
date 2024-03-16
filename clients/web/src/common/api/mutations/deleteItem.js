import { gql } from 'common/utilities/gql/gql'
import { requestGQL } from 'common/utilities/request/request'

const itemDeleteQuery = gql`
  mutation ItemDelete($itemId: ID!) {
    deleteSavedItem(id: $itemId)
  }
`

export function itemDelete(itemId) {
  return requestGQL({
    query: itemDeleteQuery,
    operationName: 'ItemDelete',
    variables: { itemId }
  })
    .then((response) => response.data.deleteSavedItem)
    .catch((error) => console.error(error))
}

export function bulkDelete(items) {
  const arrayOfQueries = items.map(
    (itemId) => `
    delete${itemId}: deleteSavedItem(id: "${itemId}")
  `
  )

  const query = `mutation ItemsBulkDelete{
    ${arrayOfQueries.join('')}
  }`

  return requestGQL({ query })
    .then((response) => response?.data)
    .catch((error) => console.error(error))
}
