import { requestGQL } from 'common/utilities/request/request'
import { gql } from 'graphql-request'
import { processAllList } from 'common/api/derivers/shared-lists'

const getShareableListsQuery = gql`
  query GetShareableLists {
    shareableLists {
      title
      description
      status
      slug
      createdAt
      updatedAt
      moderationStatus
      externalId
      listItems {
        imageUrl
        externalId
      }
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
  const processedData = processAllList(responseData)

  return processedData  
}
