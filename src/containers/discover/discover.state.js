import { takeLatest, put, takeEvery } from 'redux-saga/effects'
import { getDiscoverFeed } from 'common/api/discover'
import { getItemSaveAnalytics } from './discover.analytics'
import { deriveItemData } from 'connectors/items/items.state'
import { arrayToObject } from 'common/utilities'

import { DISCOVER_DATA_REQUEST } from 'actions'
import { DISCOVER_DATA_SUCCESS } from 'actions'
import { DISCOVER_DATA_FAILURE } from 'actions'
import { DISCOVER_HYDRATE } from 'actions'
import { DISCOVER_SAVE_REQUEST } from 'actions'
import { DISCOVER_UNSAVE_REQUEST } from 'actions'

import { ITEMS_SAVE_REQUEST } from 'actions'
import { ITEMS_UNSAVE_REQUEST } from 'actions'

import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getDiscoverData = () => ({ type: DISCOVER_DATA_REQUEST })
export const hydrateDiscover = (hydrated) => ({ type: DISCOVER_HYDRATE, hydrated }) //prettier-ignore
export const saveDiscoverItem = (id, url, position) => ({type: DISCOVER_SAVE_REQUEST, id, url, position}) //prettier-ignore
export const unSaveDiscoverItem = (id) => ({ type: DISCOVER_UNSAVE_REQUEST, id }) //prettier-ignore

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = { items: [] }

export const discoverReducers = (state = initialState, action) => {
  switch (action.type) {
    case DISCOVER_DATA_SUCCESS: {
      const { items, itemsById } = action
      return { ...state, items, itemsById }
    }

    case DISCOVER_DATA_FAILURE: {
      const { error } = action
      return { ...state, error }
    }

    case DISCOVER_HYDRATE: {
      const { hydrated } = action
      return { ...state, ...hydrated }
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE:
      const { discover } = action.payload
      return { ...state, ...discover }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const discoverSagas = [
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
  const analytics = getItemSaveAnalytics(position)
  yield put({ type: ITEMS_SAVE_REQUEST, id, url, analytics })
}

// This is only here to keep a consistent chain for item actions
function* discoverUnSaveRequest(action) {
  const { id } = action
  yield put({ type: ITEMS_UNSAVE_REQUEST, id })
}

/** ASYNC Functions
 --------------------------------------------------------------- */

/**
 * fetchDiscoverData
 * Make and async request for a Pocket v3 feed and return best data
 * @return items {array} An array of derived items
 */
export async function fetchDiscoverData() {
  try {
    const response = await getDiscoverFeed()
    const derivedItems = await deriveItemData(response.feed)

    const items = derivedItems.map((item) => item.resolved_id)
    const itemsById = arrayToObject(derivedItems, 'resolved_id')

    return { items, itemsById }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.log('discover.state', error)
  }
}
