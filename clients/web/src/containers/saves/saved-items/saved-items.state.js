import { put, call, select, takeEvery } from 'redux-saga/effects'
import * as Sentry from '@sentry/nextjs'
import { itemFiltersFromGraph } from 'common/api/queries/get-saved-items.filters'
import { arraysAreEqual } from 'common/utilities/object-array/object-array'

import { ITEMS_SAVED_REQUEST } from 'actions'
import { ITEMS_SAVED_SUCCESS } from 'actions'
import { ITEMS_UPSERT_SUCCESS } from 'actions'
import { ITEMS_UPSERT_INJECT } from 'actions'
import { ITEMS_SAVED_FAILURE } from 'actions'
import { MUTATION_SUCCESS } from 'actions'
import { MUTATION_DELETE_SUCCESS } from 'actions'

import { ITEMS_SAVED_UPDATE_REQUEST } from 'actions'
import { ITEMS_SAVED_UPDATE_SUCCESS } from 'actions'

import { ITEMS_UNDELETE_SUCCESS } from 'actions'

import { ITEMS_SAVED_PAGE_INFO_SUCCESS } from 'actions'
import { ITEMS_SAVED_PAGE_SET_FILTERS } from 'actions'
import { ITEMS_SAVED_PAGE_SET_SORT_ORDER_REQUEST } from 'actions'
import { ITEMS_SAVED_PAGE_SET_SORT_ORDER } from 'actions'
import { ITEMS_SAVED_PAGE_SET_SORT_BY } from 'actions'
import { ITEMS_SAVED_SEARCH_REQUEST } from 'actions'
import { ITEMS_SAVED_TAGGED_REQUEST } from 'actions'

import { ITEM_SAVED_REMOVE_FROM_LIST } from 'actions'
import { SEARCH_SAVED_ITEMS } from 'actions'
import { SEARCH_SAVED_ITEMS_UNREAD } from 'actions'
import { SEARCH_SAVED_ITEMS_ARCHIVED } from 'actions'
import { SEARCH_SAVED_ITEMS_FAVORITES } from 'actions'

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
import { GET_ITEMS_TAGS } from 'actions'
import { GET_ITEMS_TAGS_UNREAD } from 'actions'
import { GET_ITEMS_TAGS_ARCHIVED } from 'actions'
import { GET_ITEMS_TAGS_FAVORITES } from 'actions'
import { ITEMS_CLEAR_CURRENT } from 'actions'
import { LOAD_MORE_ITEMS } from 'actions'
import { LOAD_PREVIOUS_ITEMS } from 'actions'

import { SNOWPLOW_SEND_EVENT } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getItemsUnread = (sortOrder) => ({ type: GET_ITEMS_UNREAD, sortOrder}) //prettier-ignore
export const getItemsArchived = (sortOrder) => ({ type: GET_ITEMS_ARCHIVED, sortOrder }) //prettier-ignore

export const getItemsFavorites = (sortOrder) => ({ type: GET_ITEMS_FAVORITES, sortOrder}) //prettier-ignore
export const getItemsFavoritesUnread = (sortOrder) => ({ type: GET_ITEMS_FAVORITES_UNREAD, sortOrder}) //prettier-ignore
export const getItemsFavoritesArchived = (sortOrder) => ({ type: GET_ITEMS_FAVORITES_ARCHIVED, sortOrder}) //prettier-ignore

export const getItemsAnnotated = (sortOrder) => ({ type: GET_ITEMS_ANNOTATED, sortOrder}) //prettier-ignore
export const getItemsAnnotatedUnread = (sortOrder) => ({ type: GET_ITEMS_ANNOTATED_UNREAD, sortOrder}) //prettier-ignore
export const getItemsAnnotatedArchived = (sortOrder) => ({ type: GET_ITEMS_ANNOTATED_ARCHIVED, sortOrder}) //prettier-ignore
export const getItemsAnnotatedFavorites = (sortOrder) => ({ type: GET_ITEMS_ANNOTATED_FAVORITES, sortOrder}) //prettier-ignore

export const getItemsArticles = (sortOrder) => ({ type: GET_ITEMS_ARTICLES, sortOrder}) //prettier-ignore
export const getItemsArticlesUnread = (sortOrder) => ({ type: GET_ITEMS_ARTICLES_UNREAD, sortOrder}) //prettier-ignore
export const getItemsArticlesArchived = (sortOrder) => ({type: GET_ITEMS_ARTICLES_ARCHIVED, sortOrder}) //prettier-ignore
export const getItemsArticlesFavorites = (sortOrder) => ({ type: GET_ITEMS_ARTICLES_FAVORITES, sortOrder}) //prettier-ignore

