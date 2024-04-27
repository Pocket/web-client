import { gql } from 'common/utilities/gql/gql'
import { requestGQL } from 'common/utilities/request/request'
import { FRAGMENT_ITEM } from 'common/api/fragments/fragment.item'

const getSharedItemByIdQuery = gql`
  query GetSharedItemById($slug: ID!) {
    shareSlug(slug: $slug) {
      ... on PocketShare {
        targetUrl
        preview {
          ... on PocketMetadata {
            image {
              url
            }
            title
            url
            excerpt
          }
          item {
            ...ItemDetails
          }
        }
        slug
        shareUrl
        createdAt
        context {
          note
          highlights {
            quote
          }
        }
      }
      ... on ShareNotFound {
        errorMessage: message
      }
    }
  }
  ${FRAGMENT_ITEM}
`

export async function getSharedItemByItemId(slug) {
  return requestGQL({
    query: getSharedItemByIdQuery,
    operationName: 'GetSharedItem',
    variables: { slug: slug }
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  return response
}
