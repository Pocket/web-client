import { put, call, takeEvery } from 'redux-saga/effects'
import { sendItemActions } from 'common/api/item-actions'

import { ITEMS_DELETE_REQUEST } from 'actions'
import { ITEMS_DELETE_SUCCESS } from 'actions'
import { ITEMS_DELETE_FAILURE } from 'actions'

import { API_ACTION_DELETE } from 'common/constants'

/** ACTIONS
 --------------------------------------------------------------- */
export const itemsDeleteAction = (payload) => ({ type: ITEMS_DELETE_REQUEST, payload }) //prettier-ignore

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const itemDeleteSagas = [takeEvery(ITEMS_DELETE_REQUEST, itemDelete)]

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function* itemDelete(action) {
  try {
    const { url, analytics } = action.payload
    const actions = [{ action: API_ACTION_DELETE, url, ...analytics }]
    const data = yield call(sendItemActions, actions)

    if (data) return yield put({ type: ITEMS_DELETE_SUCCESS, data })
    yield put({ type: ITEMS_DELETE_FAILURE })
  } catch (error) {
    console.log(error)
  }
}
