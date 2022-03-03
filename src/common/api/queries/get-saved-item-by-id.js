import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'
import { FRAGMENT_SAVED_ITEM } from 'common/api/fragments/fragment.savedItem'
import { FRAGMENT_ITEM } from 'common/api/fragments/fragment.item'

const getSavedItemByIdQuery = gql`
  query GetSavedItemById($itemId: ID!) {
    user {
      savedItemById(id: $itemId) {
        ...SavedItemDetails
        annotations {
          highlights {
            id
            quote
            patch
            version
            _createdAt
            _updatedAt
            note {
              text
              _createdAt
              _updatedAt
            }
          }
        }
        item {
          ...ItemDetails
        }
      }
    }
  }
  ${FRAGMENT_SAVED_ITEM}
  ${FRAGMENT_ITEM}
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
  const { item, ...savedData } = response?.data?.user?.savedItemById
  return { item, savedData }
}
