import { requestGQL } from 'common/utilities/request/request'
import { gql } from 'graphql-request'
import { FRAGMENT_ITEM } from 'common/api/fragments/fragment.item'
import { GET_ITEMS_TAGS } from 'actions'
import { GET_ITEMS_TAGS_UNREAD } from 'actions'
import { GET_ITEMS_TAGS_ARCHIVED } from 'actions'
import { GET_ITEMS_TAGS_FAVORITES } from 'actions'

const getSavedItemsTaggedQuery = gql`
  query SavedItemsTagged(
    $filter: SavedItemsFilter
    $pagination: PaginationInput
    $sort: SavedItemsSort
  ) {
    user {
      savedItems(filter: $filter, pagination: $pagination, sort: $sort) {
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
/** FILTERS
 --------------------------------------------------------------- */
const UNREAD = { statuses: ['UNREAD'] }
const ARCHIVED = { statuses: ['ARCHIVED'] }
const ALL = { statuses: ['UNREAD', 'ARCHIVED'] }
const FAVORITED = { isFavorite: true }
const SORT_DEFAULT = { sortBy: 'CREATED_AT' }

// prettier-ignore
const itemFiltersFromGraph = {
  [GET_ITEMS_TAGS]: { filter: { ...ALL }, sort: SORT_DEFAULT },
  [GET_ITEMS_TAGS_UNREAD]: { filter: { ...UNREAD }, sort: SORT_DEFAULT },
  [GET_ITEMS_TAGS_ARCHIVED]: { filter: { ...ARCHIVED }, sort: SORT_DEFAULT },
  [GET_ITEMS_TAGS_FAVORITES]: { filter: { ...FAVORITED, ...ALL }, sort: SORT_DEFAULT }
}

export async function getSavedItemsTagged({
  tagNames,
  actionType,
  sortOrder = 'DESC',
  pagination
}) {
  const requestDetails = itemFiltersFromGraph[actionType]
  if (!requestDetails) throw new MalformedTaggedItemRqeuestError()

  const { filter, sort } = requestDetails
  const variables = { filter: { ...filter, tagNames }, sort: { ...sort, sortOrder }, pagination }

  return requestGQL({
    query: getSavedItemsTaggedQuery,
    operationName: actionType,
    variables
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  const responseData = response?.data?.user?.savedItems

  if (!responseData) throw new Error(response?.errors)

  const { pageInfo, edges, totalCount } = responseData
  return { pageInfo, edges, totalCount }
}

class MalformedTaggedItemRqeuestError extends Error {
  constructor(message) {
    super(message)
    this.name = 'MalformedTaggedItemRqeuestError'
  }
}
