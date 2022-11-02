import { takeLatest, put, select } from 'redux-saga/effects'
import { getSaves } from 'common/api/saves'
import { searchSaves } from 'common/api/saves'
import { deriveListItem } from 'common/api/derivers/item'
import { arrayToObject } from 'common/utilities'

import { reconcileItemsBatch } from './saves.reconcilers'
import { reconcileItemsArchived } from './saves.reconcilers'
import { reconcileItemsUnArchived } from './saves.reconcilers'
import { reconcileItemsUnFavorited } from './saves.reconcilers'
import { reconcileItemsDeleted } from './saves.reconcilers'

import { filterSelector } from './saves.filters'
import { sortSelector } from './saves.sorters'

import { SAVES_DATA_REQUEST } from 'actions'
import { SAVES_DATA_SUCCESS } from 'actions'
import { SAVES_DATA_FAILURE } from 'actions'
import { SAVES_UPDATE_REQUEST } from 'actions'
import { SAVES_UPDATE_SUCCESS } from 'actions'
import { SAVES_UPDATE_FAILURE } from 'actions'
import { SAVES_HYDRATE } from 'actions'
import { SAVES_SAVE_REQUEST } from 'actions'
import { SAVES_UNSAVE_REQUEST } from 'actions'

import { ITEMS_ARCHIVE_SUCCESS } from 'actions'
import { ITEMS_ARCHIVE_REQUEST } from 'actions'
import { ITEMS_UNARCHIVE_SUCCESS } from 'actions'
import { ITEMS_UNARCHIVE_REQUEST } from 'actions'
import { ITEMS_DELETE_SEND } from 'actions'
import { ITEMS_DELETE_SUCCESS } from 'actions'
import { ITEMS_UNFAVORITE_REQUEST } from 'actions'
import { ITEMS_ADD_SUCCESS } from 'actions'
import { ITEMS_TAG_SUCCESS } from 'actions'

import { SAVES_SEARCH_REQUEST } from 'actions'
import { SAVES_SEARCH_CLEAR } from 'actions'
import { SAVES_SEARCH_SUCCESS } from 'actions'
import { SAVES_SEARCH_FAILURE } from 'actions'

import { APP_SET_MODE } from 'actions'

import { APP_SORT_ORDER_OLD } from 'actions'
import { APP_SORT_ORDER_NEW } from 'actions'
import { APP_SORT_ORDER_RELEVANCE } from 'actions'

import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getSavesData = (count, offset, subset, filter, tag) => ({ type: SAVES_DATA_REQUEST, count, offset, subset, filter, tag}) //prettier-ignore
export const updateSavesData = (since, subset, filter, tag) => ({ type: SAVES_UPDATE_REQUEST, since, subset, filter, tag}) //prettier-ignore
export const hydrateSaves = (hydrated) => ({ type: SAVES_HYDRATE, hydrated }) //prettier-ignore
export const saveSavesItem = (id, url, position) => ({type: SAVES_SAVE_REQUEST, id, url, position}) //prettier-ignore
export const unSaveSavesItem = (id) => ({ type: SAVES_UNSAVE_REQUEST, id }) //prettier-ignore
export const getSavesSearchData = (filter, query, offset) => ({ type: SAVES_SEARCH_REQUEST, filter, query, offset }) //prettier-ignore

/** REDUCERS
 --------------------------------------------------------------- */
