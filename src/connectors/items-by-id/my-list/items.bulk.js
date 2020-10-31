import { put, call, takeEvery, select } from 'redux-saga/effects'
import { sendItemActions } from 'common/api/item-actions'

import { ITEMS_BULK_SELECT } from 'actions'
import { ITEMS_BULK_DESELECT } from 'actions'
import { ITEMS_BULK_ADD } from 'actions'
import { ITEMS_BULK_REMOVE } from 'actions'
import { ITEMS_BULK_CLEAR } from 'actions'
import { ITEMS_BULK_TAG } from 'actions'
import { ITEMS_BULK_FAVORITE } from 'actions'
import { ITEMS_BULK_ARCHIVE } from 'actions'
import { ITEMS_BULK_DELETE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const itemsBulkSelectAction = (id, shift) => ({ type: ITEMS_BULK_SELECT, id, shift }) //prettier-ignore
export const itemsBulkDeSelectAction = (id, shift) => ({ type: ITEMS_BULK_DESELECT, id, shift }) //prettier-ignore
export const itemsBulkClear = () => ({ type: ITEMS_BULK_CLEAR })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = { selected: [], lastId: null }

export const itemBulkReducers = (state = initialState, action) => {
  switch (action.type) {
    case ITEMS_BULK_ADD: {
      const { items } = action
      const lastId = items.slice(-1)[0]
      return {
        ...state,
        lastId,
        selected: [...new Set([...state.selected, ...items])]
      }
    }

    case ITEMS_BULK_REMOVE: {
      const { items } = action
      const lastId = items.slice(-1)[0]

      return {
        ...state,
        lastId,
        selected: state.selected.filter((item) => !items.includes(item))
      }
    }

    case ITEMS_BULK_CLEAR: {
      return initialState
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
const getMyList = (state) => state.myList
const getAppSection = (state) => state.app?.section

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function* itemBulkSelect(action) {
  try {
    const { id, shift } = action

    if (!shift) return yield put({ type: ITEMS_BULK_ADD, items: [id] })

    const lastId = yield select(getLastId)
    const myList = yield select(getMyList)
    const appSection = yield select(getAppSection)

    const sectionItems = myList[appSection]

    const lastIdPosition = sectionItems.indexOf(lastId)
    const currentIdPosition = sectionItems.indexOf(id)

    const items = sectionItems.slice(lastIdPosition, currentIdPosition + 1)

    yield put({ type: ITEMS_BULK_ADD, items })
  } catch (error) {
    console.log(error)
  }
}

export function* itemBulkDeSelect(action) {
  try {
    const { id, shift } = action

    if (!shift) yield put({ type: ITEMS_BULK_REMOVE, items: [id] })
  } catch (error) {
    console.log(error)
  }
}
