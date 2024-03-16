import { put, call, take, race, takeEvery } from 'redux-saga/effects'
import { itemFavorite, bulkFavorite } from 'common/api/mutations/favoriteItem'
import { itemUnFavorite, bulkUnFavorite } from 'common/api/mutations/unfavoriteItem'
import { batchSendMutations } from './mutations-bulk.state'

import { MUTATION_FAVORITE } from 'actions'
import { MUTATION_UNFAVORITE } from 'actions'
import { MUTATION_SUCCESS } from 'actions'
import { MUTATION_BULK_FAVORITE } from 'actions'
import { MUTATION_BULK_UNFAVORITE } from 'actions'
import { MUTATION_BULK_CONFIRM } from 'actions'
import { MUTATION_BULK_CANCEL } from 'actions'
import { MUTATION_BULK_BATCH_BEGIN } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const mutationFavorite = (itemId) => ({ type: MUTATION_FAVORITE, itemId })
export const mutationUnFavorite = (itemId) => ({ type: MUTATION_UNFAVORITE, itemId })
export const mutationBulkFavorite = (itemIds) => ({ type: MUTATION_BULK_FAVORITE, itemIds })
export const mutationBulkUnFavorite = (itemIds) => ({ type: MUTATION_BULK_UNFAVORITE, itemIds })

/** REDUCERS
  --------------------------------------------------------------- */
const initialState = { itemIds: [] }
export const mutationFavoriteReducers = (state = initialState, action) => {
  switch (action.type) {
    case MUTATION_BULK_FAVORITE:
    case MUTATION_BULK_UNFAVORITE: {
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
export const mutationFavoriteSagas = [
  takeEvery(MUTATION_FAVORITE, savedItemFavorite),
  takeEvery(MUTATION_UNFAVORITE, savedItemUnFavorite),
  takeEvery(MUTATION_BULK_FAVORITE, savedItemsBulkFavorite),
  takeEvery(MUTATION_BULK_UNFAVORITE, savedItemsBulkUnFavorite)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */

function* savedItemFavorite(action) {
  const { itemId, type } = action
  const node = yield call(itemFavorite, itemId)
  return yield put({ type: MUTATION_SUCCESS, nodes: [node], actionType: type, count: 1 })
}

function* savedItemUnFavorite(action) {
  const { itemId, type } = action
  const node = yield call(itemUnFavorite, itemId)
  return yield put({ type: MUTATION_SUCCESS, nodes: [node], actionType: type, count: 1 })
}

//
function* savedItemsBulkFavorite(action) {
  const { itemIds, type } = action
  // Wait for the user to confirm or cancel
  const { cancel } = yield race({
    confirm: take(MUTATION_BULK_CONFIRM),
    cancel: take(MUTATION_BULK_CANCEL)
  })

  // If the user manually cancels
  if (cancel) return

  // Batch and send api calls for the ids
  const nodes = yield call(batchSendMutations, itemIds, bulkFavorite)
  if (nodes) {
    const count = nodes.length
    return yield put({ type: MUTATION_SUCCESS, nodes, actionType: type, count })
  }
}

function* savedItemsBulkUnFavorite(action) {
  const { itemIds, type } = action
  // Wait for the user to confirm or cancel
  const { cancel } = yield race({
    confirm: take(MUTATION_BULK_CONFIRM),
    cancel: take(MUTATION_BULK_CANCEL)
  })

  // If the user manually cancels
  if (cancel) return

  // Batch and send api calls for the ids
  const nodes = yield call(batchSendMutations, itemIds, bulkUnFavorite)
  if (nodes) {
    const count = nodes.length
    return yield put({ type: MUTATION_SUCCESS, nodes, actionType: type, count })
  }
}
