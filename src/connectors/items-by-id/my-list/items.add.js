import { put, call, takeEvery } from 'redux-saga/effects'
import { sendItemActions } from 'common/api/item-actions'

import { ITEMS_ADD_REQUEST } from 'actions'
import { ITEMS_ADD_SUCCESS } from 'actions'
import { ITEMS_ADD_FAILURE } from 'actions'

import { API_ACTION_ADD } from 'common/constants'

/** ACTIONS
 --------------------------------------------------------------- */
export const itemAddAction = (payload) => ({ type: ITEMS_ADD_REQUEST, payload }) //prettier-ignore

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const itemAddSagas = [takeEvery(ITEMS_ADD_REQUEST, itemAdd)]

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function* itemAdd(action) {
  try {
    const { url, analytics } = action.payload
    const actions = [{ action: API_ACTION_ADD, url, ...analytics }]
    const data = yield call(sendItemActions, actions)

    if (data) return yield put({ type: ITEMS_ADD_SUCCESS, data, actions })
    yield put({ type: ITEMS_ADD_FAILURE })
  } catch (error) {
    console.log(error)
  }
}
