import { requestGQL } from 'common/utilities/request/request'
import { gql } from 'graphql-request'
import { FRAGMENT_ITEM } from 'common/api/fragments/fragment.item'

import { GET_ITEMS_UNREAD } from 'actions'
import { GET_ITEMS_ARCHIVED } from 'actions'

import { GET_ITEMS_FAVORITES } from 'actions'
import { GET_ITEMS_FAVORITES_UNREAD } from 'actions'
import { GET_ITEMS_FAVORITES_ARCHIVED } from 'actions'

import { GET_ITEMS_ANNOTATED } from 'actions'
import { GET_ITEMS_ANNOTATED_UNREAD } from 'actions'
import { GET_ITEMS_ANNOTATED_ARCHIVED } from 'actions'
import { GET_ITEMS_ANNOTATED_FAVORITES } from 'actions'

import { GET_ITEMS_ARTICLES } from 'actions'
import { GET_ITEMS_ARTICLES_UNREAD } from 'actions'
import { GET_ITEMS_ARTICLES_ARCHIVED } from 'actions'
import { GET_ITEMS_ARTICLES_FAVORITES } from 'actions'

import { GET_ITEMS_VIDEOS } from 'actions'
import { GET_ITEMS_VIDEOS_UNREAD } from 'actions'
import { GET_ITEMS_VIDEOS_ARCHIVED } from 'actions'
import { GET_ITEMS_VIDEOS_FAVORITES } from 'actions'

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
const ANNOTATATED = { isHighlighted: true }
const ARTICLE = { contentType: 'IS_READABLE' }
const VIDEOS = { contentType: 'IS_VIDEO' }
const SORT_DEFAULT = { sortBy: 'CREATED_AT' }
const SORT_ARCHIVE = { sortBy: 'ARCHIVED_AT' }
const SORT_FAVORITE = { sortBy: 'FAVORITED_AT' }

/** FILTERS
 --------------------------------------------------------------- */

// prettier-ignore
const itemFiltersFromGraph = {
  [GET_ITEMS_UNREAD]: { filter: { ...UNREAD }, sort: SORT_DEFAULT },
  [GET_ITEMS_ARCHIVED]: { filter: { ...ARCHIVED }, sort: SORT_ARCHIVE },
  [GET_ITEMS_FAVORITES]: { filter: { ...FAVORITED, ...ALL }, sort: SORT_FAVORITE },
  [GET_ITEMS_FAVORITES_UNREAD]: { filter: { ...FAVORITED, ...UNREAD }, sort: SORT_FAVORITE },
  [GET_ITEMS_FAVORITES_ARCHIVED]: { filter: { ...FAVORITED, ...ARCHIVED }, sort: SORT_FAVORITE },
  [GET_ITEMS_ANNOTATED]: { filter: { ...ANNOTATATED, ...ALL }, sort: SORT_DEFAULT },
  [GET_ITEMS_ANNOTATED_UNREAD]: { filter: { ...ANNOTATATED, ...UNREAD }, sort: SORT_DEFAULT },
  [GET_ITEMS_ANNOTATED_ARCHIVED]: { filter: { ...ANNOTATATED, ...ARCHIVED }, sort: SORT_DEFAULT },
  [GET_ITEMS_ANNOTATED_FAVORITES]: { filter: { ...ANNOTATATED, ...FAVORITED, ...ALL }, sort: SORT_DEFAULT },
  [GET_ITEMS_ARTICLES]: { filter: { ...ARTICLE, ...ALL }, sort: SORT_DEFAULT },
  [GET_ITEMS_ARTICLES_UNREAD]: { filter: { ...ARTICLE, ...UNREAD }, sort: SORT_DEFAULT },
  [GET_ITEMS_ARTICLES_ARCHIVED]: { filter: { ...ARTICLE, ...ARCHIVED }, sort: SORT_DEFAULT },
  [GET_ITEMS_ARTICLES_FAVORITES]: { filter: { ...ARTICLE, ...FAVORITED, ...ALL }, sort: SORT_DEFAULT },
  [GET_ITEMS_VIDEOS]: { filter: { ...VIDEOS, ...ALL }, sort: SORT_DEFAULT },
  [GET_ITEMS_VIDEOS_UNREAD]: { filter: { ...VIDEOS, ...UNREAD }, sort: SORT_DEFAULT },
  [GET_ITEMS_VIDEOS_ARCHIVED]: { filter: { ...VIDEOS, ...ARCHIVED }, sort: SORT_DEFAULT },
  [GET_ITEMS_VIDEOS_FAVORITES]: { filter: { ...VIDEOS, ...FAVORITED, ...ALL }, sort: SORT_DEFAULT },

}

export async function getSavedItems({ actionType, sortOrder = 'DESC', tagNames, pagination }) {
  const requestDetails = itemFiltersFromGraph[actionType]
  if (!requestDetails) throw new MalformedItemRequestError()

  const { filter, sort } = requestDetails
  const variables = { filter: { ...filter, tagNames }, sort: { ...sort, sortOrder }, pagination }

  return requestGQL({ query: getSavedItemsQuery, operationName: actionType, variables })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  const responseData = response?.data?.user?.savedItems

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
