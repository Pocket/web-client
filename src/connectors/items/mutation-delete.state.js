import { put, call, takeEvery } from 'redux-saga/effects'
import { itemDelete } from 'common/api'

import { MUTATION_DELETE } from 'actions'
import { MUTATION_DELETE_SUCCESS } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const mutationDelete = (itemId) => ({ type: MUTATION_DELETE, itemId })

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
