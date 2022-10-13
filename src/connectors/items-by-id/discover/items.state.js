import { put, takeEvery } from 'redux-saga/effects'

import { saveItem as saveItemAPI } from 'common/api/_legacy/saveItem'
import { removeItem as removeItemAPI } from 'common/api/_legacy/removeItem'

import { DISCOVER_ITEMS_HYDRATE } from 'actions'
import { DISCOVER_ITEMS_SAVE_REQUEST } from 'actions'
import { DISCOVER_ITEMS_SAVE_SUCCESS } from 'actions'
import { DISCOVER_ITEMS_SAVE_FAILURE } from 'actions'
import { DISCOVER_ITEMS_UNSAVE_REQUEST } from 'actions'
import { DISCOVER_ITEMS_UNSAVE_SUCCESS } from 'actions'
import { DISCOVER_ITEMS_UNSAVE_FAILURE } from 'actions'
import { DISCOVER_ITEMS_NO_IMAGE } from 'actions'
import { HOME_SAVE_REQUEST } from 'actions'
import { HOME_SAVE_SUCCESS } from 'actions'
import { HOME_SAVE_FAILURE } from 'actions'
import { HOME_UNSAVE_SUCCESS } from 'actions'
import { HOME_UNSAVE_FAILURE } from 'actions'

import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const hydrateItems = (hydrated) => ({ type: DISCOVER_ITEMS_HYDRATE, hydrated }) //prettier-ignore
export const saveItem = (id, url, analytics) => ({type: DISCOVER_ITEMS_SAVE_REQUEST, id, url, analytics}) //prettier-ignore
export const unSaveItem = id => ({ type: DISCOVER_ITEMS_UNSAVE_REQUEST, id }) //prettier-ignore
export const setNoImage = (id) => ({ type: DISCOVER_ITEMS_NO_IMAGE, id })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {}

export const discoverItemsReducers = (state = initialState, action) => {
  switch (action.type) {
    case DISCOVER_ITEMS_HYDRATE: {
      const { hydrated } = action
      return { ...state, ...hydrated }
    }

    case DISCOVER_ITEMS_SAVE_REQUEST:
    case HOME_SAVE_REQUEST: {
      const { id } = action
      return updateSaveStatus(state, id, 'saving')
    }

    case DISCOVER_ITEMS_SAVE_SUCCESS:
    case HOME_SAVE_SUCCESS: {
      const { id } = action
      return updateSaveStatus(state, id, 'saved')
    }

    case DISCOVER_ITEMS_SAVE_FAILURE:
    case HOME_SAVE_FAILURE: {
      const { id } = action
      return updateSaveStatus(state, id, 'unsaved')
    }

    case DISCOVER_ITEMS_UNSAVE_SUCCESS:
    case HOME_UNSAVE_SUCCESS: {
      const { id } = action
      return updateSaveStatus(state, id, 'unsaved')
    }

    case DISCOVER_ITEMS_UNSAVE_FAILURE:
    case HOME_UNSAVE_FAILURE: {
      const { id } = action
      return updateSaveStatus(state, id, 'saved')
    }

    case DISCOVER_ITEMS_NO_IMAGE: {
      const { id } = action
      const item = state[id]
      const itemDraft = { ...item, noImage: true }
      return { ...state, [id]: itemDraft }
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE: {
      const { discoverItemsById } = action.payload
      return { ...state, ...discoverItemsById }
    }

    default:
      return state
  }
}

/** UPDATE SAVE STATUS
 * Helper function to update save status for a specific item based on id
 * @param {object} state Redux state object
 * @param {string} id Item id to operate on
 * @param {string} save_status Value to update save status to
 */
export function updateSaveStatus(state, id, saveStatus) {
  const updatedItem = { ...state[id], saveStatus }
  return { ...state, [id]: updatedItem }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const discoverItemsSagas = [
  takeEvery(DISCOVER_ITEMS_SAVE_REQUEST, itemsSaveRequest),
  takeEvery(DISCOVER_ITEMS_UNSAVE_REQUEST, itemsUnSaveRequest)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */

function* itemsSaveRequest(action) {
  try {
    const { url, id, analytics } = action

    const response = yield saveItemAPI(url, analytics)
    if (response?.status !== 1) throw new Error('Unable to save')

    yield put({ type: DISCOVER_ITEMS_SAVE_SUCCESS, id })
  } catch (error) {
    yield put({ type: DISCOVER_ITEMS_SAVE_FAILURE, error })
  }
}

function* itemsUnSaveRequest(action) {
  try {
    const { id } = action

    const response = yield removeItemAPI(id)
    if (response?.status !== 1) throw new Error('Unable to remove item')

    yield put({ type: DISCOVER_ITEMS_UNSAVE_SUCCESS, id })
  } catch (error) {
    yield put({ type: DISCOVER_ITEMS_UNSAVE_FAILURE, error })
  }
}
