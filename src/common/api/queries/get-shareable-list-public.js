import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'

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
    }
  }
`
export function getShareableListPublic({ externalId, slug }) {
  return requestGQL({
    query: getShareableListPublicQuery,
    operationName: 'getShareableListPublic',
    variables: { slug, externalId }
  })
    .then((response) => response?.data?.shareableListPublic)
    .catch((error) => console.error(error))
}
