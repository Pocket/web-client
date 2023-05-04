import { requestGQL } from 'common/utilities/request/request'
import { gql } from 'common/utilities/gql/gql'

const getTagSuggestionByIdQuery = gql`
  query SavedItemById($savedItemByIdId: ID!) {
    user {
      savedItemById(id: $savedItemByIdId) {
        suggestedTags {
          name
          id
        }
      }
    }
  }
`

export async function getTagSuggestionById(itemId) {
  return requestGQL({
    query: getTagSuggestionByIdQuery,
    operationName: 'SavedItemById',
    variables: {
      savedItemByIdId: itemId
    }
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  const responseData = response?.data?.user?.savedItemById

  if (!responseData) throw new Error(response?.errors)

  const { suggestedTags } = responseData
  return suggestedTags
}
