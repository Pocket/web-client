import { requestGQL } from 'common/utilities/request/request'
import { gql } from 'graphql-request'
import { FRAGMENT_ITEM } from 'common/api/fragments/fragment.item'
import { itemFiltersFromGraph } from './get-saved-items.filters'
import { actionToCamelCase } from 'common/utilities/strings/strings'

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
            url
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

export async function getSavedItemsTagged({
  tagNames,
  actionType,
  sortOrder = 'DESC',
  pagination
}) {
  const requestDetails = itemFiltersFromGraph[actionType]
  if (!requestDetails) throw new MalformedTaggedItemRequestError()

  const { filter, sort } = requestDetails
  const variables = { filter: { ...filter, tagNames }, sort: { ...sort, sortOrder }, pagination }
  const operationName = actionToCamelCase(actionType)

  return requestGQL({ query: getSavedItemsTaggedQuery, operationName, variables })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  const responseData = response?.data?.user?.savedItems

  if (!responseData) throw new Error(response?.errors)

  const { pageInfo, edges, totalCount } = responseData
  return { pageInfo, edges, totalCount }
}

class MalformedTaggedItemRequestError extends Error {
  constructor(message) {
    super(message)
    this.name = 'MalformedTaggedItemRequestError'
  }
}
