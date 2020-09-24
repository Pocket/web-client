import { takeLatest, put, takeEvery } from 'redux-saga/effects'
import { getExploreFeed } from 'common/api/explore'
import { getItemSaveAnalytics } from './explore.analytics'
import { deriveItemData } from 'connectors/items/items.state'
import { arrayToObject } from 'common/utilities'

import { EXPLORE_DATA_REQUEST } from 'actions'
import { EXPLORE_DATA_SUCCESS } from 'actions'
import { EXPLORE_DATA_FAILURE } from 'actions'
import { EXPLORE_HYDRATE } from 'actions'
import { EXPLORE_SAVE_REQUEST } from 'actions'
import { EXPLORE_UNSAVE_REQUEST } from 'actions'
import { ITEMS_SAVE_REQUEST } from 'actions'
import { ITEMS_UNSAVE_REQUEST } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getExploreData = () => ({ type: EXPLORE_DATA_REQUEST })
export const hydrateExplore = (hydrated) => ({ type: EXPLORE_HYDRATE, hydrated }) //prettier-ignore
export const saveExploreItem = (id, url, position) => ({type: EXPLORE_SAVE_REQUEST, id, url, position}) //prettier-ignore
export const unSaveExploreItem = (id) => ({ type: EXPLORE_UNSAVE_REQUEST, id })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = { items: [], itemsById: {} }

export const exploreReducers = (state = initialState, action) => {
  switch (action.type) {
    case EXPLORE_DATA_SUCCESS: {
      const { items, itemsById } = action
      return { ...state, items, itemsById }
    }

    case EXPLORE_DATA_FAILURE: {
      const { error } = action
      return { ...state, error }
    }

    case EXPLORE_HYDRATE: {
      const { hydrated } = action
      return { ...state, ...hydrated }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const exploreSagas = [
  takeLatest(EXPLORE_DATA_REQUEST, exploreDataRequest),
  takeEvery(EXPLORE_SAVE_REQUEST, exploreSaveRequest),
  takeEvery(EXPLORE_UNSAVE_REQUEST, exploreUnSaveRequest)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* exploreDataRequest() {
  try {
    const { items, itemsById } = yield fetchExploreData()

    // Deriving data from the response
    yield put({ type: EXPLORE_DATA_SUCCESS, items, itemsById })
  } catch (error) {
    yield put({ type: EXPLORE_DATA_FAILURE, error })
  }
}

// This is just a passthrough that adds analytics toe the item save request
function* exploreSaveRequest(action) {
  const { url, id, position } = action
  const analytics = getItemSaveAnalytics(position)
  yield put({ type: ITEMS_SAVE_REQUEST, id, url, analytics })
}

// This is only here to keep a consistent chain for item actions
function* exploreUnSaveRequest(action) {
  const { id } = action
  yield put({ type: ITEMS_UNSAVE_REQUEST, id })
}

/** ASYNC Functions
 --------------------------------------------------------------- */

/**
 * fetchExploreData
 * Make and async request for a Pocket v3 feed and return best data
 * @return items {array} An array of derived items
 */
export async function fetchExploreData() {
  try {
    const response = await getExploreFeed()
    const derivedItems = await deriveItemData(response.feed)

    const items = derivedItems.map((item) => item.resolved_id)
    const itemsById = arrayToObject(derivedItems, 'resolved_id')

    return { items, itemsById }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.log('explore.state', error)
  }
}
