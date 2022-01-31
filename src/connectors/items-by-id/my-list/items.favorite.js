import { put, call, take, takeLatest, race } from 'redux-saga/effects'
import { sendItemActions } from 'common/api/_legacy/item-actions'
import { buildActions } from 'connectors/items-by-id/my-list/build-actions'
import { batchSendActions } from 'connectors/items-by-id/my-list/build-actions'

import { ITEMS_FAVORITE_REQUEST } from 'actions'
import { ITEMS_FAVORITE_SUCCESS } from 'actions'
import { ITEMS_FAVORITE_FAILURE } from 'actions'
import { ITEMS_FAVORITE_BATCH } from 'actions'

import { ITEMS_UNFAVORITE_REQUEST } from 'actions'
import { ITEMS_UNFAVORITE_SUCCESS } from 'actions'
import { ITEMS_UNFAVORITE_FAILURE } from 'actions'
import { ITEMS_UNFAVORITE_BATCH } from 'actions'

import { ITEMS_FAVORITE_CONFIRM } from 'actions'
import { ITEMS_FAVORITE_CANCEL } from 'actions'

import { API_ACTION_FAVORITE } from 'common/constants'
import { API_ACTION_UNFAVORITE } from 'common/constants'

/** ACTIONS
 --------------------------------------------------------------- */
export const itemsFavoriteAction = (items) => ({ type: ITEMS_FAVORITE_REQUEST, items }) //prettier-ignore
export const itemsFavoriteBatch = (items) => ({ type: ITEMS_FAVORITE_BATCH, items }) //prettier-ignore
export const itemsUnFavoriteAction = (items) => ({type: ITEMS_UNFAVORITE_REQUEST, items }) // prettier-ignore
export const itemsUnFavoriteBatch = (items) => ({ type: ITEMS_UNFAVORITE_BATCH, items}) //prettier-ignore
export const itemsFavoriteConfirm = () => ({ type: ITEMS_FAVORITE_CONFIRM })
export const itemsFavoriteCancel = () => ({ type: ITEMS_FAVORITE_CANCEL })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = []

export const itemFavoriteReducers = (state = initialState, action) => {
  switch (action.type) {
    case ITEMS_UNFAVORITE_BATCH:
    case ITEMS_FAVORITE_BATCH: {
      const { items } = action
      if (items.length <= 1) return state
      return [...items]
    }

    case ITEMS_FAVORITE_SUCCESS:
    case ITEMS_UNFAVORITE_SUCCESS:
    case ITEMS_FAVORITE_FAILURE:
    case ITEMS_UNFAVORITE_FAILURE:
    case ITEMS_FAVORITE_CANCEL: {
      return []
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const itemFavoriteSagas = [
  takeLatest(ITEMS_FAVORITE_REQUEST, itemsFavorite),
  takeLatest(ITEMS_UNFAVORITE_REQUEST, itemsUnFavorite),
  takeLatest(ITEMS_FAVORITE_BATCH, itemsFavorite),
  takeLatest(ITEMS_UNFAVORITE_BATCH, itemsUnFavorite)
]

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* itemsFavorite({ items }) {
  // Send all actions below a certain threshold
  if (items.length === 1) {
    const actions = buildActions(items, API_ACTION_FAVORITE)
    const data = yield call(sendItemActions, actions)

    if (data) return yield put({ type: ITEMS_FAVORITE_SUCCESS, actions })
  }

  // Batch larger item counts
  // Wait for the user to confirm or cancel
  const { cancel } = yield race({
    confirm: take(ITEMS_FAVORITE_CONFIRM),
    cancel: take(ITEMS_FAVORITE_CANCEL)
  })

  // If the user manually cancels
  if (cancel) return

  // Build and send batched actions
  const batchActions = yield batchSendActions(items, API_ACTION_FAVORITE)

  // If batch is successful
  if (batchActions.length) {
    return yield put({ type: ITEMS_FAVORITE_SUCCESS, actions: batchActions })
  }

  // If there is a failure
  return yield put({ type: ITEMS_FAVORITE_FAILURE, items })
}

function* itemsUnFavorite({ items }) {
  // Send all actions below a certain threshold
  if (items.length === 1) {
    const actions = buildActions(items, API_ACTION_UNFAVORITE)
    const data = yield call(sendItemActions, actions)

    if (data) return yield put({ type: ITEMS_UNFAVORITE_SUCCESS, actions })
  }

  // Batch larger item counts
  // Wait for the user to confirm or cancel
  const { cancel } = yield race({
    confirm: take(ITEMS_FAVORITE_CONFIRM),
    cancel: take(ITEMS_FAVORITE_CANCEL)
  })

  // If the user manually cancels
  if (cancel) return

  // Build and send batched actions
  const batchActions = yield batchSendActions(items, API_ACTION_UNFAVORITE)

  // If batch is successful
  if (batchActions.length) {
    return yield put({ type: ITEMS_UNFAVORITE_SUCCESS, actions: batchActions })
  }

  // If there is a failure
  return yield put({ type: ITEMS_UNFAVORITE_FAILURE, items })
}
