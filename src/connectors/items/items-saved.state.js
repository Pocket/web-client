import { put, call, takeEvery } from 'redux-saga/effects'
import { getSavedItems } from 'common/api'
import { searchSavedItems } from 'common/api'
import { itemFavorite } from 'common/api'
import { itemUnFavorite } from 'common/api'
import { itemArchive } from 'common/api'
import { itemUnArchive } from 'common/api'
import { itemDelete } from 'common/api'

import { deriveSavedItem } from 'common/api/derivers/item'

import { ITEMS_SAVED_REQUEST } from 'actions'
import { ITEMS_SAVED_SUCCESS } from 'actions'
import { ITEMS_SAVED_FAILURE } from 'actions'

import { ITEMS_SAVED_SEARCH_REQUEST } from 'actions'
import { ITEMS_SAVED_SEARCH_FAILURE } from 'actions'

import { ITEMS_SAVED_PAGE_INFO_SUCCESS } from 'actions'
import { ITEMS_SAVED_PAGE_INFO_FAILURE } from 'actions'

import { ITEMS_SUCCESS } from 'actions'

import { MUTATION_FAVORITE } from 'actions'
import { MUTATION_UNFAVORITE } from 'actions'
import { MUTATION_ARCHIVE } from 'actions'
import { MUTATION_UNARCHIVE } from 'actions'
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

/** ITEM REDUCERS
 --------------------------------------------------------------- */
export const itemsSavedReducers = (state = {}, action) => {
  switch (action.type) {
    case ITEMS_SAVED_SUCCESS: {
      return { ...state, ...action.nodes }
    }

    case MUTATION_SUCCESS: {
      const { item, id } = action
      return { ...state, [id]: item }
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

function* savedItemFavorite(action) {
  const { itemId } = action
  const updatedItem = yield call(itemFavorite, itemId)
  return yield put({ type: MUTATION_SUCCESS, item: updatedItem, id: updatedItem.id })
}

function* savedItemUnFavorite(action) {
  const { itemId } = action
  const updatedItem = yield call(itemUnFavorite, itemId)
  return yield put({ type: MUTATION_SUCCESS, item: updatedItem, id: updatedItem.id })
}

function* savedItemArchive(action) {
  const { itemId } = action
  const updatedItem = yield call(itemArchive, itemId)
  return yield put({ type: MUTATION_SUCCESS, item: updatedItem, id: updatedItem.id })
}

function* savedItemUnArchive(action) {
  const { itemId } = action
  const updatedItem = yield call(itemUnArchive, itemId)
  return yield put({ type: MUTATION_SUCCESS, item: updatedItem, id: updatedItem.id })
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
  return { ...previous, [node.id]: node }
}

const getItemFromEdge = (previous, current) => {
  const { item, node } = deriveSavedItem(current.node)
  return { ...previous, [node.id]: item }
}

const getSearchNodeFromEdge = (previous, current) => {
  const { item, ...node } = current.node.savedItem
  return { ...previous, [node.id]: node }
}

const getSearchItemFromEdge = (previous, current) => {
  const { item, node } = deriveSavedItem(current.node.savedItem)
  return { ...previous, [node.id]: item }
}
