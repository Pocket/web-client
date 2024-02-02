import { put, call, takeEvery } from 'redux-saga/effects'
import { itemRefresh } from 'common/api/mutations/refreshItem'

import { MUTATION_REFRESH } from 'actions'
import { MUTATION_SUCCESS } from 'actions'


/** ACTIONS
 --------------------------------------------------------------- */
export const mutationRefresh = (url) => ({ type: MUTATION_REFRESH, url })

/** REDUCERS
  --------------------------------------------------------------- */
const initialState = {
  url: false,
}
export const mutationRefreshReducers = (state = initialState, action) => {
  switch (action.type) {

    case MUTATION_SUCCESS: {
      return initialState
    }
  
    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const mutationRefreshSagas = [
  takeEvery(MUTATION_REFRESH, savedItemRefresh),
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */

 function* savedItemRefresh(action) {
  const { url, type } = action
  const node = yield call(itemRefresh, url)
  return yield put({ type: MUTATION_SUCCESS, nodes: [node], actionType: type, count: 1 })
}