import { requestGQL } from 'common/utilities/request/request'
import { gql } from 'graphql-request'
import { FRAGMENT_ITEM } from 'common/api/fragments/fragment.item'

import { SEARCH_SAVED_ITEMS } from 'actions'
import { SEARCH_SAVED_ITEMS_UNREAD } from 'actions'
import { SEARCH_SAVED_ITEMS_ARCHIVED } from 'actions'
import { SEARCH_SAVED_ITEMS_FAVORITES } from 'actions'

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

/** FILTERS 
 --------------------------------------------------------------- */
const UNREAD = { status: 'UNREAD' }
const ARCHIVED = { status: 'ARCHIVED' }
const ALL = {} //Search doesn't do `statuses` so omission is `all`
const FAVORITED = { isFavorite: true }
const SORT_DEFAULT = { sortBy: 'CREATED_AT' }

// prettier-ignore
const itemFiltersFromGraph = {
  [SEARCH_SAVED_ITEMS]: { filter: { ...ALL }, sort: SORT_DEFAULT },
  [SEARCH_SAVED_ITEMS_UNREAD]: { filter: { ...UNREAD }, sort: SORT_DEFAULT },
  [SEARCH_SAVED_ITEMS_ARCHIVED]: { filter: { ...ARCHIVED }, sort: SORT_DEFAULT },
  [SEARCH_SAVED_ITEMS_FAVORITES]: { filter: { ...FAVORITED, ...UNREAD }, sort: SORT_DEFAULT }
}

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
