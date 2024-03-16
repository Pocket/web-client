import { gql } from 'common/utilities/gql/gql'
import { requestGQL } from 'common/utilities/request/request'
import { FRAGMENT_SAVED_ITEM } from 'common/api/fragments/fragment.savedItem'
import { FRAGMENT_ITEM } from 'common/api/fragments/fragment.item'

const itemUnDeleteQuery = gql`
  mutation ItemUnDelete($itemId: ID!) {
    updateSavedItemUnDelete(id: $itemId) {
      ...SavedItemDetails
      item {
        ...ItemDetails
      }
    }
  }

  ${FRAGMENT_SAVED_ITEM}
  ${FRAGMENT_ITEM}
`

export function itemUnDelete(itemId) {
  return requestGQL({
    query: itemUnDeleteQuery,
    operationName: 'ItemUnDelete',
    variables: { itemId }
  })
    .then((response) => response.data.updateSavedItemUnDelete)
    .catch((error) => console.error(error))
}
