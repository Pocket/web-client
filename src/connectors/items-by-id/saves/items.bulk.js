import { put, takeEvery, select, call } from 'redux-saga/effects'

import { ITEMS_BULK_SELECT } from 'actions'
import { ITEMS_BULK_DESELECT } from 'actions'
import { ITEMS_BULK_TOGGLE } from 'actions'
import { ITEMS_BULK_ADD } from 'actions'
import { ITEMS_BULK_REMOVE } from 'actions'
import { ITEMS_BULK_CLEAR } from 'actions'
import { ITEMS_BULK_FIRE_ACTION } from 'actions'
import { ITEMS_BULK_BATCH_BEGIN } from 'actions'
import { ITEMS_BULK_BATCH_SUCCESS } from 'actions'
import { ITEMS_BULK_BATCH_FAILURE } from 'actions'
import { ITEMS_BULK_BATCH_COMPLETE } from 'actions'
import { ITEMS_ARCHIVE_CANCEL } from 'actions'
import { ITEMS_BULK_SET_CURRENT } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const itemsBulkSelectAction = (id, shift) => ({ type: ITEMS_BULK_SELECT, id, shift }) //prettier-ignore
export const itemsBulkDeSelectAction = (id, shift) => ({ type: ITEMS_BULK_DESELECT, id, shift }) //prettier-ignore
export const itemsBulkClear = () => ({ type: ITEMS_BULK_CLEAR })
export const itemsBulkAction = ( bulkAction ) => ({ type: ITEMS_BULK_FIRE_ACTION, bulkAction }) //prettier-ignore

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  selected: [],
  lastId: null,
  currentId: null,
  endPosition: 0,
  batchFavorite: 'favorite', // determines if the action is favorite/unfavorite
  batchStatus: 'archive', // determines if the action is archive/unarchive
  batchCount: 0,
  bulkAction: null,
  batchStart: false,
  batchTotal: 0
}

export const itemBulkReducers = (state = initialState, action) => {
  switch (action.type) {
    case ITEMS_BULK_SET_CURRENT: {
      const { currentId } = action
      return { ...state, currentId }
    }

    case ITEMS_BULK_ADD: {
      const { items, lastId, endPosition, batchFavorite, batchStatus } = action
      const selectedIds = state.selected.map((item) => item.id)
      return {
        ...state,
        lastId,
        endPosition,
        batchFavorite,
        batchStatus,
        selected: [...state.selected, ...items.filter((item) => !selectedIds.includes(item.id))]
      }
    }

    case ITEMS_BULK_REMOVE: {
      const { lastId, selected, batchFavorite, batchStatus } = action
      return { ...state, lastId, selected, batchFavorite, batchStatus }
    }

    case ITEMS_BULK_CLEAR:
    case ITEMS_BULK_BATCH_COMPLETE: {
      return initialState
    }

    case ITEMS_ARCHIVE_CANCEL: {
      return { ...state, batchCount: 0, batchStart: false }
    }

    case ITEMS_BULK_BATCH_BEGIN: {
      const { batchCount, bulkAction, batchTotal } = action
      return { ...state, batchCount, bulkAction, batchTotal, batchStart: true }
    }

    case ITEMS_BULK_BATCH_SUCCESS:
    case ITEMS_BULK_BATCH_FAILURE: {
      const { batchCount } = action
      return { ...state, batchCount }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const itemBulkSagas = [
  takeEvery(ITEMS_BULK_SELECT, itemBulkSelect),
  takeEvery(ITEMS_BULK_DESELECT, itemBulkDeSelect),
  takeEvery(ITEMS_BULK_TOGGLE, itemsBulkToggle)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getLastId = (state) => state.bulkEdit.lastId
const getEndPosition = (state) => state.bulkEdit.endPosition
const getSaves = (state) => state.saves
const getItemsById = (state) => state.savesItemsById
const getAppSection = (state) => state.app?.section
const getSelected = (state) => state.bulkEdit.selected

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function* itemBulkSelect(action) {
  try {
    const { id, shift } = action

    const lastId = yield select(getLastId)
    const endPosition = yield select(getEndPosition)
    const saves = yield select(getSaves)
    const appSection = yield select(getAppSection)
    const itemsById = yield select(getItemsById)

    const sectionItems = saves[appSection]
    const position = sectionItems.indexOf(id)
    const lastIdPosition = sectionItems.indexOf(lastId)
    const selected = yield select(getSelected)

    const newEndPosition = shift ? position : Math.max(position, endPosition)
    const itemIds = sectionItems.slice(lastIdPosition, position + 1)
    const items = shift
      ? itemIds.map((id) => {
          const itemPosition = sectionItems.indexOf(id)
          return {
            id,
            position: itemPosition,
            isFavorite: itemsById[id]?.isFavorite,
            isArchived: itemsById[id]?.isArchived,
            resolvedId: itemsById[id]?.resolvedId,
            saveUrl: itemsById[id]?.saveUrl
          }
        })
      : [
          {
            id,
            position,
            isFavorite: itemsById[id]?.isFavorite,
            isArchived: itemsById[id]?.isArchived,
            resolvedId: itemsById[id]?.resolvedId,
            saveUrl: itemsById[id]?.saveUrl
          }
        ]

    const [batchFavorite, batchStatus] = yield setBatchActions([...items, ...selected])

    yield put({
      type: ITEMS_BULK_ADD,
      lastId: id,
      endPosition: newEndPosition,
      batchFavorite,
      batchStatus,
      items
    })
  } catch (error) {
    console.warn(error)
  }
}

export function* itemBulkDeSelect(action) {
  try {
    const { id, shift } = action

    const endPosition = yield select(getEndPosition)
    const saves = yield select(getSaves)
    const appSection = yield select(getAppSection)
    const selected = yield select(getSelected)

    const sectionItems = saves[appSection]
    const position = sectionItems.indexOf(id)
    const itemIds = shift ? sectionItems.slice(position + 1, endPosition + 1) : [id]
    const draftSelected = selected.filter((item) => !itemIds.includes(item.id))
    const [batchFavorite, batchStatus] = yield setBatchActions(draftSelected)

    yield put({
      type: ITEMS_BULK_REMOVE,
      items: itemIds,
      lastId: id,
      selected: draftSelected,
      endPosition: position,
      batchFavorite,
      batchStatus
    })
  } catch (error) {
    console.warn(error)
  }
}

function* itemsBulkToggle(action) {
  const { id } = action
  const selected = yield select(getSelected)
  const isSelected = selected.filter((item) => item.id === id)
  yield isSelected.length ? call(itemBulkDeSelect, { id }) : call(itemBulkSelect, { id })
}

function setBatchActions(draft) {
  if (draft.length < 1) {
    return [initialState.batchFavorite, initialState.batchStatus]
  }

  const batchFavorite = draft.every((item) => item.isFavorite) ? 'unfavorite' : 'favorite'
  const batchStatus = draft.every((item) => item.isArchived) ? 'add' : 'archive'

  return [batchFavorite, batchStatus]
}
