import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'

const itemUpsertQuery = gql`
  mutation ItemUpsert($input: SavedItemUpsertInput!) {
    upsertSavedItem(input: $input) {
      id
      status
    }
  }
`
export function itemUpsert(url) {
  return requestGQL({
    query: itemUpsertQuery,
    variables: { input: { url } }
  })
    .then((response) => response?.data?.upsertSavedItem)
    .catch((error) => console.error(error))
}
