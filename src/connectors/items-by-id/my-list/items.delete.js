import { put, call, takeEvery } from 'redux-saga/effects'
import { sendItemActions } from 'common/api/item-actions'

import { ITEMS_DELETE_REQUEST } from 'actions'
import { ITEMS_DELETE_SUCCESS } from 'actions'
import { ITEMS_DELETE_FAILURE } from 'actions'

import { API_ACTION_DELETE } from 'common/constants'

/** ACTIONS
 --------------------------------------------------------------- */
export const itemsDeleteAction = (items) => ({ type: ITEMS_DELETE_REQUEST, items }) //prettier-ignore

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const itemDeleteSagas = [takeEvery(ITEMS_DELETE_REQUEST, itemsDelete)]

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* itemsDelete({ items }) {
  const actions = buildActions(items, API_ACTION_DELETE)
  const data = yield call(sendItemActions, actions)

  if (data) return yield put({ type: ITEMS_DELETE_SUCCESS, data })

  return yield put({ type: ITEMS_DELETE_FAILURE, items })
}

function buildActions(items, action) {
  return items.map((item) => ({ action, item_id: item.id }))
}
