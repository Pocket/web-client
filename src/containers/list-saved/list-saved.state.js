import { put, call, select, takeEvery } from 'redux-saga/effects'
import { ITEMS_SAVED_REQUEST } from 'actions'
import { ITEMS_SAVED_SUCCESS } from 'actions'
import { ITEMS_UPSERT_SUCCESS } from 'actions'
import { ITEMS_UPSERT_INJECT } from 'actions'
import { ITEMS_SAVED_FAILURE } from 'actions'
import { ITEMS_SAVED_RECONCILED } from 'actions'
import { MUTATION_SUCCESS } from 'actions'
import { MUTATION_DELETE_SUCCESS } from 'actions'

import { ITEMS_SAVED_PAGE_INFO_SUCCESS } from 'actions'
import { ITEMS_SAVED_PAGE_INFO_FAILURE } from 'actions'
import { ITEMS_SAVED_PAGE_SET_FILTERS } from 'actions'
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
import { LOAD_MORE_ITEMS } from 'actions'

/** FILTERS
 --------------------------------------------------------------- */
const UNREAD = { statuses: ['UNREAD'] }
const ARCHIVED = { statuses: ['ARCHIVED'] }
const ALL = { statuses: ['UNREAD', 'ARCHIVED'] }
const FAVORITED = { isFavorite: true }
const ANNOTATATED = { isHighlighted: true }
const ARTICLE = { contentType: 'IS_READABLE' }
const VIDEOS = { contentType: 'IS_VIDEO' }

/** ACTIONS
 --------------------------------------------------------------- */
export const getItemsUnread = (searchTerm, sortOrder) => ({ type: GET_ITEMS_UNREAD, filter: {...UNREAD}, searchTerm, sortOrder}) //prettier-ignore
export const getItemsArchived = (searchTerm, sortOrder) => ({ type: GET_ITEMS_ARCHIVED, filter: {...ARCHIVED}, sortBy: 'ARCHIVED_AT', searchTerm, sortOrder}) //prettier-ignore

export const getItemsFavorites = (searchTerm, sortOrder) => ({ type: GET_ITEMS_FAVORITES, filter: {...FAVORITED, ...ALL}, sortBy: 'FAVORITED_AT', searchTerm, sortOrder}) //prettier-ignore
export const getItemsFavoritesUnread = (searchTerm, sortOrder) => ({ type: GET_ITEMS_FAVORITES_UNREAD, filter: {...FAVORITED, ...UNREAD}, sortBy: 'FAVORITED_AT', searchTerm, sortOrder}) //prettier-ignore
export const getItemsFavoritesArchived = (searchTerm, sortOrder) => ({ type: GET_ITEMS_FAVORITES_ARCHIVED, filter: {...FAVORITED, ...ARCHIVED}, sortBy: 'FAVORITED_AT', searchTerm, sortOrder}) //prettier-ignore

export const getItemsAnnotated = (searchTerm, sortOrder) => ({ type: GET_ITEMS_ANNOTATED, filter: { ...ANNOTATATED, ...ALL}, sortBy: 'CREATED_AT' , searchTerm, sortOrder}) //prettier-ignore
export const getItemsAnnotatedUnread = (searchTerm, sortOrder) => ({ type: GET_ITEMS_ANNOTATED_UNREAD, filter: {...ANNOTATATED, ...UNREAD}, sortBy: 'CREATED_AT', searchTerm, sortOrder}) //prettier-ignore
export const getItemsAnnotatedArchived = (searchTerm, sortOrder) => ({ type: GET_ITEMS_ANNOTATED_ARCHIVED, filter: {...ANNOTATATED, ...ARCHIVED }, sortBy: 'CREATED_AT', searchTerm, sortOrder}) //prettier-ignore
export const getItemsAnnotatedFavorites = (searchTerm, sortOrder) => ({ type: GET_ITEMS_ANNOTATED_FAVORITES, filter: {...ANNOTATATED, ...FAVORITED, ...ALL }, sortBy: 'CREATED_AT', searchTerm, sortOrder}) //prettier-ignore

