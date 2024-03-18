import { put, call, takeEvery } from 'redux-saga/effects'
import { itemRefresh } from 'common/api/mutations/refreshItem'
import { deriveSavedItem } from 'common/api/derivers/item'

import { ITEMS_UPDATE } from 'actions'
import { MUTATION_REFRESH } from 'actions'
import { MUTATION_SUCCESS } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const mutationRefresh = (url) => ({ type: MUTATION_REFRESH, url })

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const mutationRefreshSagas = [takeEvery(MUTATION_REFRESH, savedItemRefresh)]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* savedItemRefresh({ url, type }) {
  const data = yield call(itemRefresh, url)
  const { item, node } = deriveSavedItem(data)

  yield put({ type: ITEMS_UPDATE, itemsById: { [node.id]: item } })
  return yield put({ type: MUTATION_SUCCESS, nodes: [node], actionType: type, count: 1 })
}
