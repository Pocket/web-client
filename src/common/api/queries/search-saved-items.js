import { requestGQL } from 'common/utilities/request/request'
import { gql } from 'graphql-request'
import { FRAGMENT_ITEM } from 'common/api/fragments/fragment.item'

const searchSavedItemsQuery = gql`
  query SearchSavedItems($filter: SearchFilterInput, $sort: SavedItemsSort, $term: String!) {
    user {
      searchSavedItems(filter: $filter, sort: $sort, pagination: $pagination, term: $term) {
        edges {
          cursor
          node {
            savedItem {
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
