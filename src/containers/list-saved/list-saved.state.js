import { put, select, takeEvery } from 'redux-saga/effects'
import { ITEMS_SAVED_REQUEST } from 'actions'
import { ITEMS_SAVED_SUCCESS } from 'actions'
import { ITEMS_UPSERT_SUCCESS } from 'actions'
import { ITEMS_UPSERT_INJECT } from 'actions'
import { ITEMS_SAVED_FAILURE } from 'actions'
import { ITEMS_SAVED_RECONCILED } from 'actions'
import { MUTATION_SUCCESS } from 'actions'

import { ITEMS_SAVED_PAGE_INFO_SUCCESS } from 'actions'
import { ITEMS_SAVED_PAGE_INFO_FAILURE } from 'actions'
import { ITEMS_SAVED_PAGE_SET_FILTERS } from 'actions'
import { ITEMS_SAVED_PAGE_SET_SORT_ORDER } from 'actions'
import { ITEMS_SAVED_PAGE_SET_SORT_BY } from 'actions'
import { ITEMS_SAVED_SEARCH_REQUEST } from 'actions'

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

/** FILTERS
 --------------------------------------------------------------- */
const UNREAD = { status: 'UNREAD' }
const ARCHIVED = { status: 'ARCHIVED' }
const FAVORITED = { isFavorite: true }
const ANNOTATATED = { isHighlighted: true }
const ARTICLE = { contentType: 'IS_READABLE' }
const VIDEOS = { contentType: 'IS_VIDEO' }

/** ACTIONS
 --------------------------------------------------------------- */
export const getItemsUnread = (searchTerm, sortOrder) => ({ type: GET_ITEMS_UNREAD, filter: {...UNREAD}, searchTerm, sortOrder}) //prettier-ignore
export const getItemsArchived = (searchTerm, sortOrder) => ({ type: GET_ITEMS_ARCHIVED, filter: {...ARCHIVED}, sortBy: 'ARCHIVED_AT', searchTerm, sortOrder}) //prettier-ignore

export const getItemsFavorites = (searchTerm, sortOrder) => ({ type: GET_ITEMS_FAVORITES, filter: {...FAVORITED}, sortBy: 'FAVORITED_AT', searchTerm, sortOrder}) //prettier-ignore
export const getItemsFavoritesUnread = (searchTerm, sortOrder) => ({ type: GET_ITEMS_FAVORITES_UNREAD, filter: {...FAVORITED, ...UNREAD}, sortBy: 'FAVORITED_AT', searchTerm, sortOrder}) //prettier-ignore
export const getItemsFavoritesArchived = (searchTerm, sortOrder) => ({ type: GET_ITEMS_FAVORITES_ARCHIVED, filter: {...FAVORITED, ...ARCHIVED}, sortBy: 'FAVORITED_AT', searchTerm, sortOrder}) //prettier-ignore

export const getItemsAnnotated = (searchTerm, sortOrder) => ({ type: GET_ITEMS_ANNOTATED, filter: { ...ANNOTATATED }, sortBy: 'UPDATED_AT' , searchTerm, sortOrder}) //prettier-ignore
export const getItemsAnnotatedUnread = (searchTerm, sortOrder) => ({ type: GET_ITEMS_ANNOTATED_UNREAD, filter: {...ANNOTATATED, ...UNREAD}, sortBy: 'UPDATED_AT', searchTerm, sortOrder}) //prettier-ignore
export const getItemsAnnotatedArchived = (searchTerm, sortOrder) => ({ type: GET_ITEMS_ANNOTATED_ARCHIVED, filter: {...ANNOTATATED, ...ARCHIVED }, sortBy: 'UPDATED_AT', searchTerm, sortOrder}) //prettier-ignore
export const getItemsAnnotatedFavorites = (searchTerm, sortOrder) => ({ type: GET_ITEMS_ANNOTATED_FAVORITES, filter: {...ANNOTATATED, ...FAVORITED }, sortBy: 'UPDATED_AT', searchTerm, sortOrder}) //prettier-ignore

export const getItemsArticles = (searchTerm, sortOrder) => ({ type: GET_ITEMS_ARTICLES, filter: { ...ARTICLE} , searchTerm, sortOrder}) //prettier-ignore
export const getItemsArticlesUnread = (searchTerm, sortOrder) => ({ type: GET_ITEMS_ARTICLES_UNREAD, filter: { ...ARTICLE, ...UNREAD} , searchTerm, sortOrder}) //prettier-ignore
export const getItemsArticlesArchived = (searchTerm, sortOrder) => ({type: GET_ITEMS_ARTICLES_ARCHIVED,filter: { ...ARTICLE, ...ARCHIVED  }, searchTerm, sortOrder}) //prettier-ignore
export const getItemsArticlesFavorites = (searchTerm, sortOrder) => ({ type: GET_ITEMS_ARTICLES_FAVORITES, filter: {...ARTICLE, ...FAVORITED}, searchTerm, sortOrder}) //prettier-ignore

