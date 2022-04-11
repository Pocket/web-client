import { put, call, takeEvery } from 'redux-saga/effects'
import { itemFavorite } from 'common/api'
import { itemUnFavorite } from 'common/api'

import { MUTATION_FAVORITE } from 'actions'
import { MUTATION_UNFAVORITE } from 'actions'
import { MUTATION_SUCCESS } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const mutationFavorite = (itemId) => ({ type: MUTATION_FAVORITE, itemId })
export const mutationUnFavorite = (itemId) => ({ type: MUTATION_UNFAVORITE, itemId })

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const mutationFavoriteSagas = [
  takeEvery(MUTATION_FAVORITE, savedItemFavorite),
  takeEvery(MUTATION_UNFAVORITE, savedItemUnFavorite)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */

function* savedItemFavorite(action) {
  const { itemId } = action
  const node = yield call(itemFavorite, itemId)
  return yield put({ type: MUTATION_SUCCESS, node, id: node.id })
}

function* savedItemUnFavorite(action) {
  const { itemId } = action
  const node = yield call(itemUnFavorite, itemId)
  return yield put({ type: MUTATION_SUCCESS, node, id: node.id })
}
