import { put, takeEvery } from 'redux-saga/effects'

import { saveItem as saveItemAPI } from 'common/api/_legacy/saveItem'
import { removeItem as removeItemAPI } from 'common/api/_legacy/removeItem'

import { HOME_LINEUP_SUCCESS } from 'actions'
import { HOME_SAVE_REQUEST } from 'actions'
import { HOME_SAVE_SUCCESS } from 'actions'
import { HOME_SAVE_FAILURE } from 'actions'
import { HOME_UNSAVE_REQUEST } from 'actions'
import { HOME_UNSAVE_SUCCESS } from 'actions'
import { HOME_UNSAVE_FAILURE } from 'actions'
import { GET_STARTED_HOME_BLOCK } from 'actions'
/** ACTIONS
 --------------------------------------------------------------- */

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {}

export const homeItemsReducers = (state = initialState, action) => {
  switch (action.type) {
    case HOME_LINEUP_SUCCESS:
    case GET_STARTED_HOME_BLOCK: {
      const { itemsById } = action
      return { ...state, ...itemsById }
    }

    case HOME_SAVE_REQUEST: {
      const { id } = action
      return updateSaveStatus(state, id, 'saving')
    }

    case HOME_SAVE_SUCCESS: {
      const { id } = action
      return updateSaveStatus(state, id, 'saved')
    }

    case HOME_SAVE_FAILURE: {
      const { id } = action
      return updateSaveStatus(state, id, 'unsaved')
    }

    case HOME_UNSAVE_SUCCESS: {
      const { id } = action
      return updateSaveStatus(state, id, 'unsaved')
    }

    case HOME_UNSAVE_FAILURE: {
      const { id } = action
      return updateSaveStatus(state, id, 'saved')
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
export const homeItemsSagas = [
  takeEvery(HOME_SAVE_REQUEST, itemsSaveRequest),
  takeEvery(HOME_UNSAVE_REQUEST, itemsUnSaveRequest)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */

function* itemsSaveRequest(action) {
  try {
    const { url, id, analytics } = action

    const response = yield saveItemAPI(url, analytics)
    if (response?.status !== 1) throw new Error('Unable to save')

    yield put({ type: HOME_SAVE_SUCCESS, id })
  } catch (error) {
    yield put({ type: HOME_SAVE_FAILURE, error })
  }
}

function* itemsUnSaveRequest(action) {
  try {
    const { id } = action

    const response = yield removeItemAPI(id)
    if (response?.status !== 1) throw new Error('Unable to remove item')

    yield put({ type: HOME_UNSAVE_SUCCESS, id })
  } catch (error) {
    yield put({ type: HOME_UNSAVE_FAILURE, error })
  }
}
