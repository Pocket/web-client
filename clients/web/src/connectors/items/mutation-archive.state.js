import { put, call, race, take, takeEvery } from 'redux-saga/effects'
import { itemArchive, bulkArchive } from 'common/api/mutations/archiveItem'
import { itemUnArchive, bulkUnArchive } from 'common/api/mutations/unArchiveItem'
import { batchSendMutations } from './mutations-bulk.state'

import { MUTATION_RE_ADD } from 'actions'
import { MUTATION_ARCHIVE } from 'actions'
import { MUTATION_UNARCHIVE } from 'actions'
import { MUTATION_SUCCESS } from 'actions'
import { MUTATION_BULK_ARCHIVE } from 'actions'
import { MUTATION_BULK_UNARCHIVE } from 'actions'
import { MUTATION_BULK_CANCEL } from 'actions'
import { MUTATION_BULK_CONFIRM } from 'actions'
import { MUTATION_BULK_BATCH_BEGIN } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const mutationArchive = (itemId) => ({ type: MUTATION_ARCHIVE, itemId })
export const mutationUnArchive = (itemId) => ({ type: MUTATION_UNARCHIVE, itemId })
export const mutationReAdd = (itemId) => ({ type: MUTATION_RE_ADD, itemId })
export const mutationBulkArchive = (itemIds) => ({ type: MUTATION_BULK_ARCHIVE, itemIds })
export const mutationBulkUnArchive = (itemIds) => ({ type: MUTATION_BULK_UNARCHIVE, itemIds })

/** REDUCERS
  --------------------------------------------------------------- */
const initialState = { itemIds: [] }
export const mutationArchiveReducers = (state = { itemIds: [] }, action) => {
  switch (action.type) {
    case MUTATION_BULK_ARCHIVE:
    case MUTATION_BULK_UNARCHIVE: {
      const { itemIds } = action
      return { ...state, itemIds }
    }

    case MUTATION_SUCCESS:
    case MUTATION_BULK_CANCEL:
    case MUTATION_BULK_BATCH_BEGIN: {
      return initialState
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const mutationArchiveSagas = [
  takeEvery(MUTATION_ARCHIVE, savedItemArchive),
  takeEvery(MUTATION_UNARCHIVE, savedItemUnArchive),
  takeEvery(MUTATION_BULK_ARCHIVE, savedItemsBulkArchive),
  takeEvery(MUTATION_BULK_UNARCHIVE, savedItemsBulkUnArchive)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */

function* savedItemArchive(action) {
  const { itemId, type } = action
  const node = yield call(itemArchive, itemId)
  return yield put({ type: MUTATION_SUCCESS, nodes: [node], actionType: type, count: 1 })
}

function* savedItemUnArchive(action) {
  const { itemId, type } = action
  const node = yield call(itemUnArchive, itemId)
  return yield put({ type: MUTATION_SUCCESS, nodes: [node], actionType: type, count: 1 })
}

function* savedItemsBulkArchive(action) {
  const { itemIds, type } = action
  // Wait for the user to confirm or cancel
  const { cancel } = yield race({
    confirm: take(MUTATION_BULK_CONFIRM),
    cancel: take(MUTATION_BULK_CANCEL)
  })

  // If the user manually cancels
  if (cancel) return

  // Batch and send api calls for the ids
  const nodes = yield call(batchSendMutations, itemIds, bulkArchive)
  if (nodes) {
    const count = nodes.length
    return yield put({ type: MUTATION_SUCCESS, nodes, actionType: type, count })
  }
}

function* savedItemsBulkUnArchive(action) {
  const { itemIds, type } = action
  // Wait for the user to confirm or cancel
  const { cancel } = yield race({
    confirm: take(MUTATION_BULK_CONFIRM),
    cancel: take(MUTATION_BULK_CANCEL)
  })

  // If the user manually cancels
  if (cancel) return

  // Batch and send api calls for the ids
  const nodes = yield call(batchSendMutations, itemIds, bulkUnArchive)
  if (nodes) {
    const count = nodes.length
    return yield put({ type: MUTATION_SUCCESS, nodes, actionType: type, count })
  }
}
