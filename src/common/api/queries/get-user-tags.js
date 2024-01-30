import { requestGQL } from 'common/utilities/request/request'
import { gql } from 'common/utilities/gql/gql'

const getUsersTagsQuery = gql`
  query GetUsersTags($pagination: PaginationInput) {
    user {
      tags(pagination: $pagination) {
        edges {
          node {
            name
            id
          }
        }
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`

export async function getUserTags(customPagination) {
  return requestGQL({
    query: getUsersTagsQuery,
    operationName: 'GetUsersTags',
    variables: {
      pagination: {
        first: 100, // 100 is the max
        ...customPagination
      }
    }
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  const responseData = response?.data?.user?.tags
  if (!responseData) throw new Error(response?.errors)

  const { edges, totalCount, pageInfo } = responseData || {}
  const tagNames = edges.map(({ node }) => node.name)

  return { tagNames, totalCount, pageInfo }
}
