import { put, call, takeEvery } from 'redux-saga/effects'
import { getSavedItems } from 'common/api'
import { searchSavedItems } from 'common/api'
import { itemFavorite } from 'common/api'
import { itemUnFavorite } from 'common/api'
import { itemArchive } from 'common/api'
import { itemUnArchive } from 'common/api'
import { itemDelete } from 'common/api'
import { itemUpsert } from 'common/api'

import { deriveSavedItem } from 'common/api/derivers/item'

import { ITEMS_SAVED_REQUEST } from 'actions'
import { ITEMS_SAVED_SUCCESS } from 'actions'
import { ITEMS_SAVED_FAILURE } from 'actions'
import { ITEMS_UPSERT_SUCCESS } from 'actions'

import { ITEMS_SAVED_SEARCH_REQUEST } from 'actions'
import { ITEMS_SAVED_SEARCH_FAILURE } from 'actions'

import { ITEMS_SAVED_PAGE_INFO_SUCCESS } from 'actions'
import { ITEMS_SAVED_PAGE_INFO_FAILURE } from 'actions'

import { ITEMS_SUCCESS } from 'actions'

import { MUTATION_UPSERT } from 'actions'
import { MUTATION_FAVORITE } from 'actions'
import { MUTATION_UNFAVORITE } from 'actions'
import { MUTATION_ARCHIVE } from 'actions'
import { MUTATION_UNARCHIVE } from 'actions'
import { MUTATION_RE_ADD } from 'actions'
import { MUTATION_DELETE } from 'actions'
import { MUTATION_SUCCESS } from 'actions'
import { MUTATION_FAILURE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const requestItemsSaved = (filters) => ({ type: ITEMS_SAVED_REQUEST, filters })
export const mutationFavorite = (itemId) => ({ type: MUTATION_FAVORITE, itemId })
export const mutationUnFavorite = (itemId) => ({ type: MUTATION_UNFAVORITE, itemId })
export const mutationArchive = (itemId) => ({ type: MUTATION_ARCHIVE, itemId })
export const mutationUnArchive = (itemId) => ({ type: MUTATION_UNARCHIVE, itemId })
export const mutationDelete = (itemId) => ({ type: MUTATION_DELETE, itemId })
export const mutationUpsert = (url, filters, sort) => ({ type: MUTATION_UPSERT, url, filters, sort }) //prettier-ignore
export const mutationReAdd = (url) => ({ type: MUTATION_RE_ADD, url })

/** ITEM REDUCERS
 --------------------------------------------------------------- */
export const itemsSavedReducers = (state = {}, action) => {
  switch (action.type) {
    case ITEMS_SAVED_SUCCESS:
    case ITEMS_UPSERT_SUCCESS: {
      return { ...state, ...action.nodes }
    }

    case MUTATION_SUCCESS: {
      const { node, id } = action
      const { item, ...savedNode } = node
      return { ...state, [id]: savedNode }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const itemsSavedSagas = [
  takeEvery(ITEMS_SAVED_REQUEST, savedItemRequest),
  takeEvery(ITEMS_SAVED_SEARCH_REQUEST, savedItemSearchRequest),
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
function* savedItemRequest(action) {
  const { filters } = action
  const { pageInfo, edges, totalCount } = yield getSavedItems(filters) || {}

  if (!pageInfo) return yield put({ type: ITEMS_SAVED_PAGE_INFO_FAILURE })
  if (!edges) return yield put({ type: ITEMS_SAVED_FAILURE })

  const savedItemIds = edges.map((edge) => edge.node.id)
  const nodes = edges.reduce(getNodeFromEdge, {})
  const itemsById = edges.reduce(getItemFromEdge, {})

  yield put({ type: ITEMS_SUCCESS, itemsById })
  yield put({ type: ITEMS_SAVED_PAGE_INFO_SUCCESS, pageInfo: { ...pageInfo, totalCount } })
  yield put({ type: ITEMS_SAVED_SUCCESS, nodes, savedItemIds })
}

function* savedItemSearchRequest(action) {
  const { filters } = action
  const { searchTerm } = filters
  const { pageInfo, edges, totalCount } = yield searchSavedItems(filters) || {}

  if (!pageInfo) return yield put({ type: ITEMS_SAVED_PAGE_INFO_FAILURE })
  if (!edges) return yield put({ type: ITEMS_SAVED_SEARCH_FAILURE })

  const savedItemIds = edges.map((edge) => edge.node.savedItem.id)
  const nodes = edges.reduce(getSearchNodeFromEdge, {})
  const itemsById = edges.reduce(getSearchItemFromEdge, {})

  yield put({ type: ITEMS_SUCCESS, itemsById })
  yield put({ type: ITEMS_SAVED_PAGE_INFO_SUCCESS, pageInfo: { ...pageInfo, totalCount, searchTerm} }) //prettier-ignore
  yield put({ type: ITEMS_SAVED_SUCCESS, nodes, savedItemIds })
}

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
  return yield put({ type: MUTATION_SUCCESS, id: deletedId })
}

/** ASYNC Functions
 --------------------------------------------------------------- */

const getNodeFromEdge = (previous, current) => {
  const { item, ...node } = current.node
  if (node.status === 'DELETED') return previous // REMOVE DELETED ITEMS FROM THE RESPONSE
  return { ...previous, [node.id]: node }
}

const getItemFromEdge = (previous, current) => {
  const { item, node } = deriveSavedItem(current.node)
  if (node.status === 'DELETED') return previous
  return { ...previous, [node.id]: item } // REMOVE DELETED ITEMS FROM THE RESPONSE
}

const getSearchNodeFromEdge = (previous, current) => {
  const { item, ...node } = current.node.savedItem
  if (node.status === 'DELETED') return previous
  return { ...previous, [node.id]: node } // REMOVE DELETED ITEMS FROM THE RESPONSE
}

const getSearchItemFromEdge = (previous, current) => {
  const { item, node } = deriveSavedItem(current.node.savedItem)
  if (node.status === 'DELETED') return previous
  return { ...previous, [node.id]: item } // REMOVE DELETED ITEMS FROM THE RESPONSE
}
