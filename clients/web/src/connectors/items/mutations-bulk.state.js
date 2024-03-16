import { put, takeEvery, call, select } from 'redux-saga/effects'
import { chunk } from 'common/utilities/object-array/object-array'

import { BATCH_SIZE } from 'common/constants'

import { MUTATION_BULK_CONFIRM } from 'actions'
import { MUTATION_BULK_CANCEL } from 'actions'

import { MUTATION_BULK_SELECT } from 'actions'
import { MUTATION_BULK_DESELECT } from 'actions'
import { MUTATION_BULK_CLEAR } from 'actions'

import { MUTATION_BULK_SET_CURRENT } from 'actions'
import { MUTATION_BULK_ADD } from 'actions'
import { MUTATION_BULK_REMOVE } from 'actions'

import { MUTATION_BULK_BATCH_COMPLETE } from 'actions'
import { MUTATION_BULK_BATCH_BEGIN } from 'actions'
import { MUTATION_BULK_BATCH_SUCCESS } from 'actions'
import { MUTATION_BULK_BATCH_FAILURE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const mutationBulkSelectAction = (id, shift) => ({ type: MUTATION_BULK_SELECT, id, shift }) //prettier-ignore
export const mutationBulkDeSelectAction = (id, shift) => ({ type: MUTATION_BULK_DESELECT, id, shift }) //prettier-ignore
export const mutationBulkClear = () => ({ type: MUTATION_BULK_CLEAR })
export const mutationBulkConfirm = () => ({ type: MUTATION_BULK_CONFIRM })
export const mutationBulkCancel = () => ({ type: MUTATION_BULK_CANCEL })

/** REDUCERS
  --------------------------------------------------------------- */
const initialState = {
  itemIds: [],
  previouslySelectedId: null,
  currentId: null,
  endPosition: 0,
  favoriteAction: 'favorite', // determines if the action is favorite/unfavorite
  archiveAction: 'archive', // determines if the action is archive/unarchive
  batchCount: 0,
  batchStart: false,
  batchTotal: 0
}

export const mutationBulkReducers = (state = initialState, action) => {
  switch (action.type) {
    case MUTATION_BULK_SET_CURRENT: {
      const { currentId } = action
      return { ...state, currentId }
    }

    case MUTATION_BULK_ADD:
    case MUTATION_BULK_REMOVE: {
      const { previouslySelectedId, itemIds, favoriteAction, archiveAction } = action
      return { ...state, previouslySelectedId, itemIds, favoriteAction, archiveAction }
    }

    case MUTATION_BULK_CLEAR:
    case MUTATION_BULK_BATCH_COMPLETE: {
      return initialState
    }

    case MUTATION_BULK_CANCEL: {
      return { ...state, batchCount: 0, batchStart: false }
    }

    case MUTATION_BULK_BATCH_BEGIN: {
      const { batchCount, bulkAction, batchTotal } = action
      return { ...state, batchCount, bulkAction, batchTotal, batchStart: true }
    }

    case MUTATION_BULK_BATCH_SUCCESS:
    case MUTATION_BULK_BATCH_FAILURE: {
      const { batchCount } = action
      return { ...state, batchCount }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const mutationBulkSagas = [
  takeEvery(MUTATION_BULK_SELECT, itemBulkSelect),
  takeEvery(MUTATION_BULK_DESELECT, itemBulkSelect)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getPreviousId = (state) => state.mutationBulk.previouslySelectedId
const getSelected = (state) => state.mutationBulk.itemIds
const getPageSavedIds = (state) => state.pageSavedIds
const getItemsById = (state) => state.itemsSaved

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function* itemBulkSelect(action) {
  try {
    const { id, shift, type } = action
    const selectorFunction = type === MUTATION_BULK_SELECT ? itemSelector : itemDeselector

    const itemsToSelectFrom = yield select(getPageSavedIds)
    const startingId = shift ? yield select(getPreviousId) : false
    const selected = yield select(getSelected)
    const itemIds = selectorFunction(id, startingId, selected, itemsToSelectFrom)

    const items = yield select(getItemsById)

    const favoriteAction = itemIds.every((id) => !items[id].isFavorite) ? 'favorite' : 'unfavorite'
    const archiveAction = itemIds.every((id) => !items[id].isArchived) ? 'archive' : 'add'

    return yield put({
      type: MUTATION_BULK_ADD,
      previouslySelectedId: id,
      itemIds,
      favoriteAction,
      archiveAction
    })
  } catch (error) {
    console.warn(error)
  }
}

export function* batchSendMutations(itemIds, apiCall, batchSize = BATCH_SIZE) {
  const batches = yield chunk(itemIds, batchSize)
  let response
  let batchCount = batches.length
  let totalResponses = {}

  yield put({ type: MUTATION_BULK_BATCH_BEGIN, batchCount, batchTotal: batchCount })

  for (var batch of batches) {
    batchCount -= 1
    response = yield call(apiCall, batch)

    // Break out of the loop when a batch fails
    if (response.errorCode) {
      yield put({ type: MUTATION_BULK_BATCH_FAILURE, batchCount: 0 })
      break
    }

    totalResponses = { ...totalResponses, ...response }

    yield put({ type: MUTATION_BULK_BATCH_SUCCESS, batchCount, response })
  }

  yield put({ type: MUTATION_BULK_BATCH_COMPLETE })

  return yield Object.values(totalResponses)
}

/** UTILITIES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const itemSelector = (selectedId, startingId, selected = [], itemsToSelectFrom) => {
  // If we are not operating on multiple items, just add the id to the selected array
  if (startingId === false) return getItemsInOrder(selected, itemsToSelectFrom, [selectedId])

  // When a start position is passed in it means we are selecting a range
  const startPosition = itemsToSelectFrom.indexOf(startingId)
  const endPosition = itemsToSelectFrom.indexOf(selectedId)

  // We want to make sure we can select forward and backward in the range
  const idsToAdd =
    startPosition < endPosition
      ? itemsToSelectFrom.slice(startPosition, endPosition + 1)
      : itemsToSelectFrom.slice(endPosition, startPosition + 1)

  return getItemsInOrder(selected, itemsToSelectFrom, idsToAdd)
}

export const itemDeselector = (selectedId, startingId, selected = [], itemsToSelectFrom) => {
  // If we are not operating on multiple items, just remove the id to the selected array
  if (startingId === false) return selected.filter((id) => selectedId !== id)

  // When a start position is passed in it means we are de-selecting a range
  const startPosition = itemsToSelectFrom.indexOf(startingId)
  const endPosition = itemsToSelectFrom.indexOf(selectedId)

  // We want to make sure we can select forward and backward in the range
  const idsToRemove =
    startPosition < endPosition
      ? itemsToSelectFrom.slice(startPosition, endPosition + 1)
      : itemsToSelectFrom.slice(endPosition, startPosition + 1)

  return selected.filter((id) => !idsToRemove.includes(id))
}

export function getItemsInOrder(selected, itemsToSelectFrom, idsToAdd) {
  // This de-duplicates the set .. but we want to maintain original order.
  const selectedIds = Array.from(new Set([...selected, ...idsToAdd]))
  return itemsToSelectFrom.filter((id) => selectedIds.includes(id))
}
