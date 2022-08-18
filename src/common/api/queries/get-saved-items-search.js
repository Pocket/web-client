import { requestGQL } from 'common/utilities/request/request'
import { gql } from 'graphql-request'
import { FRAGMENT_ITEM } from 'common/api/fragments/fragment.item'
import { itemFiltersFromGraph } from './get-saved-items.filters'

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
export async function getSavedItemsSearch({
  actionType,
  sortOrder = 'DESC',
  pagination,
  searchTerm: term
}) {
  const requestDetails = itemFiltersFromGraph[actionType]
  if (!requestDetails) throw new MalformedItemSearchError()

  const { filter, sort } = requestDetails
  const variables = { filter: { ...filter }, sort: { ...sort, sortOrder }, term, pagination }

  return requestGQL({
    query: searchSavedItemsQuery,
    operationName: actionType,
    variables
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  const responseData = response?.data?.user?.searchSavedItems
  const { pageInfo, edges, totalCount } = responseData
  return { pageInfo, edges, totalCount }
}

class MalformedItemSearchError extends Error {
  constructor(message) {
    super(message)
    this.name = 'MalformedItemSearchError'
  }
}