export const getItemsVideos = (searchTerm, sortOrder) => ({ type: GET_ITEMS_VIDEOS, filter: {...VIDEOS}, searchTerm, sortOrder}) //prettier-ignore
export const getItemsVideosUnread = (searchTerm, sortOrder) => ({ type: GET_ITEMS_VIDEOS_UNREAD, filter: {...VIDEOS, ...UNREAD}, searchTerm, sortOrder}) //prettier-ignore
export const getItemsVideosArchived = (searchTerm, sortOrder) => ({ type: GET_ITEMS_VIDEOS_ARCHIVED, filter: {...VIDEOS, ...ARCHIVED}, searchTerm, sortOrder}) //prettier-ignore
export const getItemsVideosFavorites = (searchTerm, sortOrder) => ({ type: GET_ITEMS_VIDEOS_FAVORITES, filter: {...VIDEOS, ...FAVORITED}, searchTerm, sortOrder}) //prettier-ignore

export const getItemsTags = (tagNames, searchTerm, sortOrder) => ({ type: GET_ITEMS_TAGS, filter: {tagNames}, searchTerm, sortOrder}) //prettier-ignore
export const getItemsTagsUnread = (tagNames, searchTerm, sortOrder) => ({ type: GET_ITEMS_TAGS_UNREAD, filter: {tagNames, ...UNREAD }, searchTerm, sortOrder}) //prettier-ignore
export const getItemsTagsArchived = (tagNames, searchTerm, sortOrder) => ({ type: GET_ITEMS_TAGS_ARCHIVED, filter: {tagNames, ...ARCHIVED}, searchTerm, sortOrder}) //prettier-ignore
export const getItemsTagsFavorites = (tagNames, searchTerm, sortOrder) => ({ type: GET_ITEMS_TAGS_FAVORITES, filter: {tagNames, ...FAVORITED}, searchTerm, sortOrder}) //prettier-ignore

export const searchItems = (searchTerm, sortOrder) => ({ type: SEARCH_SAVED_ITEMS, filter: {...FAVORITED}, searchTerm, sortOrder }) //prettier-ignore
export const searchItemsUnread = (searchTerm, sortOrder) => ({ type: SEARCH_SAVED_ITEMS_UNREAD, filter: {...UNREAD}, searchTerm, sortOrder }) //prettier-ignore
export const searchItemsArchived = (searchTerm, sortOrder) => ({ type: SEARCH_SAVED_ITEMS_ARCHIVED, filter: {...ARCHIVED}, searchTerm, sortOrder }) //prettier-ignore
export const searchItemsFavorites = (searchTerm, sortOrder) => ({ type: SEARCH_SAVED_ITEMS_FAVORITES, filter: {...FAVORITED}, searchTerm, sortOrder }) //prettier-ignore

export const savedItemsSetSortOrder = (sortOrder) => ({type: ITEMS_SAVED_PAGE_SET_SORT_ORDER, sortOrder}) //prettier-ignore
export const savedItemsSetSortBy = (sortBy) => ({ type: ITEMS_SAVED_PAGE_SET_SORT_BY, sortBy })

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
      const { id } = action
      return state.filter((itemId) => itemId !== id)
    }

    default:
      return state
  }
}

/** PAGINATION REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  filter: {},
  sortBy: 'UPDATED_AT',
  sortOrder: 'DESC',
  count: 30
}
export const listSavedPageInfoReducers = (state = initialState, action) => {
  switch (action.type) {
    case ITEMS_SAVED_REQUEST: {
      const { filters } = action
      return { ...state, ...filters }
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
      const { pageInfo, searchTerm } = action
      return { ...state, ...pageInfo, searchTerm }
    }
    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const listSavedSagas = [
  takeEvery(MUTATION_SUCCESS, reconcileMutation),
  takeEvery(ITEMS_UPSERT_SUCCESS, reconcileUpsert),
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

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* reconcileMutation(action) {
  const { item, id } = action
  const { filter } = yield select(getSavedPageInfo)
  const removeItem = shouldBeFiltered(item, filter)

  if (removeItem) yield put({ type: ITEM_SAVED_REMOVE_FROM_LIST, id })
}

function* reconcileUpsert(action) {
  const { sortOrder, filter } = yield select(getSavedPageInfo)

  // When sort order is ASC we will ignore this since it will be picked up in future requests
  if (sortOrder === 'ASC') return

  // Does this item belong in ths list?
  const { nodes, savedItemIds } = action

  const itemId = savedItemIds[0] || false
  const item = nodes[itemId]
  if (!item) return

  const notInFilter = shouldBeFiltered(item, filter)
  if (!notInFilter) yield put({ type: ITEMS_UPSERT_INJECT, savedItemIds })
}

function* requestItemsWithFilter(action) {
  const { filter, sortBy = 'CREATED_AT', searchTerm } = action
  const { sortOrder, count } = yield select(getSavedPageInfo)
  const type = searchTerm ? ITEMS_SAVED_SEARCH_REQUEST : ITEMS_SAVED_REQUEST
  yield put({ type, filters: { filter, sort: { sortOrder, sortBy }, count, searchTerm } })
}

function shouldBeFiltered(item, filter) {
  if (filter?.isHighlighted && !item?.isHighlighted) return true
  if (filter?.isFavorite && !item?.isFavorite) return true
  if (filter?.status && filter?.status !== item?.status) return true
}
