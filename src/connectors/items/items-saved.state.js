import { put, takeEvery } from 'redux-saga/effects'
import { getSavedItems } from 'common/api'
import { searchSavedItems } from 'common/api'

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
import { MUTATION_SUCCESS } from 'actions'
import { MUTATION_DELETE_SUCCESS } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const requestItemsSaved = (filters) => ({ type: ITEMS_SAVED_REQUEST, filters })

/** ITEM REDUCERS
 --------------------------------------------------------------- */
export const itemsSavedReducers = (state = {}, action) => {
  switch (action.type) {
    case ITEMS_SAVED_SUCCESS:
    case ITEMS_UPSERT_SUCCESS: {
      return { ...state, ...action.nodes }
    }

    case MUTATION_DELETE_SUCCESS: {
      const { id } = action
      const current = state[id]
      return { ...state, [id]: { ...current, status: 'DELETED' } }
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
  takeEvery(ITEMS_SAVED_SEARCH_REQUEST, savedItemSearchRequest)
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
