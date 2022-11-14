import { put, call, takeEvery } from 'redux-saga/effects'
import { deriveSavedItem } from 'common/api/derivers/item'
import { itemUpsert } from 'common/api'

import { MUTATION_UPSERT } from 'actions'
import { MUTATION_SUCCESS } from 'actions'
import { ITEMS_SUCCESS } from 'actions'
import { ITEMS_UPSERT_SUCCESS } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const mutationUpsert = (url, filters, sort, isUnArchive) => ({ type: MUTATION_UPSERT, url, filters, sort, isUnArchive}) //prettier-ignore

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const mutationUpsertSagas = [takeEvery(MUTATION_UPSERT, savedItemUpsert)]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */

function* savedItemUpsert(action) {
  const { url, sort, isUnArchive, type } = action
  const upsertResponse = yield call(itemUpsert, url)

  if (!upsertResponse) return // Do better here
  const { item, node } = deriveSavedItem(upsertResponse)
  const { itemId } = item

  const savedItemIds = [itemId]
  yield put({ type: ITEMS_SUCCESS, itemsById: { [itemId]: item } })

  if (isUnArchive) return yield put({ type: MUTATION_SUCCESS, nodes: [node],  actionType: type, count: 1})

  yield put({ type: ITEMS_UPSERT_SUCCESS, nodes: { [itemId]: node }, savedItemIds, sort })
}
