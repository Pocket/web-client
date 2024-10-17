import { put, takeEvery, select } from 'redux-saga/effects'
import { getSavedItems } from 'common/api/queries/get-saved-items'
import { getSavedItemsTagged } from 'common/api/queries/get-saved-items-tagged'
import { getSavedItemsSearch } from 'common/api/queries/get-saved-items-search'

import { deriveSavedItem } from 'common/api/derivers/item'
import { STARTER_ARTICLES } from 'common/constants'

import { ITEMS_SAVED_REQUEST } from 'actions'
import { ITEMS_SAVED_SUCCESS } from 'actions'
import { ITEMS_SAVED_FAILURE } from 'actions'
import { ITEMS_UPSERT_SUCCESS } from 'actions'
import { ITEMS_UNDELETE_SUCCESS } from 'actions'

import { ITEMS_SAVED_UPDATE_REQUEST } from 'actions'
import { ITEMS_SAVED_UPDATE_SUCCESS } from 'actions'
import { ITEMS_SAVED_UPDATE_FAILURE } from 'actions'

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
    case ITEMS_SAVED_UPDATE_SUCCESS:
    case READ_ITEM_SUCCESS: {
      return { ...state, ...action.nodes }
    }

    case ITEMS_UNDELETE_SUCCESS: {
      const { itemId, previousStatus } = action
      return { ...state, [itemId]: { ...state[itemId], status: previousStatus } }
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
  takeEvery(ITEMS_SAVED_SEARCH_REQUEST, savedItemSearchRequest),
  takeEvery(ITEMS_SAVED_UPDATE_REQUEST, savedItemUpdateRequest)
]

/** SAGA :: SELECTORS
 --------------------------------------------------------------- */
const getFlags = (state) => state.features

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* savedItemRequest(action) {
  try {
    const features = yield select(getFlags)
    const previewMetaDataFlag = features['preview.metadata'] ?? {}
    const usePreviewMetaData =
      (previewMetaDataFlag?.active && previewMetaDataFlag?.assigned) || false

    const { actionType, sortOrder, pagination, count } = action
    const { pageInfo, edges, totalCount } = yield getSavedItems({
      actionType,
      sortOrder,
      usePreviewMetaData,
      count,
      pagination
    }) || {}

    if (!pageInfo) return yield put({ type: ITEMS_SAVED_PAGE_INFO_FAILURE })
    if (!edges) return yield put({ type: ITEMS_SAVED_FAILURE, message: 'No edges returned' })

    const savedItemIds = edges
      .filter(validateEdge)
      .filter(removeStarterArticle)
      .map((edge) => edge?.node?.item?.itemId)

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

function* savedItemUpdateRequest(action) {
  try {
    const { actionType, sortOrder, pagination } = action

    const { pageInfo, edges, totalCount } = yield getSavedItems({
      actionType,
      sortOrder,
      pagination
    }) || {}

    if (!pageInfo) return yield put({ type: ITEMS_SAVED_PAGE_INFO_FAILURE })
    // Nothing to update, bail out
    if (!edges || edges.length === 0) return

    const savedItemIds = edges
      .filter(validateEdge)
      .filter(removeStarterArticle)
      .map((edge) => edge?.node?.id)

    const nodes = edges.reduce(getNodeFromEdge, {})
    const itemsById = edges.reduce(getItemFromEdge, {})
    // Storing startCursor in case of further updates and we don't refetch items
    const { startCursor } = pageInfo

    yield put({ type: ITEMS_SUCCESS, itemsById })
    yield put({ type: ITEMS_SAVED_PAGE_INFO_SUCCESS, pageInfo: { startCursor, totalCount } }) //prettier-ignore
    yield put({ type: ITEMS_SAVED_UPDATE_SUCCESS, savedItemIds, nodes })
  } catch (errors) {
    yield put({ type: ITEMS_SAVED_UPDATE_FAILURE, errors })
  }
}

/** ASYNC Functions
 --------------------------------------------------------------- */

// Remove any edges that do not have a node containing an item
const validateEdge = (edge) => !!edge?.node?.item

// !! Remove any articles that are part of our legacy starter articles
// !! This will be on handled by the backend in future
const removeStarterArticle = (edge) => !STARTER_ARTICLES.includes(edge?.node?.item?.resolvedId)

const getNodeFromEdge = (previous, current) => {
  const cursor = current.cursor
  const { item, ...node } = current.node
  if (node.status === 'DELETED') return previous // REMOVE DELETED ITEMS FROM THE RESPONSE
  return { ...previous, [item.itemId]: { cursor, ...node } }
}

const getItemFromEdge = (previous, current) => {
  const { item, node } = deriveSavedItem(current.node)
  if (node.status === 'DELETED') return previous
  return { ...previous, [item.itemId]: item } // REMOVE DELETED ITEMS FROM THE RESPONSE
}

const getSearchNodeFromEdge = (previous, current) => {
  const { item, ...node } = current.node.savedItem
  if (node.status === 'DELETED') return previous
  return { ...previous, [item.itemId]: node } // REMOVE DELETED ITEMS FROM THE RESPONSE
}

const getSearchItemFromEdge = (previous, current) => {
  const { item, node } = deriveSavedItem(current.node.savedItem)
  if (node.status === 'DELETED') return previous
  return { ...previous, [item.itemId]: item } // REMOVE DELETED ITEMS FROM THE RESPONSE
}

/**
 * Errors 
 ----------------------------------------------------------------------------*/

class SavedItemsError extends Error {
  constructor(message) {
    super(message)
    this.name = 'SavedItemsError'
    this.logMessage = message
  }
}

class SavedItemsTaggedError extends Error {
  constructor(message) {
    super(message)
    this.name = 'SavedItemsTaggedError'
    this.logMessage = message
  }
}
