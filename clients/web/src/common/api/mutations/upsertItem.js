import { gql } from 'common/utilities/gql/gql'
import { requestGQL } from 'common/utilities/request/request'
import { FRAGMENT_SAVED_ITEM } from 'common/api/fragments/fragment.savedItem'
import { FRAGMENT_ITEM } from 'common/api/fragments/fragment.item'

const itemUpsertQuery = gql`
  mutation ItemUpsert($input: SavedItemUpsertInput!) {
    upsertSavedItem(input: $input) {
      ...SavedItemDetails
      item {
        ...ItemDetails
      }
    }
  }
  ${FRAGMENT_SAVED_ITEM}
  ${FRAGMENT_ITEM}
`
export function itemUpsert(url) {
  return requestGQL({
    query: itemUpsertQuery,
    operationName: 'ItemUpsert',
    variables: { input: { url } }
  })
    .then((response) => response?.data?.upsertSavedItem)
    .catch((error) => console.error(error))
}
