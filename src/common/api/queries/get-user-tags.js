import { requestGQL } from 'common/utilities/request/request'
import { gql } from 'graphql-request'

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

export async function getUserTags() {
  return requestGQL({
    query: getUsersTagsQuery,
    operationName: "GetUsersTags",
    variables: {
      pagination: {
        first: 1000000
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

  const tagsWithIds = edges.reduce((previous, current) => {
    const id = current?.node?.id
    const name = current?.node?.name
    return { ...previous, [name]: id }
  }, {})

  const tagNames = Object.keys(tagsWithIds)

  return { tagsWithIds, tagNames, totalCount }
}
