import { requestGQL } from 'common/utilities/request/request'
import { gql } from 'graphql-request'
import { FRAGMENT_ITEM } from 'common/api/fragments/fragment.item'

const searchSavedItemsQuery = gql`
  query SearchSavedItems(
    $term: String!
    $sort: SearchSortInput
    $pagination: PaginationInput
    $filter: SearchFilterInput
  ) {
    user {
      searchSavedItems(term: $term, sort: $sort, pagination: $pagination, filter: $filter) {
        edges {
          node {
            savedItem {
              _createdAt
              _updatedAt
              archivedAt
              favoritedAt
              isArchived
              isFavorite
              status
              id
              item {
                ...ItemDetails
              }
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

/**
 * searchSavedItems({filter, sort, pagination, term})
 * @param {*} filter - object
 * @param {*} sort - object
 * @param {*} pagination - object
 * @param {*} term - string
 * @returns
 */
export async function searchSavedItems(params) {
  const { filter, sort, pagination, searchTerm: term } = params
  return requestGQL({
    query: searchSavedItemsQuery,
    operationName: 'SearchSavedItems',
    variables: {
      filter,
      sort,
      pagination,
      term
    }
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  const responseData = response?.data?.user?.searchSavedItems
  const { pageInfo, edges, totalCount } = responseData
  return { pageInfo, edges, totalCount }
}
