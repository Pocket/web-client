import { put, call, takeEvery } from 'redux-saga/effects'
import { sendItemActions } from 'common/api/_legacy/item-actions'

import { ITEMS_ADD_REQUEST } from 'actions'
import { ITEMS_ADD_SUCCESS } from 'actions'
import { ITEMS_ADD_FAILURE } from 'actions'

import { API_ACTION_ADD } from 'common/constants'

/** ACTIONS
 --------------------------------------------------------------- */
export const itemAddAction = (url) => ({ type: ITEMS_ADD_REQUEST, url }) //prettier-ignore

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const itemAddSagas = [takeEvery(ITEMS_ADD_REQUEST, itemAdd)]

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function* itemAdd(action) {
  try {
    const { url } = action

    const actions = [{ action: API_ACTION_ADD, url }]
    const data = yield call(sendItemActions, actions)

    // Catch a null response OR a response with action_errors
    if (data?.action_errors[0] !== null) {
      yield put({ type: ITEMS_ADD_FAILURE, errors: data?.action_errors })
      return
    }

    yield put({ type: ITEMS_ADD_SUCCESS })
  } catch (error) {
    console.warn(error)
  }
}
