import { put, call, takeLatest, take, race } from 'redux-saga/effects'
import { sendItemActions } from 'common/api/_legacy/item-actions'
import { buildActions } from 'connectors/items-by-id/my-list/build-actions'
import { batchSendActions } from 'connectors/items-by-id/my-list/build-actions'

import { ITEMS_DELETE_REQUEST } from 'actions'
import { ITEMS_DELETE_CONFIRM } from 'actions'
import { ITEMS_DELETE_SEND } from 'actions'
import { ITEMS_DELETE_CANCEL } from 'actions'
import { ITEMS_DELETE_SUCCESS } from 'actions'
import { ITEMS_DELETE_FAILURE } from 'actions'

import { API_ACTION_DELETE } from 'common/constants'

/** ACTIONS
 --------------------------------------------------------------- */
export const itemsDeleteAction = (items) => ({ type: ITEMS_DELETE_REQUEST, items }) //prettier-ignore
export const itemsDeleteConfirm = () => ({ type: ITEMS_DELETE_CONFIRM })
export const itemsDeleteCancel = () => ({ type: ITEMS_DELETE_CANCEL })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = []

export const itemDeleteReducers = (state = initialState, action) => {
  switch (action.type) {
    case ITEMS_DELETE_REQUEST: {
      const { items } = action
      return [...items]
    }

    case ITEMS_DELETE_FAILURE:
    case ITEMS_DELETE_SEND:
    case ITEMS_DELETE_CANCEL:
    case ITEMS_DELETE_SUCCESS: {
      return []
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const itemDeleteSagas = [takeLatest(ITEMS_DELETE_REQUEST, itemsDelete)]

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* itemsDelete({ items }) {
  // Wait for the user to confirm or cancel
  const { cancel } = yield race({
    confirm: take(ITEMS_DELETE_CONFIRM),
    cancel: take(ITEMS_DELETE_CANCEL)
  })

  if (cancel) return

  // Send all actions below a certain threshold
  if (items.length === 1) {
    // This trigger optimistic reconciliation of the list
    yield put({ type: ITEMS_DELETE_SEND, items })

    const actions = buildActions(items, API_ACTION_DELETE)
    const data = yield call(sendItemActions, actions)

    if (data) return yield put({ type: ITEMS_DELETE_SUCCESS, data, actions })
    return yield put({ type: ITEMS_DELETE_FAILURE, items })
  }

  // Build and send batched actions
  const batchActions = yield batchSendActions(items, API_ACTION_DELETE)

  // If batch is successful
  if (batchActions.length) {
    return yield put({ type: ITEMS_DELETE_SUCCESS, actions: batchActions })
  }

  // If there is a failure
  return yield put({ type: ITEMS_DELETE_FAILURE, items })
}
