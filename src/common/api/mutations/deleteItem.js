import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'

const itemDeleteQuery = gql`
  mutation ItemDelete($itemId: ID!) {
    deleteSavedItem(id: $itemId)
  }
`

export function itemDelete(itemId) {
  return requestGQL({
    query: itemDeleteQuery,
    variables: { itemId }
  })
    .then((response) => response.data.deleteSavedItem)
    .catch((error) => console.error(error))
}
