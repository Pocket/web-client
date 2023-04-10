import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'
import { arrayToObject } from 'common/utilities/object-array/object-array'
import { processPublicList } from 'common/api/derivers/shared-lists'

const getShareableListPublicQuery = gql`
  query ShareableListPublic($slug: String!, $externalId: ID!) {
    shareableListPublic(slug: $slug, externalId: $externalId) {
      updatedAt
      title
      status
      slug
      moderationStatus
      externalId
      description
      createdAt
      listItems {
        createdAt
        excerpt
        externalId
        imageUrl
        itemId
        publisher
        sortOrder
        title
        updatedAt
        url
      }
      user {
        username
        avatarUrl
      }
    }
  }
`
export function getShareableListPublic({ listId, slug }) {
  return requestGQL({
    query: getShareableListPublicQuery,
    operationName: 'getShareableListPublic',
    variables: { slug, externalId: listId }
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  if (response?.errors) return response

  const responseData = response?.data?.shareableListPublic
  const processedData = processPublicList(responseData, 'pocket_public_list')

  return processedData
}
