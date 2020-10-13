import { takeLatest, put, takeEvery } from 'redux-saga/effects'
import { getMyList } from 'common/api/my-list'
import { getDiscoverFeed } from 'common/api/discover'
import { deriveMyListItems } from 'connectors/items-by-id/my-list/items.derive'
import { deriveDiscoverItems } from 'connectors/items-by-id/discover/items.derive'
import { arrayToObject } from 'common/utilities'

import { HOME_DATA_LATEST_REQUEST } from 'actions'
import { HOME_DATA_LATEST_SUCCESS } from 'actions'
import { HOME_DATA_LATEST_FAILURE } from 'actions'

import { HOME_DATA_DISCOVER_REQUEST } from 'actions'
import { HOME_DATA_DISCOVER_SUCCESS } from 'actions'
import { HOME_DATA_DISCOVER_FAILURE } from 'actions'

import { HOME_HYDRATE } from 'actions'
import { HOME_SAVE_REQUEST } from 'actions'
import { HOME_UNSAVE_REQUEST } from 'actions'

import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getHomeLatestData = () => ({ type: HOME_DATA_LATEST_REQUEST }) //prettier-ignore
export const getDiscoverData = () => ({ type: HOME_DATA_DISCOVER_REQUEST}) //prettier-ignore
export const hydrateHome = (hydrated) => ({ type: HOME_HYDRATE, hydrated }) //prettier-ignore
export const saveHomeItem = (id, url, position) => ({type: HOME_SAVE_REQUEST, id, url, position}) //prettier-ignore
export const unSaveHomeItem = (id) => ({ type: HOME_UNSAVE_REQUEST, id }) //prettier-ignore

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  // State for active list items
  latest: [],
  discover: [],
  topic: []
}

export const homeReducers = (state = initialState, action) => {
  switch (action.type) {
    case HOME_DATA_LATEST_SUCCESS: {
      const { items } = action
      return { ...state, latest: items }
    }
    case HOME_DATA_DISCOVER_SUCCESS: {
      const { items } = action
      return { ...state, discover: items }
    }

    case HOME_DATA_LATEST_FAILURE: {
      const { error } = action
      return { ...state, error }
    }

    case HOME_HYDRATE: {
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
export const homeSagas = [
  takeLatest(HOME_DATA_LATEST_REQUEST, latestDataRequest),
  takeLatest(HOME_DATA_DISCOVER_REQUEST, discoverDataRequest)
  // takeEvery(HOME_DATA_SUCCESS, homeSaveRequest),
  // takeEvery(HOME_DATA_FAILURE, homeUnSaveRequest)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* latestDataRequest(action) {
  try {
    const { items, itemsById, total } = yield fetchMyListData({
      count: 5,
      offset: 0,
      state: 'unread',
      sort: 'newest'
    })

    // Deriving data from the response
    yield put({ type: HOME_DATA_LATEST_SUCCESS, items, itemsById })
  } catch (error) {
    console.log(error)
    yield put({ type: HOME_DATA_LATEST_FAILURE, error })
  }
}

function* discoverDataRequest(action) {
  try {
    const { items, itemsById } = yield fetchDiscoverData()

    // Deriving data from the response
    yield put({ type: HOME_DATA_DISCOVER_SUCCESS, items, itemsById })
  } catch (error) {
    yield put({ type: HOME_DATA_DISCOVER_FAILURE, error })
  }
}

/** ASYNC Functions
 --------------------------------------------------------------- */

/**
 * fetchMyListData
 * Make and async request for a Pocket v3 feed and return best data
 * @return items {array} An array of derived items
 */
export async function fetchMyListData(params) {
  try {
    const response = await getMyList(params)
    if (!response.list) return console.log('No Items')

    const total = response.total

    const derivedItems = await deriveMyListItems(Object.values(response.list))

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

/**
 * fetchDiscoverData
 * Make and async request for a Pocket v3 feed and return best data
 * @return items {array} An array of derived items
 */
export async function fetchDiscoverData() {
  try {
    const response = await getDiscoverFeed()
    const derivedItems = await deriveDiscoverItems(response.feed)

    const items = derivedItems.map((item) => item.resolved_id)
    const itemsById = arrayToObject(derivedItems, 'resolved_id')

    return { items, itemsById }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.log('discover.state', error)
  }
}
