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
          ... on Item {
            article
            authors {
              id
              name
              url
            }
            datePublished
          }
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
  const responseData = response?.data?.user?.savedItemById

  if (!responseData) throw new Error(response?.errors)

  const { item, ...savedData } = responseData
  return { item, savedData }
}
