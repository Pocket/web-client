import { put, takeEvery, take, race, select, call } from 'redux-saga/effects'

import { ITEMS_BULK_SELECT } from 'actions'
import { ITEMS_BULK_DESELECT } from 'actions'
import { ITEMS_BULK_ADD } from 'actions'
import { ITEMS_BULK_REMOVE } from 'actions'
import { ITEMS_BULK_CLEAR } from 'actions'
import { ITEMS_BULK_FIRE_ACTION } from 'actions'
import { ITEMS_BULK_BATCH_BEGIN } from 'actions'
import { ITEMS_BULK_BATCH_SUCCESS } from 'actions'
import { ITEMS_BULK_BATCH_FAILURE } from 'actions'
import { ITEMS_BULK_BATCH_COMPLETE } from 'actions'
import { ITEMS_ARCHIVE_CANCEL } from 'actions'

import { ITEMS_FAVORITE_BATCH } from 'actions'
import { ITEMS_UNFAVORITE_BATCH } from 'actions'

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
    case ITEMS_BULK_ADD: {
      const { items, lastId, endPosition, batchFavorite, batchStatus } = action
      const selectedIds = state.selected.map((item) => item.id)
      return {
        ...state,
        lastId,
        endPosition,
        batchFavorite,
        batchStatus,
        selected: [
          ...state.selected,
          ...items.filter((item) => !selectedIds.includes(item.id))
        ]
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

    case ITEMS_FAVORITE_BATCH: {
      return { ...state, batchFavorite: 'unfavorite' }
    }
    case ITEMS_UNFAVORITE_BATCH: {
      return { ...state, batchFavorite: 'favorite' }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const itemBulkSagas = [
  takeEvery(ITEMS_BULK_SELECT, itemBulkSelect),
  takeEvery(ITEMS_BULK_DESELECT, itemBulkDeSelect)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getLastId = (state) => state.bulkEdit.lastId
const getEndPosition = (state) => state.bulkEdit.endPosition
const getMyList = (state) => state.myList
const getItemsById = (state) => state.myListItemsById
const getAppSection = (state) => state.app?.section
const getSelected = (state) => state.bulkEdit.selected

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function* itemBulkSelect(action) {
  try {
    const { id, shift } = action

    const lastId = yield select(getLastId)
    const endPosition = yield select(getEndPosition)
    const myList = yield select(getMyList)
    const appSection = yield select(getAppSection)
    const itemsById = yield select(getItemsById)

    const sectionItems = myList[appSection]
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
            favorite: itemsById[id]?.favorite,
            status: itemsById[id]?.status,
            resolved_id: itemsById[id]?.resolved_id,
            save_url: itemsById[id]?.save_url
          }
        })
      : [
          {
            id,
            position,
            favorite: itemsById[id]?.favorite,
            status: itemsById[id]?.status,
            resolved_id: itemsById[id]?.resolved_id,
            save_url: itemsById[id]?.save_url
          }
        ]

    const [batchFavorite, batchStatus] = yield setBatchActions([
      ...items,
      ...selected
    ])

    yield put({
      type: ITEMS_BULK_ADD,
      lastId: id,
      endPosition: newEndPosition,
      batchFavorite,
      batchStatus,
      items
    })
  } catch (error) {
    console.log(error)
  }
}

export function* itemBulkDeSelect(action) {
  try {
    const { id, shift } = action

    const endPosition = yield select(getEndPosition)
    const myList = yield select(getMyList)
    const appSection = yield select(getAppSection)
    const selected = yield select(getSelected)

    const sectionItems = myList[appSection]
    const position = sectionItems.indexOf(id)
    const itemIds = shift
      ? sectionItems.slice(position + 1, endPosition + 1)
      : [id]
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
    console.log(error)
  }
}

function setBatchActions(draft) {
  if (draft.length < 1) {
    return [initialState.batchFavorite, initialState.batchStatus]
  }

  const batchFavorite = draft.every((item) => item.favorite === '1')
    ? 'unfavorite'
    : 'favorite'

  const batchStatus = draft.every((item) => item.status === '0')
    ? 'archive'
    : 'add'

  return [batchFavorite, batchStatus]
}