// NOTE: We are keeping this list very flat at the moment due to the fact that
// we don't have a guarantee that all data will be accounted for when we are
// deriving state.  Ex: If I have an active list and I filter by favorites,
// some of my favorites may not have been fetched from the server yet so the
// derived data would be incomplete.  The best way to approach this is to fetch
// the whole list and derive data that way, but that will require a larger effort
// to support something like indexDB (which I want to do)
const initialState = {
  listState: 'clean',

  // State for active list items
  unread: [],
  unreadOffset: 0,
  unreadSince: 0,
  unreadTotal: false,

  // State for archive list items
  archive: [],
  archiveOffset: 0,
  archiveSince: 0,
  archiveTotal: false,

  // State for favorites and favorite filters
  favorites: [],
  favoritesOffset: 0,
  favoritesSince: 0,
  favoritesTotal: false,

  favoritesunread: [],
  favoritesunreadOffset: 0,
  favoritesunreadSince: 0,
  favoritesunreadTotal: false,

  favoritesarchive: [],
  favoritesarchiveOffset: 0,
  favoritesarchiveSince: 0,
  favoritesarchiveTotal: false,

  // State for highlights and highlight filters
  highlights: [],
  highlightsSince: 0,
  highlightsOffset: 0,
  highlightsTotal: false,

  highlightsunread: [],
  highlightsunreadOffset: 0,
  highlightsunreadSince: 0,
  highlightsunreadTotal: false,

  highlightsarchive: [],
  highlightsarchiveOffset: 0,
  highlightsarchiveSince: 0,
  highlightsarchiveTotal: false,

  highlightsfavorites: [],
  highlightsfavoritesOffset: 0,
  highlightsfavoritesSince: 0,
  highlightsfavoritesTotal: false,

  // State for articles and article filters
  articles: [],
  articlesOffset: 0,
  articlesSince: 0,
  articlesTotal: false,

  articlesunread: [],
  articlesunreadOffset: 0,
  articlesunreadSince: 0,
  articlesunreadTotal: false,

  articlesarchive: [],
  articlesarchiveOffset: 0,
  articlesarchiveSince: 0,
  articlesarchiveTotal: false,

  articlesfavorites: [],
  articlesfavoritesOffset: 0,
  articlesfavoritesSince: 0,
  articlesfavoritesTotal: false,

  // State for videos and video filters
  videos: [],
  videosOffset: 0,
  videosSince: 0,
  videosTotal: false,

  videosunread: [],
  videosunreadOffset: 0,
  videosunreadSince: 0,
  videosunreadTotal: false,

  videosarchive: [],
  videosarchiveOffset: 0,
  videosarchiveSince: 0,
  videosarchiveTotal: false,

  videosfavorites: [],
  videosfavoritesOffset: 0,
  videosfavoritesSince: 0,
  videosfavoritesTotal: false,

  search: [],
  searchOffset: 0,
  searchSince: 0,
  searchTotal: false,

  searchunread: [],
  searchunreadOffset: 0,
  searchunreadSince: 0,
  searchunreadTotal: false,

  searcharchive: [],
  searcharchiveOffset: 0,
  searcharchiveSince: 0,
  searcharchiveTotal: false,

  searchfavorites: [],
  searchfavoritesOffset: 0,
  searchfavoritesSince: 0,
  searchfavoritesTotal: false
}

