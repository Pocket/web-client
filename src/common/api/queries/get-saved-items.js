import { requestGQL } from 'common/utilities/request/request'
import { gql } from 'common/utilities/gql/gql'
import { FRAGMENT_ITEM } from 'common/api/fragments/fragment.item'
import { itemFiltersFromGraph } from './get-saved-items.filters'
import { actionToCamelCase } from 'common/utilities/strings/strings'

import { LOGIN_URL } from 'common/constants'

const getSavedItemsQuery = gql`
  query GetSavedItems(
    $filter: SavedItemsFilter
    $sort: SavedItemsSort
    $pagination: PaginationInput
  ) {
    user {
      savedItems(filter: $filter, sort: $sort, pagination: $pagination) {
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
export async function getSavedItems({ actionType, sortOrder = 'DESC', tagNames, pagination }) {
  const requestDetails = itemFiltersFromGraph[actionType]
  if (!requestDetails) throw new MalformedItemRequestError()

  const { filter, sort } = requestDetails
  const variables = { filter: { ...filter, tagNames }, sort: { ...sort, sortOrder }, pagination }
  const operationName = actionToCamelCase(actionType)

  return requestGQL({ query: getSavedItemsQuery, operationName, variables })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  const responseData = response?.data?.user?.savedItems

  if (response?.errors && response?.errors?.[0]?.extensions?.status === 401) {
    window.location = `${LOGIN_URL}?src=web-client`
    throw new UnauthenticatedItemRequestError()
  }

  if (!responseData) throw new Error(response?.errors)

  const { pageInfo, edges, totalCount } = responseData
  return { pageInfo, edges, totalCount }
}

class MalformedItemRequestError extends Error {
  constructor(message) {
    super(message)
    this.name = 'MalformedItemRequestError'
  }
}

class UnauthenticatedItemRequestError extends Error {
  constructor(message) {
    super(message)
    this.name = 'UnauthenticatedItemRequestError'
  }
}
