import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'
import { processIndividualList } from 'common/api/derivers/shared-lists'

const getShareableListQuery = gql`
  query ShareableList($externalId: ID!) {
    shareableList(externalId: $externalId) {
      title
      description
      externalId
      slug
      status
      moderationStatus
      createdAt
      updatedAt
      listItems {
        url
        title
        imageUrl
        externalId
        publisher
        excerpt
        authors
        sortOrder
        createdAt
        updatedAt
      }
    }
  }
`
export function getShareableList(externalId) {
  return requestGQL({
    query: getShareableListQuery,
    operationName: 'getShareableList',
    variables: { externalId }
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  const responseData = response?.data?.shareableList
  const processedData = processIndividualList(responseData, 'pocket_list')

  return processedData
}
