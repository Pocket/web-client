import { put, call, race, take, takeEvery } from 'redux-saga/effects'
import { itemDelete } from 'common/api'
import { bulkDelete } from 'common/api'
import { batchSendMutations } from './mutations-bulk.state'

import { MUTATION_DELETE } from 'actions'
import { MUTATION_DELETE_SUCCESS } from 'actions'
import { MUTATION_BULK_DELETE } from 'actions'
import { MUTATION_BULK_CANCEL } from 'actions'
import { MUTATION_BULK_CONFIRM } from 'actions'

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

    case MUTATION_DELETE_SUCCESS:
    case MUTATION_BULK_CANCEL: {
      return initialState
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const mutationDeleteSagas = [
  takeEvery(MUTATION_DELETE, savedItemDelete),
  takeEvery(MUTATION_BULK_DELETE, savedItemsBulkDelete)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */

function* savedItemDelete(action) {
  const { itemId } = action
  const deletedId = yield call(itemDelete, itemId)
  return yield put({ type: MUTATION_DELETE_SUCCESS, ids: [deletedId] })
}

function* savedItemsBulkDelete(action) {
  const { itemIds } = action
  // Wait for the user to confirm or cancel
  const { cancel } = yield race({
    confirm: take(MUTATION_BULK_CONFIRM),
    cancel: take(MUTATION_BULK_CANCEL)
  })

  // If the user manually cancels
  if (cancel) return

  // Batch and send api calls for the ids
  const ids = yield call(batchSendMutations, itemIds, bulkDelete)
  return yield put({ type: MUTATION_DELETE_SUCCESS, ids })
}
