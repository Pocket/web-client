import { put, select, takeEvery } from 'redux-saga/effects'
import { ITEMS_SAVED_REQUEST } from 'actions'
import { ITEMS_SAVED_SUCCESS } from 'actions'
import { ITEMS_SAVED_FAILURE } from 'actions'
import { ITEMS_SAVED_RECONCILED } from 'actions'
import { MUTATION_SUCCESS } from 'actions'

import { ITEMS_SAVED_PAGE_INFO_SUCCESS } from 'actions'
import { ITEMS_SAVED_PAGE_INFO_FAILURE } from 'actions'
import { ITEMS_SAVED_PAGE_SET_FILTERS } from 'actions'
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
const ARTICLE = { contentType: 'ARTICLE' }
const VIDEOS = { contentType: 'VIDEO' }

/** ACTIONS
 --------------------------------------------------------------- */
export const getItemsUnread = (searchTerm) => ({ type: GET_ITEMS_UNREAD, filter: {...UNREAD}, searchTerm}) //prettier-ignore
export const getItemsArchived = (searchTerm) => ({ type: GET_ITEMS_ARCHIVED, filter: {...ARCHIVED}, searchTerm}) //prettier-ignore

export const getItemsFavorites = (searchTerm) => ({ type: GET_ITEMS_FAVORITES, filter: {...FAVORITED}, sortBy: 'FAVORITED_AT', searchTerm}) //prettier-ignore
export const getItemsFavoritesUnread = (searchTerm) => ({ type: GET_ITEMS_FAVORITES_UNREAD, filter: {...FAVORITED, ...UNREAD}, sortBy: 'FAVORITED_AT', searchTerm}) //prettier-ignore
export const getItemsFavoritesArchived = (searchTerm) => ({ type: GET_ITEMS_FAVORITES_ARCHIVED, filter: {...FAVORITED, ...ARCHIVED}, sortBy: 'FAVORITED_AT', searchTerm}) //prettier-ignore

export const getItemsAnnotated = (searchTerm) => ({ type: GET_ITEMS_ANNOTATED, filter: { ...ANNOTATATED }, sortBy: 'ARCHIVED_AT' , searchTerm}) //prettier-ignore
export const getItemsAnnotatedUnread = (searchTerm) => ({ type: GET_ITEMS_ANNOTATED_UNREAD, filter: {...ANNOTATATED, ...UNREAD}, sortBy: 'ARCHIVED_AT', searchTerm}) //prettier-ignore
export const getItemsAnnotatedArchived = (searchTerm) => ({ type: GET_ITEMS_ANNOTATED_ARCHIVED, filter: {...ANNOTATATED, ...ARCHIVED }, sortBy: 'ARCHIVED_AT', searchTerm}) //prettier-ignore
export const getItemsAnnotatedFavorites = (searchTerm) => ({ type: GET_ITEMS_ANNOTATED_FAVORITES, filter: {...ANNOTATATED, ...FAVORITED }, sortBy: 'ARCHIVED_AT', searchTerm}) //prettier-ignore

export const getItemsArticles = (searchTerm) => ({ type: GET_ITEMS_ARTICLES, filter: { ...ARTICLE} , searchTerm}) //prettier-ignore
export const getItemsArticlesUnread = (searchTerm) => ({ type: GET_ITEMS_ARTICLES_UNREAD, filter: { ...ARTICLE, ...UNREAD} , searchTerm}) //prettier-ignore
export const getItemsArticlesArchived = (searchTerm) => ({type: GET_ITEMS_ARTICLES_ARCHIVED,filter: { ...ARTICLE, ...ARCHIVED  }, searchTerm}) //prettier-ignore
export const getItemsArticlesFavorites = (searchTerm) => ({ type: GET_ITEMS_ARTICLES_FAVORITES, filter: {...ARTICLE, ...FAVORITED}, searchTerm}) //prettier-ignore

export const getItemsVideos = (searchTerm) => ({ type: GET_ITEMS_VIDEOS, filter: {...VIDEOS}, searchTerm}) //prettier-ignore
export const getItemsVideosUnread = (searchTerm) => ({ type: GET_ITEMS_VIDEOS_UNREAD, filter: {...VIDEOS, ...UNREAD}, searchTerm}) //prettier-ignore
export const getItemsVideosArchived = (searchTerm) => ({ type: GET_ITEMS_VIDEOS_ARCHIVED, filter: {...VIDEOS, ...ARCHIVED}, searchTerm}) //prettier-ignore
export const getItemsVideosFavorites = (searchTerm) => ({ type: GET_ITEMS_VIDEOS_FAVORITES, filter: {...VIDEOS, ...FAVORITED}, searchTerm}) //prettier-ignore

export const getItemsTags = (tagNames, searchTerm) => ({ type: GET_ITEMS_TAGS, filter: {tagNames}, searchTerm}) //prettier-ignore
export const getItemsTagsUnread = (tagNames, searchTerm) => ({ type: GET_ITEMS_TAGS_UNREAD, filter: {tagNames, ...UNREAD }, searchTerm}) //prettier-ignore
export const getItemsTagsArchived = (tagNames, searchTerm) => ({ type: GET_ITEMS_TAGS_ARCHIVED, filter: {tagNames, ...ARCHIVED}, searchTerm}) //prettier-ignore
export const getItemsTagsFavorites = (tagNames, searchTerm) => ({ type: GET_ITEMS_TAGS_FAVORITES, filter: {tagNames, ...FAVORITED}, searchTerm}) //prettier-ignore

export const searchItems = (searchTerm) => ({ type: SEARCH_SAVED_ITEMS, filter: {...FAVORITED}, searchTerm }) //prettier-ignore
export const searchItemsUnread = (searchTerm) => ({ type: SEARCH_SAVED_ITEMS_UNREAD, filter: {...UNREAD}, searchTerm }) //prettier-ignore
export const searchItemsArchived = (searchTerm) => ({ type: SEARCH_SAVED_ITEMS_ARCHIVED, filter: {...ARCHIVED}, searchTerm }) //prettier-ignore
export const searchItemsFavorites = (searchTerm) => ({ type: SEARCH_SAVED_ITEMS_FAVORITES, filter: {...FAVORITED}, searchTerm }) //prettier-ignore

/** LIST SAVED REDUCERS
 --------------------------------------------------------------- */
export const listSavedReducers = (state = [], action) => {
  switch (action.type) {
    case ITEMS_SAVED_SUCCESS: {
      const itemIds = action?.savedItemIds || []
      const items = new Set([...state, ...itemIds])
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
  filter: { status: 'UNREAD' },
  sort: {
    sortBy: 'CREATED_AT',
    sortOrder: 'DESC'
  },
  count: 30
}
export const listSavedPageInfoReducers = (state = initialState, action) => {
  switch (action.type) {
    case ITEMS_SAVED_PAGE_SET_FILTERS: {
      const { filter } = action
      return { ...state, filter }
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
  const pageInfo = yield select(getSavedPageInfo)
  const { filter } = pageInfo

  if (filter?.status !== item?.status) yield put({ type: ITEM_SAVED_REMOVE_FROM_LIST, id })
}

function* requestItemsWithFilter(action) {
  const { filter, sortBy = 'CREATED_AT', searchTerm } = action
  const { sort, count } = yield select(getSavedPageInfo)
  const type = searchTerm ? ITEMS_SAVED_SEARCH_REQUEST : ITEMS_SAVED_REQUEST
  yield put({ type, filters: { filter, sort: { ...sort, sortBy }, count, searchTerm } })
}
