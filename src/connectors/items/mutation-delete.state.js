import { put, call, race, take, takeEvery, select } from 'redux-saga/effects'
import { itemDelete, bulkDelete } from 'common/api/mutations/deleteItem'
import { itemUnDelete } from 'common/api/mutations/unDeleteItem'
import { batchSendMutations } from './mutations-bulk.state'

import { ITEMS_UNDELETE_SUCCESS } from 'actions'

import { MUTATION_DELETE } from 'actions'
import { MUTATION_DELETE_SUCCESS } from 'actions'
import { MUTATION_UNDELETE } from 'actions'

import { MUTATION_BULK_DELETE } from 'actions'
import { MUTATION_BULK_CANCEL } from 'actions'
import { MUTATION_BULK_CONFIRM } from 'actions'

import { MUTATION_DELETE_CONNECTED_ITEM } from 'actions'
import { MUTATION_DELETE_CONNECTED_ITEM_CANCEL } from 'actions'
import { MUTATION_DELETE_CONNECTED_ITEM_CONFIRM } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const mutationDelete = (itemId) => ({ type: MUTATION_DELETE, itemId })
export const mutationUnDelete = (itemIds, itemPosition, previousStatus) => ({ type: MUTATION_UNDELETE, itemIds, itemPosition, previousStatus}) //prettier-ignore
export const mutationDeleteTransitionalItem = (itemId, transitionId) => ({ type: MUTATION_DELETE, itemId, transitionId }) //prettier-ignore
export const mutationBulkDelete = (itemIds) => ({ type: MUTATION_BULK_DELETE, itemIds })
export const mutationDeleteConnectedItem = (itemId) => ({ type: MUTATION_DELETE_CONNECTED_ITEM, itemId }) //prettier-ignore
export const mutationDeleteConnectedItemCancel = () => ({ type: MUTATION_DELETE_CONNECTED_ITEM_CANCEL }) //prettier-ignore
export const mutationDeleteConnectedItemConfirm = () => ({ type: MUTATION_DELETE_CONNECTED_ITEM_CONFIRM }) //prettier-ignore

/** REDUCERS
  --------------------------------------------------------------- */
const initialState = { itemIds: [], showDeleteListModal: false, showBulkDeleteModal: false }
export const mutationDeleteReducers = (state = initialState, action) => {
  switch (action.type) {
    case MUTATION_BULK_DELETE: {
      const { itemIds } = action
      return { ...state, itemIds, showBulkDeleteModal: true }
    }

    case MUTATION_DELETE_CONNECTED_ITEM: {
      const { itemId } = action
      return { ...state, itemId, showDeleteListModal: true }
    }

    case MUTATION_DELETE_CONNECTED_ITEM_CANCEL:
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
  takeEvery(MUTATION_UNDELETE, savedItemUnDelete),
  takeEvery(MUTATION_BULK_DELETE, savedItemsBulkDelete),
  takeEvery(MUTATION_DELETE_CONNECTED_ITEM, savedItemInListDelete)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getDeletedItemPosition = (state, id) => state.pageSavedIds.indexOf(id)
const getDeletedItemStatus = (state, id) => state.itemsSaved[id]?.status

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */

function* savedItemDelete(action) {
  const { itemId, transitionId } = action
  const deletedItemPosition = yield select(getDeletedItemPosition, itemId)
  const previousStatus = yield select(getDeletedItemStatus, itemId)
  const deletedId = yield call(itemDelete, itemId)
  return yield put({
    type: MUTATION_DELETE_SUCCESS,
    ids: [deletedId],
    transitionId,
    deletedItemPosition,
    previousStatus
  })
}

function* savedItemUnDelete(action) {
  const { itemIds, itemPosition, previousStatus } = action
  const itemId = itemIds[0]
  const unDeleteResponse = yield call(itemUnDelete, itemId)
  if (unDeleteResponse?.error) return //Do better here with ubiquitous error handling

  yield put({ type: ITEMS_UNDELETE_SUCCESS, itemId, itemPosition, previousStatus })
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

function* savedItemInListDelete(action) {
  const { itemId } = action

  const { cancel } = yield race({
    cancel: take(MUTATION_DELETE_CONNECTED_ITEM_CANCEL),
    confirm: take(MUTATION_DELETE_CONNECTED_ITEM_CONFIRM)
  })

  if (cancel) return

  const ids = yield call(batchSendMutations, [itemId], bulkDelete)
  return yield put({ type: MUTATION_DELETE_SUCCESS, ids })
}