export const getItemsVideos = (sortOrder) => ({ type: GET_ITEMS_VIDEOS, sortOrder}) //prettier-ignore
export const getItemsVideosUnread = (sortOrder) => ({ type: GET_ITEMS_VIDEOS_UNREAD, sortOrder}) //prettier-ignore
export const getItemsVideosArchived = (sortOrder) => ({ type: GET_ITEMS_VIDEOS_ARCHIVED, sortOrder}) //prettier-ignore
export const getItemsVideosFavorites = (sortOrder) => ({ type: GET_ITEMS_VIDEOS_FAVORITES, sortOrder}) //prettier-ignore

export const getItemsTags = (searchTerm, sortOrder, tagNames) => ({ type: GET_ITEMS_TAGS, tagNames, sortOrder}) //prettier-ignore
export const getItemsTagsUnread = (searchTerm, sortOrder, tagNames) => ({ type: GET_ITEMS_TAGS_UNREAD, tagNames, sortOrder}) //prettier-ignore
export const getItemsTagsArchived = (searchTerm, sortOrder, tagNames) => ({ type: GET_ITEMS_TAGS_ARCHIVED, tagNames, sortOrder}) //prettier-ignore
export const getItemsTagsFavorites = (searchTerm, sortOrder, tagNames) => ({ type: GET_ITEMS_TAGS_FAVORITES, tagNames, sortOrder}) //prettier-ignore

export const searchItems = (searchTerm, sortOrder) => ({ type: SEARCH_SAVED_ITEMS, searchTerm, sortOrder }) //prettier-ignore
export const searchItemsUnread = (searchTerm, sortOrder) => ({ type: SEARCH_SAVED_ITEMS_UNREAD, searchTerm, sortOrder }) //prettier-ignore
export const searchItemsArchived = (searchTerm, sortOrder) => ({ type: SEARCH_SAVED_ITEMS_ARCHIVED, searchTerm, sortOrder }) //prettier-ignore
export const searchItemsFavorites = (searchTerm, sortOrder) => ({ type: SEARCH_SAVED_ITEMS_FAVORITES, searchTerm, sortOrder }) //prettier-ignore

export const savedItemsSetSortOrder = (sortOrder) => ({type: ITEMS_SAVED_PAGE_SET_SORT_ORDER_REQUEST, sortOrder}) //prettier-ignore
export const savedItemsSetSortBy = (sortBy) => ({ type: ITEMS_SAVED_PAGE_SET_SORT_BY, sortBy })

export const loadMoreListItems = () => ({ type: LOAD_MORE_ITEMS })
export const loadPreviousListItems = () => ({ type: LOAD_PREVIOUS_ITEMS })

/** LIST SAVED REDUCERS
 --------------------------------------------------------------- */
export const pageSavedIdsReducers = (state = [], action) => {
  switch (action.type) {
    case ITEMS_SAVED_SUCCESS: {
      const itemIds = action?.savedItemIds || []
      const items = new Set([...state, ...itemIds])
      return [...items]
    }

    case ITEMS_UPSERT_INJECT: {
      const itemIds = action?.savedItemIds || []
      const items = new Set([...itemIds, ...state])
      return [...items]
    }

    case ITEMS_UNDELETE_SUCCESS: {
      const { itemId, itemPosition } = action
      const currentItems = state.slice()
      currentItems.splice(itemPosition, 0, itemId)
      return currentItems
    }

    // ! This is agressive clearing of the list
    case ITEMS_SAVED_PAGE_SET_SORT_ORDER:
    case ITEMS_SAVED_PAGE_SET_SORT_BY:
    case ITEMS_CLEAR_CURRENT: {
      return []
    }

    case ITEM_SAVED_REMOVE_FROM_LIST: {
      const { idsToRemove } = action
      return state.filter((itemId) => !idsToRemove.includes(itemId))
    }

    default:
      return state
  }
}

