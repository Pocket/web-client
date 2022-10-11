import { put, take, call, takeLatest, race } from 'redux-saga/effects'
import { sendItemActions } from 'common/api/_legacy/item-actions'
import { buildActions } from 'connectors/items-by-id/saves/build-actions'
import { batchSendActions } from 'connectors/items-by-id/saves/build-actions'

import { ITEMS_ARCHIVE_REQUEST } from 'actions'
import { ITEMS_ARCHIVE_BATCH } from 'actions'
import { ITEMS_ARCHIVE_SUCCESS } from 'actions'
import { ITEMS_ARCHIVE_FAILURE } from 'actions'

import { ITEMS_UNARCHIVE_REQUEST } from 'actions'
import { ITEMS_UNARCHIVE_BATCH } from 'actions'
import { ITEMS_UNARCHIVE_SUCCESS } from 'actions'
import { ITEMS_UNARCHIVE_FAILURE } from 'actions'

import { ITEMS_ARCHIVE_CONFIRM } from 'actions'
import { ITEMS_ARCHIVE_CANCEL } from 'actions'

import { API_ACTION_ARCHIVE } from 'common/constants'
import { API_ACTION_UNARCHIVE } from 'common/constants'

/** ACTIONS
 --------------------------------------------------------------- */
export const itemsArchiveAction = (items) => ({ type: ITEMS_ARCHIVE_REQUEST, items }) //prettier-ignore
export const itemsArchiveBatch = (items) => ({ type: ITEMS_ARCHIVE_BATCH, items}) //prettier-ignore
export const itemsUnArchiveAction = (items) => ({type: ITEMS_UNARCHIVE_REQUEST, items }) // prettier-ignore
export const itemsUnarchiveBatch = (items) => ({ type: ITEMS_UNARCHIVE_BATCH, items}) //prettier-ignore
export const itemsArchiveConfirm = () => ({ type: ITEMS_ARCHIVE_CONFIRM })
export const itemsArchiveCancel = () => ({ type: ITEMS_ARCHIVE_CANCEL })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = []

export const itemArchiveReducers = (state = initialState, action) => {
  switch (action.type) {
    case ITEMS_UNARCHIVE_BATCH:
    case ITEMS_ARCHIVE_BATCH: {
      const { items } = action
      if (items.length <= 1) return state
      return [...items]
    }

    case ITEMS_ARCHIVE_SUCCESS:
    case ITEMS_UNARCHIVE_SUCCESS:
    case ITEMS_ARCHIVE_FAILURE:
    case ITEMS_UNARCHIVE_FAILURE:
    case ITEMS_ARCHIVE_CANCEL: {
      return []
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const itemArchiveSagas = [
  takeLatest(ITEMS_ARCHIVE_REQUEST, itemsArchive),
  takeLatest(ITEMS_ARCHIVE_BATCH, itemsArchive),
  takeLatest(ITEMS_UNARCHIVE_REQUEST, itemsUnArchive),
  takeLatest(ITEMS_UNARCHIVE_BATCH, itemsUnArchive)
]

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* itemsArchive({ items }) {
  // Send all actions below a certain threshold
  if (items.length === 1) {
    const actions = buildActions(items, API_ACTION_ARCHIVE)
    const data = yield call(sendItemActions, actions)

    if (data) return yield put({ type: ITEMS_ARCHIVE_SUCCESS, actions })
  }

  // Batch larger item counts
  // Wait for the user to confirm or cancel
  const { cancel } = yield race({
    confirm: take(ITEMS_ARCHIVE_CONFIRM),
    cancel: take(ITEMS_ARCHIVE_CANCEL)
  })

  // If the user manually cancels
  if (cancel) return

  // Build and send batched actions
  const batchActions = yield batchSendActions(items, API_ACTION_ARCHIVE)

  // If batch is successful
  if (batchActions.length) {
    return yield put({ type: ITEMS_ARCHIVE_SUCCESS, actions: batchActions })
  }

  // If there is a failure
  return yield put({ type: ITEMS_ARCHIVE_FAILURE, items })
}

function* itemsUnArchive({ items }) {
  // Send all actions below a certain threshold
  if (items.length === 1) {
    const actions = buildActions(items, API_ACTION_UNARCHIVE)
    const data = yield call(sendItemActions, actions)

    if (data) return yield put({ type: ITEMS_UNARCHIVE_SUCCESS, data, actions })
  }

  // Batch larger item counts
  // Wait for the user to confirm or cancel
  const { cancel } = yield race({
    confirm: take(ITEMS_ARCHIVE_CONFIRM),
    cancel: take(ITEMS_ARCHIVE_CANCEL)
  })

  // If the user manually cancels
  if (cancel) return

  // Build and send batched actions
  const batchActions = yield batchSendActions(items, API_ACTION_UNARCHIVE)

  // If batch is successful
  if (batchActions.length) {
    return yield put({ type: ITEMS_UNARCHIVE_SUCCESS, actions: batchActions })
  }

  return yield put({ type: ITEMS_UNARCHIVE_FAILURE, items })
}
