import { put, call, takeEvery } from 'redux-saga/effects'
import { deriveSavedItem } from 'common/api/derivers/item'
import { itemUpsert } from 'common/api/mutations/upsertItem'

import { MUTATION_UPSERT } from 'actions'
import { MUTATION_SUCCESS } from 'actions'
import { ITEMS_SUCCESS } from 'actions'
import { ITEMS_UPSERT_SUCCESS } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const mutationUpsert = (url, filters, sort, isUnArchive) => ({ type: MUTATION_UPSERT, url, filters, sort, isUnArchive }) //prettier-ignore
// A transitional item is something that we are offering the user as a recommendation from our corpus or other discovery surface
export const mutationUpsertTransitionalItem = (url, transitionId) => ({ type: MUTATION_UPSERT, url, transitionId }) //prettier-ignore

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const mutationUpsertSagas = [takeEvery(MUTATION_UPSERT, savedItemUpsert)]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */

function* savedItemUpsert(action) {
  const { url, sort, isUnArchive, type, transitionId } = action
  const upsertResponse = yield call(itemUpsert, url)

  if (!upsertResponse) return // Do better here
  const { item, node } = deriveSavedItem(upsertResponse)
  const { itemId } = item

  const savedItemIds = [itemId]
  yield put({ type: ITEMS_SUCCESS, itemsById: { [itemId]: item } })

  if (isUnArchive) return yield put({ type: MUTATION_SUCCESS, nodes: [node], actionType: type, count: 1 }) //prettier-ignore

  yield put({
    type: ITEMS_UPSERT_SUCCESS,
    nodes: { [itemId]: node },
    savedItemIds,
    sort,
    transitionId,
    itemId
  })
}
