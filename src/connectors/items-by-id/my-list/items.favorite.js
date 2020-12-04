import { put, call, takeLatest } from 'redux-saga/effects'
import { sendItemActions } from 'common/api/item-actions'

import { ITEMS_FAVORITE_REQUEST } from 'actions'
import { ITEMS_FAVORITE_SUCCESS } from 'actions'
import { ITEMS_FAVORITE_FAILURE } from 'actions'

import { ITEMS_UNFAVORITE_REQUEST } from 'actions'
import { ITEMS_UNFAVORITE_SUCCESS } from 'actions'
import { ITEMS_UNFAVORITE_FAILURE } from 'actions'

import { API_ACTION_FAVORITE } from 'common/constants'
import { API_ACTION_UNFAVORITE } from 'common/constants'
import { ANALYTICS_INDEX } from 'common/constants'

/** ACTIONS
 --------------------------------------------------------------- */
export const itemsFavoriteAction = (items) => ({ type: ITEMS_FAVORITE_REQUEST, items }) //prettier-ignore
export const itemsUnFavoriteAction = (items) => ({type: ITEMS_UNFAVORITE_REQUEST, items }) // prettier-ignore

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const itemFavoriteSagas = [
  takeLatest(ITEMS_FAVORITE_REQUEST, itemsFavorite),
  takeLatest(ITEMS_UNFAVORITE_REQUEST, itemsUnFavorite)
]

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* itemsFavorite({ items }) {
  const actions = buildActions(items, API_ACTION_FAVORITE)
  const data = yield call(sendItemActions, actions)

  if (data) return yield put({ type: ITEMS_FAVORITE_SUCCESS, data, actions })

  return yield put({ type: ITEMS_FAVORITE_FAILURE, items })
}

function* itemsUnFavorite({ items }) {
  const actions = buildActions(items, API_ACTION_UNFAVORITE)
  const data = yield call(sendItemActions, actions)
  if (data) return yield put({ type: ITEMS_UNFAVORITE_SUCCESS, data, actions })

  return yield put({ type: ITEMS_UNFAVORITE_FAILURE, items })
}

function buildActions(items, action) {
  return items.map((item) => ({ action, item_id: item.id }))
}
