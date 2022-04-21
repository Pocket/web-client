import { put, call, takeEvery } from 'redux-saga/effects'
import { itemDelete } from 'common/api'

import { MUTATION_DELETE } from 'actions'
import { MUTATION_DELETE_SUCCESS } from 'actions'
import { MUTATION_BULK_DELETE } from 'actions'
import { MUTATION_SUCCESS } from 'actions'
import { MUTATION_BULK_CANCEL } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const mutationDelete = (itemId) => ({ type: MUTATION_DELETE, itemId })
export const mutationBulkDelete = (itemIds) => ({ type: MUTATION_BULK_DELETE, itemIds })

/** REDUCERS
  --------------------------------------------------------------- */
const initialState = { itemIds: [] }
export const mutationDeleteReducers = (state = initialState, action) => {
  switch (action.type) {
    case MUTATION_BULK_DELETE: {
      const { itemIds } = action
      return { ...state, itemIds }
    }

    case MUTATION_SUCCESS:
    case MUTATION_BULK_CANCEL: {
      return initialState
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const mutationDeleteSagas = [takeEvery(MUTATION_DELETE, savedItemDelete)]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */

function* savedItemDelete(action) {
  const { itemId } = action
  const deletedId = yield call(itemDelete, itemId)
  return yield put({ type: MUTATION_DELETE_SUCCESS, id: deletedId })
}
