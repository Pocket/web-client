import { requestGQL } from 'common/utilities/request/request'
import { gql } from 'common/utilities/gql/gql'

const shareCreateLinkMutation = gql`
  mutation ShareCreateLinkMutation($target: ValidUrl!, $context: ShareContextInput) {
    createShareLink(target: $target, context: $context) {
      slug
      shareUrl
      targetUrl
      createdAt
      context {
        note
        highlights {
          quote
        }
      }
    }
  }
`

export async function shareCreateLink(url, context) {
  return requestGQL({
    query: shareCreateLinkMutation,
    operationName: 'shareCreateLink',
    variables: {
      target: url,
      context
    }
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  return response?.data?.createShareLink
}