/** PAGINATION REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  sortOrder: 'DESC',
  count: 30,
  loading: true,
  totalCount: 0,
  tagNames: [],
  error: false
}
export const pageSavedInfoReducers = (state = initialState, action) => {
  switch (action.type) {
    case ITEMS_SAVED_TAGGED_REQUEST:
    case ITEMS_SAVED_SEARCH_REQUEST:
    case ITEMS_SAVED_REQUEST: {
      const { sortOrder = 'DESC', tagNames, searchTerm, actionType } = action
      return { ...state, error: false, loading: true, sortOrder, actionType, tagNames, searchTerm }
    }

    case ITEMS_SAVED_PAGE_SET_FILTERS: {
      const { filter } = action
      return { ...state, filter }
    }

    case ITEMS_SAVED_PAGE_SET_SORT_ORDER: {
      const { sortOrder } = action
      return { ...state, sortOrder }
    }

    case ITEMS_SAVED_PAGE_SET_SORT_BY: {
      const { sortBy } = action
      const sortOrder = sortBy === 'RELEVANCE' ? { sortOrder: 'DESC' } : {}
      return { ...state, ...sortOrder, sortBy }
    }

    case ITEMS_SAVED_PAGE_INFO_SUCCESS: {
      const { pageInfo } = action
      const { searchTerm } = pageInfo
      return { ...state, loading: false, ...pageInfo, searchTerm }
    }

    case ITEMS_SAVED_SUCCESS: {
      return { ...state, loading: false }
    }

    case ITEMS_SAVED_FAILURE: {
      return { ...state, loading: false, error: true }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const pageSavedIdsSagas = [
  takeEvery(MUTATION_SUCCESS, reconcileMutation),
  takeEvery(MUTATION_DELETE_SUCCESS, reconcileDeleteMutation),
  takeEvery([ITEMS_UPSERT_SUCCESS, ITEMS_SAVED_UPDATE_SUCCESS], reconcileUpsert),
  takeEvery(LOAD_MORE_ITEMS, loadMoreItems),
  takeEvery(LOAD_PREVIOUS_ITEMS, loadPreviousItems),
  takeEvery(ITEMS_SAVED_PAGE_SET_SORT_ORDER_REQUEST, adjustSortOrder),
  takeEvery(
    [
      SEARCH_SAVED_ITEMS,
      SEARCH_SAVED_ITEMS_UNREAD,
      SEARCH_SAVED_ITEMS_ARCHIVED,
      SEARCH_SAVED_ITEMS_FAVORITES,
      GET_ITEMS_UNREAD,
      GET_ITEMS_ARCHIVED,
      GET_ITEMS_FAVORITES,
      GET_ITEMS_FAVORITES_UNREAD,
      GET_ITEMS_FAVORITES_ARCHIVED,
      GET_ITEMS_ANNOTATED,
      GET_ITEMS_ANNOTATED_UNREAD,
      GET_ITEMS_ANNOTATED_ARCHIVED,
      GET_ITEMS_ANNOTATED_FAVORITES,
      GET_ITEMS_ARTICLES,
      GET_ITEMS_ARTICLES_UNREAD,
      GET_ITEMS_ARTICLES_ARCHIVED,
      GET_ITEMS_ARTICLES_FAVORITES,
      GET_ITEMS_VIDEOS,
      GET_ITEMS_VIDEOS_UNREAD,
      GET_ITEMS_VIDEOS_ARCHIVED,
      GET_ITEMS_VIDEOS_FAVORITES,
      GET_ITEMS_TAGS,
      GET_ITEMS_TAGS_UNREAD,
      GET_ITEMS_TAGS_ARCHIVED,
      GET_ITEMS_TAGS_FAVORITES
    ],
    requestItems
  )
]

/** SAGA :: SELECTORS
 --------------------------------------------------------------- */
const getSavedPageInfo = (state) => state.pageSavedInfo
const getSavedPageIds = (state) => state.pageSavedIds
const getSortOrder = (state) => state.pageSavedInfo?.sortOrder
const getItems = (state) => state.itemsDisplay
const getItemCursor = (state, id) => state.itemsSaved[id]?.cursor

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* reconcileMutation(action) {
  const { nodes } = action
  const { actionType } = yield select(getSavedPageInfo)
  const items = yield select(getItems)

  const idsToRemove = nodes
    .filter((node) => shouldBeFiltered({ item: items[node?.id], node }, actionType))
    .map((node) => node.id)

  if (idsToRemove.length) yield put({ type: ITEM_SAVED_REMOVE_FROM_LIST, idsToRemove })
}

function* reconcileDeleteMutation(action) {
  const { ids } = action
  yield put({ type: ITEM_SAVED_REMOVE_FROM_LIST, idsToRemove: ids })
}

