import { takeLatest, put, select } from 'redux-saga/effects'
import { getMyList } from 'common/api/my-list'
import { deriveMyListItems } from 'connectors/items-by-id/my-list/items.derive'
import { arrayToObject } from 'common/utilities'

import { reconcileItemsArchived } from './my-list.reconcilers'
import { reconcileItemsUnArchived } from './my-list.reconcilers'
import { reconcileItemsUnFavorited } from './my-list.reconcilers'
import { reconcileItemsDeleted } from './my-list.reconcilers'

import { filterSelector } from './my-list.filters'
import { sortSelector } from './my-list.sorters'

import { MYLIST_DATA_REQUEST } from 'actions'
import { MYLIST_DATA_SUCCESS } from 'actions'
import { MYLIST_DATA_FAILURE } from 'actions'
import { MYLIST_UPDATE_REQUEST } from 'actions'
import { MYLIST_UPDATE_SUCCESS } from 'actions'
import { MYLIST_UPDATE_FAILURE } from 'actions'
import { MYLIST_HYDRATE } from 'actions'
import { MYLIST_SAVE_REQUEST } from 'actions'
import { MYLIST_UNSAVE_REQUEST } from 'actions'

import { ITEMS_ARCHIVE_REQUEST } from 'actions'
import { ITEMS_UNARCHIVE_REQUEST } from 'actions'
import { ITEMS_DELETE_SEND } from 'actions'
import { ITEMS_UNFAVORITE_REQUEST } from 'actions'
import { ITEMS_ADD_SUCCESS } from 'actions'

import { APP_SORT_ORDER_TOGGLE } from 'actions'

import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getMylistData = (count, offset, subset, filter, tag) => ({ type: MYLIST_DATA_REQUEST, count, offset, subset, filter, tag}) //prettier-ignore
export const updateMyListData = (since, subset, filter, tag) => ({ type: MYLIST_UPDATE_REQUEST, since, subset, filter, tag}) //prettier-ignore
export const hydrateMylist = (hydrated) => ({ type: MYLIST_HYDRATE, hydrated }) //prettier-ignore
export const saveMylistItem = (id, url, position) => ({type: MYLIST_SAVE_REQUEST, id, url, position}) //prettier-ignore
export const unSaveMylistItem = (id) => ({ type: MYLIST_UNSAVE_REQUEST, id }) //prettier-ignore

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
  videosfavoritesTotal: false
}

export const myListReducers = (state = initialState, action) => {
  switch (action.type) {
    case MYLIST_DATA_SUCCESS: {
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

    case MYLIST_UPDATE_SUCCESS: {
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

    case MYLIST_DATA_FAILURE: {
      const { error } = action
      return { ...state, error }
    }

    case MYLIST_HYDRATE: {
      const { hydrated } = action
      return { ...state, ...hydrated }
    }

    case ITEMS_ADD_SUCCESS: {
      return { ...state, listState: 'dirty' }
    }

    case APP_SORT_ORDER_TOGGLE: {
      return initialState
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE:
      const { mylist } = action.payload
      return { ...state, ...mylist }

    // Reconcilers
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

    case ITEMS_DELETE_SEND: {
      const { items } = action
      return reconcileItemsDeleted(items, state)
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const myListSagas = [
  takeLatest(MYLIST_DATA_REQUEST, myListDataRequest),
  takeLatest(MYLIST_UPDATE_REQUEST, myListUpdate)
  // takeEvery(MYLIST_DATA_SUCCESS, mylistSaveRequest),
  // takeEvery(MYLIST_DATA_FAILURE, mylistUnSaveRequest)
]

/** SAGA :: SELECTORS
 --------------------------------------------------------------- */
const getSortOrder = (state) => state.app.sortOrder
const getMyListItemsById = (state) => state.myListItemsById

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */

function* myListDataRequest(action) {
  try {
    const { count = 15, offset = 0, subset = 'active', tag, filter } = action

    const parameters = {}
    const sortOrder = yield select(getSortOrder)

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

    const { itemsById, total, since, error } = yield fetchMyListData({
      count,
      offset,
      sort: sortOrder,
      ...parameters
    })

    if (error) return yield put({ type: MYLIST_DATA_FAILURE, error })

    const existingItemsById = yield select(getMyListItemsById)
    const itemsByIdDraft = { ...existingItemsById, ...itemsById }

    const filterFunction = filterSelector(subset, filter)

    const sortFunction = sortSelector(subset, sortOrder) //TODO: hook this to selector
    const items = Object.values(itemsByIdDraft)
      .filter((item) => filterFunction(item, tag))
      .sort(sortFunction)
      .map((item) => item.item_id)

    const newOffset = offset + Object.keys(itemsById).length

    yield put({
      type: MYLIST_DATA_SUCCESS,
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
    console.log(error)
    yield put({ type: MYLIST_DATA_FAILURE, error })
  }
}

function* myListUpdate(action) {
  try {
    const { since, subset = 'active', filter, tag } = action
    const sortOrder = yield select(getSortOrder)

    const data = yield fetchMyListUpdate({ since })

    // No updates so simply return
    if (data.total === 0) return

    // If anything has changed, update the item store
    const { updatedItemsById, itemsToDelete, updatedSince } = data
    const existingItemsById = yield select(getMyListItemsById)

    //Remove all items to delete
    itemsToDelete.forEach((id) => delete existingItemsById[id])

    // Update all items in need of update
    const itemsById = { ...existingItemsById, ...updatedItemsById }

    const filterFunction = filterSelector(subset)
    const sortFunction = sortSelector(subset, sortOrder) //TODO: hook this to selector
    const items = Object.values(itemsById)
      .filter((item) => filterFunction(item, tag))
      .sort(sortFunction)
      .map((item) => item.item_id)

    // Update our item store
    yield put({
      type: MYLIST_UPDATE_SUCCESS,
      items,
      itemsById,
      subset,
      filter,
      tag,
      since: updatedSince
    })
  } catch (error) {
    console.log(error)
    yield put({ type: MYLIST_UPDATE_FAILURE, error })
  }
}

/** ASYNC Functions
 --------------------------------------------------------------- */

/**
 * fetchDiscoverData
 * Make wand async request for a Pocket v3 feed and return best data
 * @return items {array} An array of derived items
 */
export async function fetchMyListData(params) {
  try {
    const response = await getMyList(params)
    if (!response.list) return { error: 'No Items Returned' }

    const total = response.total
    const since = response.since

    const derivedItems = await deriveMyListItems(Object.values(response.list))
    const itemsById = arrayToObject(derivedItems, 'item_id')

    return { itemsById, total, since }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.log('discover.state', error)
  }
}

export async function fetchMyListUpdate(params) {
  try {
    const response = await getMyList(params)
    const { status, total, since, list } = response

    // If no changes have happened just return that
    if (status === 2) return { total: 0 }

    // Find all items that have been deleted
    const itemsToDelete = Object.values(list)
      .filter((item) => item.status === '2')
      .map((item) => item.item_id)

    const itemsToUpdate = Object.values(list)
    const derivedItems = await deriveMyListItems(itemsToUpdate)
    const updatedItemsById = arrayToObject(derivedItems, 'item_id')

    return { updatedItemsById, itemsToDelete, total, updatedSince: since }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.log('discover.state', error)
  }
}