export const getItemsArticles = (searchTerm, sortOrder) => ({ type: GET_ITEMS_ARTICLES, filter: { ...ARTICLE, ...ALL} , searchTerm, sortOrder}) //prettier-ignore
export const getItemsArticlesUnread = (searchTerm, sortOrder) => ({ type: GET_ITEMS_ARTICLES_UNREAD, filter: { ...ARTICLE, ...UNREAD} , searchTerm, sortOrder}) //prettier-ignore
export const getItemsArticlesArchived = (searchTerm, sortOrder) => ({type: GET_ITEMS_ARTICLES_ARCHIVED,filter: { ...ARTICLE, ...ARCHIVED  }, searchTerm, sortOrder}) //prettier-ignore
export const getItemsArticlesFavorites = (searchTerm, sortOrder) => ({ type: GET_ITEMS_ARTICLES_FAVORITES, filter: {...ARTICLE, ...FAVORITED, ...ALL}, searchTerm, sortOrder}) //prettier-ignore

export const getItemsVideos = (searchTerm, sortOrder) => ({ type: GET_ITEMS_VIDEOS, filter: {...VIDEOS, ...ALL}, searchTerm, sortOrder}) //prettier-ignore
export const getItemsVideosUnread = (searchTerm, sortOrder) => ({ type: GET_ITEMS_VIDEOS_UNREAD, filter: {...VIDEOS, ...UNREAD}, searchTerm, sortOrder}) //prettier-ignore
export const getItemsVideosArchived = (searchTerm, sortOrder) => ({ type: GET_ITEMS_VIDEOS_ARCHIVED, filter: {...VIDEOS, ...ARCHIVED}, searchTerm, sortOrder}) //prettier-ignore
export const getItemsVideosFavorites = (searchTerm, sortOrder) => ({ type: GET_ITEMS_VIDEOS_FAVORITES, filter: {...VIDEOS, ...FAVORITED, ...ALL}, searchTerm, sortOrder}) //prettier-ignore

export const getItemsTags = (searchTerm, sortOrder, tagNames) => ({ type: GET_ITEMS_TAGS, filter: {tagNames, ...ALL}, searchTerm, sortOrder}) //prettier-ignore
export const getItemsTagsUnread = (searchTerm, sortOrder, tagNames) => ({ type: GET_ITEMS_TAGS_UNREAD, filter: {tagNames, ...UNREAD }, searchTerm, sortOrder}) //prettier-ignore
export const getItemsTagsArchived = (searchTerm, sortOrder, tagNames) => ({ type: GET_ITEMS_TAGS_ARCHIVED, filter: {tagNames, ...ARCHIVED}, searchTerm, sortOrder}) //prettier-ignore
export const getItemsTagsFavorites = (searchTerm, sortOrder, tagNames) => ({ type: GET_ITEMS_TAGS_FAVORITES, filter: {tagNames, ...FAVORITED, ...ALL}, searchTerm, sortOrder}) //prettier-ignore

export const searchItems = (searchTerm, sortOrder) => ({ type: SEARCH_SAVED_ITEMS, filter: {status: 'UNREAD'}, searchTerm, sortOrder }) //prettier-ignore
export const searchItemsUnread = (searchTerm, sortOrder) => ({ type: SEARCH_SAVED_ITEMS_UNREAD, filter: {status: 'UNREAD'}, searchTerm, sortOrder }) //prettier-ignore
export const searchItemsArchived = (searchTerm, sortOrder) => ({ type: SEARCH_SAVED_ITEMS_ARCHIVED, filter: {status: 'ARCHIVED'}, searchTerm, sortOrder }) //prettier-ignore
export const searchItemsFavorites = (searchTerm, sortOrder) => ({ type: SEARCH_SAVED_ITEMS_FAVORITES, filter: {...FAVORITED, status: 'UNREAD'}, searchTerm, sortOrder }) //prettier-ignore

export const savedItemsSetSortOrder = (sortOrder) => ({type: ITEMS_SAVED_PAGE_SET_SORT_ORDER, sortOrder}) //prettier-ignore
export const savedItemsSetSortBy = (sortBy) => ({ type: ITEMS_SAVED_PAGE_SET_SORT_BY, sortBy })

export const loadMoreListItems = () => ({ type: LOAD_MORE_ITEMS })

/** LIST SAVED REDUCERS
 --------------------------------------------------------------- */