export const savesReducers = (state = initialState, action) => {
  switch (action.type) {
    case SAVES_DATA_SUCCESS: {
      const { items, offset, subset, total, filter, since, tag } = action
      const selector = tag ? tag : subset

      const section = filter ? selector + filter : selector

      return {
        ...state,
        [section]: items,
        [`${section}Offset`]: offset,
        [`${section}Since`]: since,
        [`${section}Total`]: parseInt(total, 10)
      }
    }

    case SAVES_UPDATE_SUCCESS: {
      const { items, subset, filter, since, tag } = action
      const selector = tag ? tag : subset
      const section = filter ? selector + filter : selector
      return {
        ...state,
        listState: 'clean',
        [section]: items,
        [`${section}Offset`]: items.length,
        [`${section}Since`]: since
      }
    }

    case SAVES_DATA_FAILURE: {
      const { error } = action
      return { ...state, error }
    }

    case SAVES_HYDRATE: {
      const { hydrated } = action
      return { ...state, ...hydrated }
    }

    case ITEMS_TAG_SUCCESS:
    case ITEMS_ADD_SUCCESS: {
      return { ...state, listState: 'dirty' }
    }

    case APP_SORT_ORDER_OLD:
    case APP_SORT_ORDER_NEW:
    case APP_SORT_ORDER_RELEVANCE: {
      return initialState
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE: {
      const { saves } = action.payload
      return { ...state, ...saves }
    }
    // Reconcilers
    case ITEMS_ARCHIVE_SUCCESS:
    case ITEMS_UNARCHIVE_SUCCESS: {
      const { actions } = action
      // If they took a single action it is handled optimistically
      if (actions.length <= 0) return state

      // If they batched things we handle it post response
      return reconcileItemsBatch(actions, state)
    }

    case ITEMS_ARCHIVE_REQUEST: {
      const { items } = action
      return reconcileItemsArchived(items, state)
    }

    case ITEMS_UNARCHIVE_REQUEST: {
      const { items } = action
      return reconcileItemsUnArchived(items, state)
    }

    case ITEMS_UNFAVORITE_REQUEST: {
      const { items } = action
      return reconcileItemsUnFavorited(items, state)
    }

    case ITEMS_DELETE_SUCCESS: {
      const { actions } = action
      // If they took a single action it is handled optimistically
      if (actions.length <= 0) return state

      // If they batched things we handle it post response
      return reconcileItemsBatch(actions, state)
    }

    case ITEMS_DELETE_SEND: {
      const { items } = action
      return reconcileItemsDeleted(items, state)
    }

    case SAVES_SEARCH_CLEAR: {
      const { query } = action
      return {
        ...state,
        query,
        search: [],
        searchOffset: 0,
        searchSince: 0,
        searchTotal: false,

        searchunread: [],
        searchunreadOffset: 0,
        searchunreadSince: 0,
        searchunreadTotal: false,

        searcharchive: [],
        searcharchiveOffset: 0,
        searcharchiveSince: 0,
        searcharchiveTotal: false,

        searchfavorites: [],
        searchfavoritesOffset: 0,
        searchfavoritesSince: 0,
        searchfavoritesTotal: false
      }
    }

    case SAVES_SEARCH_SUCCESS: {
      const { items, offset, total, filter, since, query } = action

      const section = filter ? 'search' + filter : 'search'

      return {
        ...state,
        query,
        [section]: items,
        [`${section}Offset`]: offset,
        [`${section}Since`]: since,
        [`${section}Total`]: parseInt(total, 10)
      }
    }

    case SAVES_SEARCH_FAILURE: {
      const { error } = action
      return { ...state, error }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const savesSagas = [
  takeLatest(SAVES_DATA_REQUEST, savesDataRequest),
  takeLatest(SAVES_UPDATE_REQUEST, savesUpdate),
  takeLatest(SAVES_SEARCH_REQUEST, savesSearchRequest)
  // takeEvery(SAVES_DATA_SUCCESS, savesSaveRequest),
  // takeEvery(SAVES_DATA_FAILURE, savesUnSaveRequest)
]

/** SAGA :: SELECTORS
 --------------------------------------------------------------- */
const getSortOptionsBySubset = (state, subset) => state.app.sortOptions[subset] || 'newest'
const getSavesItemsById = (state) => state.savesItemsById
const getState = (state) => state.saves || {}
const getSubset = (state) => state.app.section
const getQuery = (state) => state.saves.query || ''

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */

function* savesDataRequest(action) {
  try {
    const { count = 15, offset = 0, subset = 'active', tag, filter } = action

    const parameters = {}
    const sortSubset = yield select(getSubset)
    const sortOrder = yield select(getSortOptionsBySubset, sortSubset)

    // Set appropriate subset
    if (subset === 'unread') parameters.state = 'unread'
    if (subset === 'archive') parameters.state = 'read'
    if (subset === 'favorites') parameters.favorite = 1
    if (subset === 'highlights') parameters.hasAnnotations = 1
    if (subset === 'articles') parameters.contentType = 'article'
    if (subset === 'videos') parameters.contentType = 'video'
    if (subset === 'tag') parameters.tag = tag

    // Apply filters
    if (filter === 'active') parameters.state = 'unread'
    if (filter === 'archive') parameters.state = 'read'
    if (filter === 'favorites') parameters.favorite = 1

    const { itemsById, total, since, error } = yield fetchSavesData({
      count,
      offset,
      sort: sortOrder,
      ...parameters
    })

    if (error) return yield put({ type: SAVES_DATA_FAILURE, error })

    const existingItemsById = yield select(getSavesItemsById)
    const itemsByIdDraft = { ...existingItemsById, ...itemsById }

    const filterFunction = filterSelector(subset, filter)

    const sortFunction = sortSelector(subset, sortOrder) //TODO: hook this to selector
    const items = Object.values(itemsByIdDraft)
      .filter((item) => filterFunction(item, tag))
      .sort(sortFunction)
      .map((item) => item.itemId)

    const newOffset = offset + Object.keys(itemsById).length

    yield put({
      type: SAVES_DATA_SUCCESS,
      items,
      itemsById,
      offset: newOffset,
      subset,
      filter,
      tag,
      total,
      since
    })
  } catch (error) {
    console.warn(error)
    yield put({ type: SAVES_DATA_FAILURE, error })
  }
}

function* savesUpdate(action) {
  try {
    const { since, subset = 'active', filter, tag } = action
    if (!since) return

    const sortSubset = yield select(getSubset)
    const sortOrder = yield select(getSortOptionsBySubset, sortSubset)

    const data = yield fetchSavesUpdate({ since })

    // No updates so simply return
    if (data.total === 0) return

    // If anything has changed, update the item store
    const { updatedItemsById, itemsToDelete, updatedSince } = data
    const existingItemsById = yield select(getSavesItemsById)

    //Remove all items to delete
    itemsToDelete.forEach((id) => delete existingItemsById[id])

    // Update all items in need of update
    const itemsById = { ...existingItemsById, ...updatedItemsById }

    const filterFunction = filterSelector(subset, filter)
    const sortFunction = sortSelector(subset, sortOrder) //TODO: hook this to selector
    const items = Object.values(itemsById)
      .filter((item) => filterFunction(item, tag))
      .sort(sortFunction)
      .map((item) => item.itemId)

    // Update our item store
    yield put({
      type: SAVES_UPDATE_SUCCESS,
      items,
      itemsById,
      subset,
      filter,
      tag,
      since: updatedSince
    })
  } catch (error) {
    console.warn(error)
    yield put({ type: SAVES_UPDATE_FAILURE, error })
  }
}

function* savesSearchRequest(action) {
  yield put({ type: APP_SET_MODE, mode: 'default' })

  try {
    const { filter, query, offset = 0 } = action
    const section = filter ? 'search' + filter : 'search'

    const parameters = { search: query }
    const sortOrder = yield select(getSortOptionsBySubset, 'search')
    const savedQuery = yield select(getQuery)

    // Apply filters
    if (filter === 'unread') parameters.state = 'unread'
    if (filter === 'archive') parameters.state = 'read'
    if (filter === 'favorites') parameters.favorite = 1

    // If queries don't match, it's fresh so reset search
    if (query !== savedQuery) yield put({ type: SAVES_SEARCH_CLEAR, query })

    const {
      itemsById,
      total = 0,
      since,
      error
    } = yield fetchSavesSearch({
      locale_lang: 'en-US',
      state: 'all',
      count: 100,
      offset,
      sort: sortOrder,
      ...parameters
    })

    if (error) return yield put({ type: SAVES_SEARCH_FAILURE, error })

    const searchState = yield select(getState)
    const currentItems = searchState[section]

    const newItemIds = Object.values(itemsById).map((item) => item.itemId)

    const items =
      searchState.query !== query
        ? Array.from(new Set([...newItemIds]))
        : Array.from(new Set([...currentItems, ...newItemIds]))

    const newOffset = items.length

    yield put({
      type: SAVES_SEARCH_SUCCESS,
      items,
      itemsById,
      subset: 'search',
      filter,
      total,
      query,
      offset: newOffset,
      since
    })
  } catch (error) {
    console.warn(error)
    yield put({ type: SAVES_SEARCH_FAILURE, error })
  }
}

/** ASYNC Functions
 --------------------------------------------------------------- */

/**
 * fetchDiscoverData
 * Make wand async request for a Pocket v3 feed and return best data
 * @return items {array} An array of derived items
 */
export async function fetchSavesData(params) {
  try {
    const response = await getSaves(params)
    if (!response.list) return { error: 'No Items Returned' }

    const total = response.total
    const since = response.since

    const derivedItems = Object.values(response.list).map((item) => deriveListItem(item, true))
    const itemsById = arrayToObject(derivedItems, 'itemId')

    return { itemsById, total, since }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.warn('saves.state', error)
  }
}

export async function fetchSavesUpdate(params) {
  try {
    const response = await getSaves(params)
    const { status, total, since, list } = response

    // If no changes have happened just return that
    if (status === 2) return { total: 0 }

    // Find all items that have been deleted
    const itemsToDelete = Object.values(list)
      .filter((item) => item.status === '2')
      .map((item) => item.itemId)

    const itemsToUpdate = Object.values(list)
    const derivedItems = itemsToUpdate.map((item) => deriveListItem(item, true))
    const updatedItemsById = arrayToObject(derivedItems, 'itemId')

    return { updatedItemsById, itemsToDelete, total, updatedSince: since }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.warn('saves.state', error)
  }
}

/**
 * fetchDiscoverData
 * Make wand async request for a Pocket v3 feed and return best data
 * @return items {array} An array of derived items
 */
export async function fetchSavesSearch(params) {
  try {
    const response = await searchSaves(params)
    if (!response.list) return { error: 'No Items Returned' }

    const { since, search_meta, total } = response
    const computedTotal = search_meta?.total_result_count || total

    const derivedItems = Object.values(response.list).map((item) => deriveListItem(item, true))
    const itemsById = arrayToObject(derivedItems, 'itemId')

    return { itemsById, total: computedTotal, since }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.warn('saves.state', error)
  }
}
