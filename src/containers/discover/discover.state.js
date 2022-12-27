import { takeLatest, put, takeEvery } from 'redux-saga/effects'
import { getDiscoverLineup } from 'common/api/queries/get-discover'

import { DISCOVER_DATA_REQUEST } from 'actions'
import { DISCOVER_DATA_SUCCESS } from 'actions'
import { DISCOVER_DATA_FAILURE } from 'actions'
import { DISCOVER_HYDRATE } from 'actions'
import { DISCOVER_SAVE_REQUEST } from 'actions'
import { DISCOVER_UNSAVE_REQUEST } from 'actions'

import { DISCOVER_ITEMS_SAVE_REQUEST } from 'actions'
import { DISCOVER_ITEMS_UNSAVE_REQUEST } from 'actions'

import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getDiscoverData = () => ({ type: DISCOVER_DATA_REQUEST })
export const hydrateDiscover = (items) => ({ type: DISCOVER_HYDRATE, items }) //prettier-ignore
export const saveDiscoverItem = (id, url, position) => ({type: DISCOVER_SAVE_REQUEST, id, url, position}) //prettier-ignore
export const unSaveDiscoverItem = (id) => ({ type: DISCOVER_UNSAVE_REQUEST, id }) //prettier-ignore

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = []

export const pageDiscoverReducers = (state = initialState, action) => {
  switch (action.type) {
    case DISCOVER_HYDRATE:
    case DISCOVER_DATA_SUCCESS: {
      const { items } = action
      return items
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE: {
      const { pageDiscoverIds } = action.payload
      return pageDiscoverIds
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const pageDiscoverSagas = [
  takeLatest(DISCOVER_DATA_REQUEST, discoverDataRequest),
  takeEvery(DISCOVER_SAVE_REQUEST, discoverSaveRequest),
  takeEvery(DISCOVER_UNSAVE_REQUEST, discoverUnSaveRequest)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* discoverDataRequest() {
  try {
    const { items, itemsById } = yield fetchDiscoverData()

    // Deriving data from the response
    yield put({ type: DISCOVER_DATA_SUCCESS, items, itemsById })
  } catch (error) {
    yield put({ type: DISCOVER_DATA_FAILURE, error })
  }
}

// This is just a passthrough that adds analytics toe the item save request
function* discoverSaveRequest(action) {
  const { url, id, position } = action
  const analytics = {
    view: 'web',
    section: 'explore',
    page: '/explore/',
    cxt_item_position: position
  }

  yield put({ type: DISCOVER_ITEMS_SAVE_REQUEST, id, url, analytics })
}

// This is only here to keep a consistent chain for item actions
function* discoverUnSaveRequest(action) {
  const { id } = action
  yield put({ type: DISCOVER_ITEMS_UNSAVE_REQUEST, id })
}

/** ASYNC Functions
 --------------------------------------------------------------- */

/**
 * fetchDiscoverData
 * Make and async request for a Pocket v3 feed and return best data
 * @return items {array} An array of derived items
 */
export async function fetchDiscoverData({ locale }) {
  try {
    const { itemsById, items } = await getDiscoverLineup({ locale })

    return { items, itemsById }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.warn('discover.state', error)
  }
}