export const listSavedReducers = (state = [], action) => {
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

    case SEARCH_SAVED_ITEMS:
    case SEARCH_SAVED_ITEMS_UNREAD:
    case SEARCH_SAVED_ITEMS_ARCHIVED:
    case SEARCH_SAVED_ITEMS_FAVORITES:
    case GET_ITEMS_UNREAD:
    case GET_ITEMS_ARCHIVED:
    case GET_ITEMS_FAVORITES:
    case GET_ITEMS_FAVORITES_UNREAD:
    case GET_ITEMS_FAVORITES_ARCHIVED:
    case GET_ITEMS_ANNOTATED:
    case GET_ITEMS_ANNOTATED_UNREAD:
    case GET_ITEMS_ANNOTATED_ARCHIVED:
    case GET_ITEMS_ANNOTATED_FAVORITES:
    case GET_ITEMS_ARTICLES:
    case GET_ITEMS_ARTICLES_UNREAD:
    case GET_ITEMS_ARTICLES_ARCHIVED:
    case GET_ITEMS_ARTICLES_FAVORITES:
    case GET_ITEMS_VIDEOS:
    case GET_ITEMS_VIDEOS_UNREAD:
    case GET_ITEMS_VIDEOS_ARCHIVED:
    case GET_ITEMS_VIDEOS_FAVORITES:
    case GET_ITEMS_TAGS:
    case GET_ITEMS_TAGS_UNREAD:
    case GET_ITEMS_TAGS_ARCHIVED:
    case GET_ITEMS_TAGS_FAVORITES: {
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
  filter: {},
  sortBy: 'CREATED_AT',
  sortOrder: 'DESC',
  count: 30,
  error: false
}
export const listSavedPageInfoReducers = (state = initialState, action) => {
  switch (action.type) {
    case ITEMS_SAVED_TAGGED_REQUEST:
    case ITEMS_SAVED_SEARCH_REQUEST:
    case ITEMS_SAVED_REQUEST: {
      const { filters } = action
      const { sortOrder, sortBy } = filters?.sort || {}

      return { ...state, error: false, loading: true, sortOrder, sortBy, ...filters }
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
export const listSavedSagas = [
  takeEvery(MUTATION_SUCCESS, reconcileMutation),
  takeEvery(MUTATION_DELETE_SUCCESS, reconcileDeleteMutation),
  takeEvery(ITEMS_UPSERT_SUCCESS, reconcileUpsert),
  takeEvery(LOAD_MORE_ITEMS, loadMoreItems),
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
    requestItemsWithFilter
  )
]

/** SAGA :: SELECTORS
 --------------------------------------------------------------- */
const getSavedPageInfo = (state) => state.listSavedPageInfo
const getItems = (state) => state.items

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* reconcileMutation(action) {
  const { nodes } = action
  const { filter } = yield select(getSavedPageInfo)
  const items = yield select(getItems)

  const idsToRemove = nodes
    .filter((node) => shouldBeFiltered({ item: items[node?.id], node }, filter))
    .map((node) => node.id)

  if (idsToRemove.length) yield put({ type: ITEM_SAVED_REMOVE_FROM_LIST, idsToRemove })
}

function* reconcileDeleteMutation(action) {
  const { id } = action
  yield put({ type: ITEM_SAVED_REMOVE_FROM_LIST, idsToRemove: [id] })
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

function* requestItemsWithFilter(action) {
  const { filter, sortBy = 'CREATED_AT', searchTerm } = action
  const { sortOrder, count } = yield select(getSavedPageInfo)
  const type = yield call(itemRequestType, searchTerm, filter?.tagNames)

  yield put({ type, filters: { filter, sort: { sortOrder, sortBy }, count, searchTerm } })
}

function* loadMoreItems() {
  try {
    const { searchTerm, filter, sortOrder, sortBy, endCursor } = yield select(getSavedPageInfo)
    const type = yield call(itemRequestType, searchTerm, filter?.tagNames)

    yield put({
      type,
      filters: {
        filter,
        sort: { sortOrder, sortBy },
        count: 30,
        searchTerm,
        pagination: {
          after: endCursor
        }
      }
    })
  } catch (err) {
    console.warn(err)
  }
}

function shouldBeFiltered(itemDetails, filter) {
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
