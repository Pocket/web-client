import { requestGQL } from 'common/utilities/request/request'
import { gql } from 'common/utilities/gql/gql'
import { FRAGMENT_ITEM_PREVIEW } from '../fragments/fragment.preview'
import { FRAGMENT_SAVED_ITEM } from 'common/api/fragments/fragment.savedItem'
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
            ...SavedItemDetails
            item {
              ... on Item {
                isArticle
                hasImage
                hasVideo
                timeToRead
                shareId: id
                itemId
                givenUrl
                preview {
                  ...ItemPreview
                }
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
  ${FRAGMENT_SAVED_ITEM}
  ${FRAGMENT_ITEM_PREVIEW}
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
    window.location = `${LOGIN_URL}?src=web-reauth&utm_source=${window.location.href}`
    throw new UnauthenticatedItemRequestError()
  }

  // In grahpQL there could be response errors, but the response could still
  // be semi-valid.  So we will just capture and move on
  if (response?.errors) {
    console.warn('SavedItemRequestErrors', response)
  }

  if (!responseData) throw new ItemRequestResponseMissingError(response?.errors)

  const { pageInfo, edges, totalCount } = responseData
  return { pageInfo, edges, totalCount }
}

class ItemRequestResponseMissingError extends Error {
  constructor(message) {
    super(message)
    this.name = 'GeneralItemRequestError'
    this.logMessage = message
  }
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
