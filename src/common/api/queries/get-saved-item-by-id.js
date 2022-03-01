import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'
import { FRAGMENT_SAVED_ITEM } from 'common/api/fragments/fragment.savedItem'
import { FRAGMENT_ANNOTATIONS } from 'common/api/fragments/fragment.savedItem.annotations'
import { FRAGMENT_ITEM } from 'common/api/fragments/fragment.item'
import { FRAGMENT_MARTICLE } from 'common/api/fragments/fragment.item.marticle'

const getSavedItemByIdQuery = gql`
  query GetSavedItemById($itemId: ID!) {
    user {
      savedItemById(id: $itemId) {
        ...SavedItemDetails
        ...Annotations
        item {
          ...ItemDetails
          ...Marticle
        }
      }
    }
  }
  ${FRAGMENT_SAVED_ITEM}
  ${FRAGMENT_ANNOTATIONS}
  ${FRAGMENT_ITEM}
  ${FRAGMENT_MARTICLE}
`

export async function getSavedItemByItemId(itemId) {
  return requestGQL({
    query: getSavedItemByIdQuery,
    variables: { itemId }
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  const responseData = response?.data?.user?.savedItemById
  console.log({ response })
  return responseData
}
