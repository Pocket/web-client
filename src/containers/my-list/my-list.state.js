import { takeLatest, put, takeEvery } from 'redux-saga/effects'
import { getMyList } from 'common/api/my-list'
import { deriveItemData } from 'connectors/my-list-items/items.state'
import { arrayToObject } from 'common/utilities'

import { MYLIST_DATA_REQUEST } from 'actions'
import { MYLIST_DATA_SUCCESS } from 'actions'
import { MYLIST_DATA_FAILURE } from 'actions'
import { MYLIST_HYDRATE } from 'actions'
import { MYLIST_SAVE_REQUEST } from 'actions'
import { MYLIST_UNSAVE_REQUEST } from 'actions'

import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getMylistData = (count, offset, subset, filter, sort) => ({ type: MYLIST_DATA_REQUEST, count, offset, subset, sort, filter}) //prettier-ignore
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
  // State for active list items
  active: [],
  activeOffset: 0,
  activeTotal: false,

  // State for archive list items
  archive: [],
  archiveOffset: 0,
  archiveTotal: false,

  // State for favorites and favorite filters
  favorites: [],
  favoritesTotal: false,
  favoritesOffset: 0,

  favoritesactive: [],
  favoritesactiveOffset: 0,
  favoritesactiveTotal: false,

  favoritesarchive: [],
  favoritesarchiveOffset: 0,
  favoritesarchiveTotal: false,

  // State for highlights and highlight filters
  highlights: [],
  highlightsTotal: false,
  highlightsOffset: 0,

  highlightsactive: [],
  highlightsactiveOffset: 0,
  highlightsactiveTotal: false,

  highlightsarchive: [],
  highlightsarchiveOffset: 0,
  highlightsarchiveTotal: false,

  highlightsfavorites: [],
  highlightsfavoritesOffset: 0,
  highlightsfavoritesTotal: false,

  // State for articles and article filters
  articles: [],
  articlesTotal: false,
  articlesOffset: 0,

  articlesactive: [],
  articlesactiveOffset: 0,
  articlesactiveTotal: false,

  articlesarchive: [],
  articlesarchiveOffset: 0,
  articlesarchiveTotal: false,

  articlesfavorites: [],
  articlesfavoritesOffset: 0,
  articlesfavoritesTotal: false,

  // State for videos and video filters
  videos: [],
  videosTotal: false,
  videosOffset: 0,

  videosactive: [],
  videosactiveOffset: 0,
  videosactiveTotal: false,

  videosarchive: [],
  videosarchiveOffset: 0,
  videosarchiveTotal: false,

  videosfavorites: [],
  videosfavoritesOffset: 0,
  videosfavoritesTotal: false
}

export const myListReducers = (state = initialState, action) => {
  switch (action.type) {
    case MYLIST_DATA_SUCCESS: {
      const { items, offset, subset, total, filter } = action
      const section = filter ? subset + filter : subset
      return {
        ...state,
        [section]: [...state[section], ...items],
        [`${section}Offset`]: offset,
        [`${section}Total`]: parseInt(total, 10)
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

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE:
      const { mylist } = action.payload
      return { ...state, ...mylist }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const myListSagas = [
  takeLatest(MYLIST_DATA_REQUEST, myListDataRequest)
  // takeEvery(MYLIST_DATA_SUCCESS, mylistSaveRequest),
  // takeEvery(MYLIST_DATA_FAILURE, mylistUnSaveRequest)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* myListDataRequest(action) {
  try {
    const {
      count = 15,
      offset = 0,
      sort = 'newest',
      subset = 'active',
      filter
    } = action

    const parameters = {}

    // Set appropriate subset
    if (subset === 'archive') parameters.state = 'read'
    if (subset === 'favorites') parameters.favorite = 1
    if (subset === 'highlights') parameters.hasAnnotations = 1
    if (subset === 'articles') parameters.contentType = 'article'
    if (subset === 'videos') parameters.contentType = 'video'

    // Apply filters
    if (filter === 'active') parameters.state = 'unread'
    if (filter === 'archive') parameters.state = 'read'
    if (filter === 'favorites') parameters.favorite = 1

    const { items, itemsById, total } = yield fetchMyListData({
      count,
      offset,
      sort,
      ...parameters
    })

    const newOffset = offset + items?.length

    // Deriving data from the response
    yield put({
      type: MYLIST_DATA_SUCCESS,
      items,
      itemsById,
      offset: newOffset,
      subset,
      filter,
      total
    })
  } catch (error) {
    console.log(error)
    yield put({ type: MYLIST_DATA_FAILURE, error })
  }
}

/** ASYNC Functions
 --------------------------------------------------------------- */

/**
 * fetchDiscoverData
 * Make and async request for a Pocket v3 feed and return best data
 * @return items {array} An array of derived items
 */
export async function fetchMyListData(params) {
  try {
    const response = await getMyList(params)
    if (!response.list) return console.log('No Items')

    const total = response.total

    const derivedItems = await deriveItemData(Object.values(response.list))

    const items = derivedItems
      .sort((a, b) => a.sort_id - b.sort_id)
      .map((item) => item.resolved_id)

    const itemsById = arrayToObject(derivedItems, 'resolved_id')

    return { items, itemsById, total }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.log('discover.state', error)
  }
}
