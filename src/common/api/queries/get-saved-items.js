import { requestGQL } from 'common/utilities/request/request'
import { gql } from 'graphql-request'
import { FRAGMENT_ITEM } from 'common/api/fragments/fragment.item'

const getSavedItemsQuery = gql`
  query GetSavedItems($filter: SavedItemsFilter, $pagination: PaginationInput) {
    user {
      savedItems(filter: $filter, pagination: $pagination) {
        edges {
          cursor
          node {
            _createdAt
            _updatedAt
            id
            status
            isFavorite
            favoritedAt
            isArchived
            archivedAt
            tags {
              id
              name
            }
            item {
              ...ItemDetails
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        totalCount
      }
    }
  }
  ${FRAGMENT_ITEM}
`

export async function getSavedItems({ filter, sort, pagination }) {
  return requestGQL({
    query: getSavedItemsQuery,
    variables: {
      filter,
      sort,
      pagination
    }
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  const responseData = response?.data?.user?.savedItems
  const { pageInfo, edges, totalCount } = responseData
  return { pageInfo, edges, totalCount }
}
