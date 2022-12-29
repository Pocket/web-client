import { takeLatest, put } from 'redux-saga/effects'
import { getDiscoverLineup } from 'common/api/queries/get-discover'

import { DISCOVER_DATA_REQUEST } from 'actions'
import { DISCOVER_DATA_SUCCESS } from 'actions'
import { DISCOVER_DATA_FAILURE } from 'actions'
import { DISCOVER_HYDRATE } from 'actions'
import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getDiscoverData = () => ({ type: DISCOVER_DATA_REQUEST })
export const hydrateDiscover = (itemsIds) => ({ type: DISCOVER_HYDRATE, itemsIds }) //prettier-ignore

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = []

export const pageDiscoverReducers = (state = initialState, action) => {
  switch (action.type) {
    case DISCOVER_HYDRATE:
    case DISCOVER_DATA_SUCCESS: {
      const { itemsIds } = action
      return itemsIds
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
  takeLatest(DISCOVER_DATA_REQUEST, discoverDataRequest)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* discoverDataRequest() {
  try {
    const { itemsIds, itemsById } = yield fetchDiscoverData()

    // Deriving data from the response
    yield put({ type: DISCOVER_DATA_SUCCESS, itemsIds, itemsById })
  } catch (error) {
    yield put({ type: DISCOVER_DATA_FAILURE, error })
  }
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
    const { itemsById, itemsIds } = await getDiscoverLineup({ locale })
    return { itemsIds, itemsById }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.warn('discover.state', error)
  }
}
