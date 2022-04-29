import { put, call, takeEvery } from 'redux-saga/effects'

import { deriveSavedItem } from 'common/api/derivers/item'
import { itemFavorite } from 'common/api'
import { itemUnFavorite } from 'common/api'
import { itemArchive } from 'common/api'
import { itemUnArchive } from 'common/api'
import { itemDelete } from 'common/api'
import { itemUpsert } from 'common/api'

import { MUTATION_UPSERT } from 'actions'
import { MUTATION_FAVORITE } from 'actions'
import { MUTATION_UNFAVORITE } from 'actions'
import { MUTATION_ARCHIVE } from 'actions'
import { MUTATION_UNARCHIVE } from 'actions'
import { MUTATION_RE_ADD } from 'actions'
import { MUTATION_DELETE } from 'actions'
import { MUTATION_SUCCESS } from 'actions'
import { ITEMS_SUCCESS } from 'actions'
import { ITEMS_UPSERT_SUCCESS } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const mutationFavorite = (itemId) => ({ type: MUTATION_FAVORITE, itemId })
export const mutationUnFavorite = (itemId) => ({ type: MUTATION_UNFAVORITE, itemId })
export const mutationArchive = (itemId) => ({ type: MUTATION_ARCHIVE, itemId })
export const mutationUnArchive = (itemId) => ({ type: MUTATION_UNARCHIVE, itemId })
export const mutationDelete = (itemId) => ({ type: MUTATION_DELETE, itemId })
export const mutationUpsert = (url, filters, sort) => ({ type: MUTATION_UPSERT, url, filters, sort }) //prettier-ignore
export const mutationReAdd = (url) => ({ type: MUTATION_RE_ADD, url })

/** ITEM REDUCERS
  --------------------------------------------------------------- */

export const itemsMutationReducers = (state = {}, action) => {
  switch (action.type) {
    default: {
      return state
    }
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const itemsMutationsSagas = [
  takeEvery(MUTATION_UPSERT, savedItemUpsert),
  takeEvery(MUTATION_RE_ADD, savedItemReAdd),
  takeEvery(MUTATION_FAVORITE, savedItemFavorite),
  takeEvery(MUTATION_UNFAVORITE, savedItemUnFavorite),
  takeEvery(MUTATION_ARCHIVE, savedItemArchive),
  takeEvery(MUTATION_UNARCHIVE, savedItemUnArchive),
  takeEvery(MUTATION_DELETE, savedItemDelete)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */

function* savedItemUpsert(action) {
  const { url, sort } = action
  const upsertResponse = yield call(itemUpsert, url)

  if (!upsertResponse) return // Do better here
  const { item, node } = deriveSavedItem(upsertResponse)
  const { itemId } = item

  const savedItemIds = [itemId]
  yield put({ type: ITEMS_SUCCESS, itemsById: { [itemId]: item } })
  yield put({ type: ITEMS_UPSERT_SUCCESS, nodes: { [itemId]: node }, savedItemIds, sort })
}

function* savedItemReAdd(action) {
  const { url } = action
  const upsertResponse = yield call(itemUpsert, url)

  if (!upsertResponse) return // Do better here
  const { item, node } = deriveSavedItem(upsertResponse)
  const { itemId } = item

  return yield put({ type: MUTATION_SUCCESS, node, id: itemId })
}

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

function* savedItemArchive(action) {
  const { itemId } = action
  const node = yield call(itemArchive, itemId)
  return yield put({ type: MUTATION_SUCCESS, node, id: node.id })
}

function* savedItemUnArchive(action) {
  const { itemId } = action
  const node = yield call(itemUnArchive, itemId)
  return yield put({ type: MUTATION_SUCCESS, node, id: node.id })
}

function* savedItemDelete(action) {
  const { itemId } = action
  const deletedId = yield call(itemDelete, itemId)
  return yield put({ type: MUTATION_SUCCESS, deletedId })
}
