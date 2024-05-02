import { requestGQL } from 'common/utilities/request/request'
import { gql } from 'common/utilities/gql/gql'

const shareAddContextMutation = gql`
  mutation ShareAddContext($slug: ID!, $context: ShareContextInput!) {
    addShareContext(slug: $slug, context: $context) {
      ... on ShareNotFound {
        message
      }
      ... on PocketShare {
        context {
          highlights {
            quote
          }
          note
        }
        slug
      }
    }
  }
`

export async function shareAddContext(slug, context) {
  return requestGQL({
    query: shareAddContextMutation,
    operationName: 'shareAddContext',
    variables: {
      slug,
      context
    }
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  return response?.data?.createShareLink
}
