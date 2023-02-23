import { requestGQL } from 'common/utilities/request/request'
import { gql } from 'graphql-request'

const getShareableListsQuery = gql`
  query GetShareableLists {
    shareableLists {
      title
      description
      status
      slug
      createdAt
      moderationStatus
    }
  }
`
export async function getShareableLists() {
  return requestGQL({
    query: getShareableListsQuery,
    operationName: 'GetShareableLists'
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  const responseData = response?.data?.shareableLists
  return responseData
}
