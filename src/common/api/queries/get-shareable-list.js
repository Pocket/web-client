import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'

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
    .then((response) => response?.data?.shareableList)
    .catch((error) => console.error(error))
}
