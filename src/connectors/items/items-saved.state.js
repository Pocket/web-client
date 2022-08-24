import { put, takeEvery } from 'redux-saga/effects'
import { getSavedItems } from 'common/api/queries/get-saved-items'
import { getSavedItemsTagged } from 'common/api/queries/get-saved-items-tagged'
import { getSavedItemsSearch } from 'common/api/queries/get-saved-items-search'

import { deriveSavedItem } from 'common/api/derivers/item'

import { ITEMS_SAVED_REQUEST } from 'actions'
import { ITEMS_SAVED_SUCCESS } from 'actions'
import { ITEMS_SAVED_FAILURE } from 'actions'
import { ITEMS_UPSERT_SUCCESS } from 'actions'

import { ITEMS_SAVED_SEARCH_REQUEST } from 'actions'
import { ITEMS_SAVED_SEARCH_FAILURE } from 'actions'

import { ITEMS_SAVED_TAGGED_REQUEST } from 'actions'
import { ITEMS_SAVED_TAGGED_FAILURE } from 'actions'

import { ITEMS_SAVED_PAGE_INFO_SUCCESS } from 'actions'
import { ITEMS_SAVED_PAGE_INFO_FAILURE } from 'actions'

import { ITEMS_SUCCESS } from 'actions'
import { READ_ITEM_SUCCESS } from 'actions'
import { MUTATION_SUCCESS } from 'actions'
import { MUTATION_DELETE_SUCCESS } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */

/** ITEM REDUCERS
 --------------------------------------------------------------- */
export const itemsSavedReducers = (state = {}, action) => {
  switch (action.type) {
    case ITEMS_SAVED_SUCCESS:
    case ITEMS_UPSERT_SUCCESS:
    case READ_ITEM_SUCCESS: {
      return { ...state, ...action.nodes }
    }

    case MUTATION_DELETE_SUCCESS: {
      const { ids } = action
      const updatedItems = ids.reduce((previous, id) => {
        return { ...previous, [id]: { ...state[id], status: 'DELETED' } }
      }, {})

      return { ...state, ...updatedItems }
    }

    case MUTATION_SUCCESS: {
      const { nodes } = action
      const updatedItems = nodes.reduce((previous, current) => {
        const { id, ...changes } = current
        return { ...previous, [id]: { ...state[id], ...changes } }
      }, {})
      return { ...state, ...updatedItems }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const itemsSavedSagas = [
  takeEvery(ITEMS_SAVED_REQUEST, savedItemRequest),
  takeEvery(ITEMS_SAVED_TAGGED_REQUEST, savedItemTaggedRequest),
  takeEvery(ITEMS_SAVED_SEARCH_REQUEST, savedItemSearchRequest)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */

function* savedItemRequest(action) {
  try {
    const { actionType, sortOrder, pagination, count } = action
    const { pageInfo, edges, totalCount } = yield getSavedItems({
      actionType,
      sortOrder,
      count,
      pagination
    }) || {}

    if (!pageInfo) return yield put({ type: ITEMS_SAVED_PAGE_INFO_FAILURE })
    if (!edges) return yield put({ type: ITEMS_SAVED_FAILURE })

    const savedItemIds = edges.map((edge) => edge.node.id)
    const nodes = edges.reduce(getNodeFromEdge, {})
    const itemsById = edges.reduce(getItemFromEdge, {})
    const itemsCount = savedItemIds.length

    yield put({ type: ITEMS_SUCCESS, itemsById })
    yield put({ type: ITEMS_SAVED_PAGE_INFO_SUCCESS, pageInfo: { ...pageInfo, totalCount }, itemsCount }) //prettier-ignore
    yield put({ type: ITEMS_SAVED_SUCCESS, nodes, savedItemIds })
  } catch (errors) {
    yield put({ type: ITEMS_SAVED_FAILURE, errors })
  }
}

function* savedItemTaggedRequest(action) {
  try {
    const { actionType, tagNames, sortOrder, pagination } = action
    const { pageInfo, edges, totalCount } = yield getSavedItemsTagged({
      actionType,
      sortOrder,
      tagNames,
      pagination
    }) || {}

    if (!pageInfo) return yield put({ type: ITEMS_SAVED_PAGE_INFO_FAILURE })
    if (!edges) return yield put({ type: ITEMS_SAVED_FAILURE })

    const savedItemIds = edges.map((edge) => edge.node.id)
    const nodes = edges.reduce(getNodeFromEdge, {})
    const itemsById = edges.reduce(getItemFromEdge, {})
    const itemsCount = savedItemIds.length

    yield put({ type: ITEMS_SUCCESS, itemsById })
    yield put({ type: ITEMS_SAVED_PAGE_INFO_SUCCESS, pageInfo: { ...pageInfo, totalCount }, itemsCount }) //prettier-ignore
    yield put({ type: ITEMS_SAVED_SUCCESS, nodes, savedItemIds })
  } catch (errors) {
    yield put({ type: ITEMS_SAVED_TAGGED_FAILURE, errors })
  }
}

function* savedItemSearchRequest(action) {
  const { actionType, searchTerm, sortOrder, pagination, count } = action
  const { pageInfo, edges, totalCount } = yield getSavedItemsSearch({
    actionType,
    sortOrder,
    searchTerm,
    count,
    pagination
  }) || {}

  if (!pageInfo) return yield put({ type: ITEMS_SAVED_PAGE_INFO_FAILURE })
  if (!edges) return yield put({ type: ITEMS_SAVED_SEARCH_FAILURE })

  const savedItemIds = edges.map((edge) => edge.node.savedItem.id)
  const nodes = edges.reduce(getSearchNodeFromEdge, {})
  const itemsById = edges.reduce(getSearchItemFromEdge, {})
  const itemsCount = savedItemIds.length

  yield put({ type: ITEMS_SUCCESS, itemsById })
  yield put({ type: ITEMS_SAVED_PAGE_INFO_SUCCESS, pageInfo: { ...pageInfo, totalCount, searchTerm}, itemsCount }) //prettier-ignore
  yield put({ type: ITEMS_SAVED_SUCCESS, nodes, savedItemIds })
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