function* reconcileUpsert(action) {
  const { sortOrder, sortBy, filter } = yield select(getSavedPageInfo)
  const items = yield select(getItems)

  // When sort order is ASC we will ignore this since it will be picked up in future requests
  if (sortOrder === 'ASC' || sortBy === 'RELEVANCE') return

  // Does this item belong in ths list?
  const { nodes, savedItemIds } = action

  const itemId = savedItemIds[0] || false
  const node = nodes[itemId]
  const item = items[itemId]
  if (!node) return

  const notInFilter = shouldBeFiltered({ item, node }, filter)
  if (!notInFilter) yield put({ type: ITEMS_UPSERT_INJECT, savedItemIds })
}

function* requestItems(action) {
  const { searchTerm, type: actionType, tagNames } = action
  const {
    sortOrder,
    count,
    tagNames: previousTagNames,
    actionType: previousActionType,
    searchTerm: previousSearchTerm
  } = yield select(getSavedPageInfo)

  // Less aggressive clearing
  const differentActionType = actionType !== previousActionType
  const differentSearch = searchTerm !== previousSearchTerm

  const requestInvolvesTags = Array.isArray(tagNames) || Array.isArray(previousTagNames)
  const tagChanges = requestInvolvesTags && !arraysAreEqual(tagNames, previousTagNames)

  if (differentActionType || differentSearch || tagChanges) {
    yield put({ type: ITEMS_CLEAR_CURRENT })
  }

  const type = yield call(itemRequestType, searchTerm, tagNames)

  yield put({ type, actionType, sortOrder, count, tagNames, searchTerm })
}

function* loadMoreItems() {
  try {
    const { searchTerm, sortOrder, endCursor, actionType, tagNames } =
      yield select(getSavedPageInfo)
    const type = yield call(itemRequestType, searchTerm, tagNames)

    yield put({
      type,
      actionType,
      sortOrder,
      searchTerm,
      tagNames,
      count: 30,
      pagination: {
        after: endCursor
      }
    })
  } catch (err) {
    console.warn(err)
  }
}

function* loadPreviousItems() {
  try {
    const { searchTerm, sortOrder, actionType, tagNames } = yield select(getSavedPageInfo)
    const type = yield call(itemRequestType, searchTerm, tagNames)
    // We only want to fetch an update if the user is on Saves
    if (type !== ITEMS_SAVED_REQUEST) return

    const ids = yield select(getSavedPageIds)
    const startCursor = yield select(getItemCursor, ids[0])
    // If there's no startCursor there's something wrong and we shouldn't update
    if (!startCursor) return

    yield put({
      type: ITEMS_SAVED_UPDATE_REQUEST,
      actionType,
      sortOrder,
      pagination: {
        before: startCursor
      }
    })
  } catch (err) {
    Sentry.withScope((scope) => {
      scope.setFingerprint('LoadPreviousItems Error')
      Sentry.captureMessage(err)
    })
  }
}

function* adjustSortOrder(action) {
  const { sortOrder } = action
  const currentSortOrder = yield select(getSortOrder)

  // Don't change sort order if it's already in the same space
  if (currentSortOrder === sortOrder) return

  yield put({ type: ITEMS_SAVED_PAGE_SET_SORT_ORDER, sortOrder })

  const identifier = 'saves.sort'
  const data = { value: sortOrder }
  yield put({ type: SNOWPLOW_SEND_EVENT, identifier, data })
}

function shouldBeFiltered(itemDetails, actionType) {
  const { filter } = itemFiltersFromGraph[actionType] || {}
  const { item, node } = itemDetails

  if (node?.status === 'DELETED') return true
  if (filter?.contentType === 'IS_READABLE' && !item?.isArticle) return true
  if (filter?.contentType === 'IS_VIDEO' && item?.hasVideo !== 'IS_VIDEO') return true
  if (filter?.isHighlighted && !node?.isHighlighted) return true
  if (filter?.isFavorite && !node?.isFavorite) return true
  if (filter?.statuses && !filter?.statuses.includes(node?.status)) return true
}

function itemRequestType(searchTerm, tagNames) {
  if (tagNames?.length) return ITEMS_SAVED_TAGGED_REQUEST
  if (searchTerm) return ITEMS_SAVED_SEARCH_REQUEST
  return ITEMS_SAVED_REQUEST
}
