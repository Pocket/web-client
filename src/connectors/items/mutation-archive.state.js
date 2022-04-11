import { put, call, takeEvery } from 'redux-saga/effects'
import { itemArchive } from 'common/api'
import { itemUnArchive } from 'common/api'

import { MUTATION_ARCHIVE } from 'actions'
import { MUTATION_UNARCHIVE } from 'actions'
import { MUTATION_SUCCESS } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const mutationArchive = (itemId) => ({ type: MUTATION_ARCHIVE, itemId })
export const mutationUnArchive = (itemId) => ({ type: MUTATION_UNARCHIVE, itemId })

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const mutationArchiveSagas = [
  takeEvery(MUTATION_ARCHIVE, savedItemArchive),
  takeEvery(MUTATION_UNARCHIVE, savedItemUnArchive)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */

function* savedItemArchive(action) {
  const { itemId } = action
  const node = yield call(itemArchive, itemId)
  return yield put({ type: MUTATION_SUCCESS, node, id: node.id })
}

function* savedItemUnArchive(action) {
  const { itemId } = action
  const node = yield call(itemUnArchive, itemId)
  return yield put({ type: MUTATION_SUCCESS, node, id: node.id })
}
