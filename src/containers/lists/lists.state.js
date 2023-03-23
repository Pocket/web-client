import { put, select, takeEvery } from 'redux-saga/effects'

import { getShareableListPilotStatus } from 'common/api/queries/get-shareable-lists-pilot-status'
import { getShareableLists } from 'common/api/queries/get-shareable-lists'

import { LIST_ITEMS_SUCCESS } from 'actions'

import { LIST_CHECK_PILOT_STATUS_REQUEST } from 'actions'
import { LIST_CHECK_PILOT_STATUS_SUCCESS } from 'actions'
import { LIST_CHECK_PILOT_STATUS_FAILURE } from 'actions'

import { LIST_PAGE_SET_SORT_ORDER_REQUEST } from 'actions'
import { LIST_PAGE_SET_SORT_ORDER } from 'actions'
import { LIST_ALL_REQUEST } from 'actions'
import { LIST_ALL_REQUEST_SUCCESS } from 'actions'
import { LIST_ALL_REQUEST_FAILURE } from 'actions'

import { LIST_CREATE_SUCCESS } from 'actions'
import { LIST_DELETE_SUCCESS } from 'actions'

import { VARIANTS_SAVE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const checkListsPilotStatus = () => ({ type: LIST_CHECK_PILOT_STATUS_REQUEST })
export const listsItemsSetSortOrder = (sortOrder) => ({type: LIST_PAGE_SET_SORT_ORDER_REQUEST, sortOrder}) //prettier-ignore
export const getUserShareableLists = () => ({ type: LIST_ALL_REQUEST })

/** LIST SAVED REDUCERS
 --------------------------------------------------------------- */
export const pageListsIdsReducers = (state = [], action) => {
  switch (action.type) {
    case LIST_PAGE_SET_SORT_ORDER: {
      return state.reverse()
    }

    case LIST_CREATE_SUCCESS: {
      const { externalId } = action
      return [externalId, ...state]
    }

    case LIST_DELETE_SUCCESS: {
      const { deletedId } = action
      const externalIds = state.filter((id) => id !== deletedId)
      return externalIds
    }

    case LIST_ALL_REQUEST_SUCCESS: {
      const { externalIds } = action
      return externalIds
    }

    default:
      return state
  }
}

/** PAGINATION REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  enrolled: false,
  enrolledFetched: false,
  sortOrder: 'DESC',
  loading: true
}

export const pageListsInfoReducers = (state = initialState, action) => {
  switch (action.type) {
    case LIST_CHECK_PILOT_STATUS_SUCCESS: {
      const { enrolled } = action
      return { ...state, enrolled, enrolledFetched: true }
    }

    case LIST_CHECK_PILOT_STATUS_FAILURE: {
      return { ...state, enrolledFetched: true }
    }

    case LIST_PAGE_SET_SORT_ORDER: {
      const { sortOrder } = action
      return { ...state, sortOrder }
    }

    case LIST_CREATE_SUCCESS: {
      const { externalId, listTitle } = action
      const titleToIdList = { [listTitle]: externalId, ...state.titleToIdList }
      return { ...state, titleToIdList }
    }

    case LIST_DELETE_SUCCESS: {
      const { deletedId } = action
      const titleToIdList = Object.keys(state.titleToIdList)
        .filter((title) => state.titleToIdList[title] !== deletedId)
        .reduce((obj, title) => ({ ...obj, [title]: state.titleToIdList[title] }), {}) 
      return { ...state, titleToIdList }
    }

    case LIST_ALL_REQUEST_SUCCESS: {
      const { titleToIdList } = action
      return { ...state, loading: false, titleToIdList }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const pageListsIdsSagas = [
  takeEvery(LIST_CHECK_PILOT_STATUS_REQUEST, fetchListPilotStatus),
  takeEvery(LIST_PAGE_SET_SORT_ORDER_REQUEST, adjustSortOrder),
  takeEvery(LIST_ALL_REQUEST, userShareableListsRequest)
]

/** SAGA :: SELECTORS
 --------------------------------------------------------------- */
const getSortOrder = (state) => state.pageListsInfo?.sortOrder

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* fetchListPilotStatus() {
  try {
    const enrolled = yield getShareableListPilotStatus()
    const version = (enrolled) ? 'pilot.v1' : 'control'
    const variants = { 'shareable.lists': version }

    yield put ({ type: VARIANTS_SAVE, variants })
    yield put({ type: LIST_CHECK_PILOT_STATUS_SUCCESS, enrolled })
  } catch {
    yield put({ type: LIST_CHECK_PILOT_STATUS_FAILURE })
  }
}

function* adjustSortOrder(action) {
  const { sortOrder } = action
  const currentSortOrder = yield select(getSortOrder)

  // Don't change sort order if it's already in the same space
  if (currentSortOrder === sortOrder) return

  yield put({ type: LIST_PAGE_SET_SORT_ORDER, sortOrder })
}

function* userShareableListsRequest() {
  try {
    const { externalIds, itemsById, titleToIdList } = yield getShareableLists()

    yield put({ type: LIST_ITEMS_SUCCESS, itemsById })
    return yield put({ type: LIST_ALL_REQUEST_SUCCESS, externalIds, titleToIdList })
  } catch {
    return yield put({ type: LIST_ALL_REQUEST_FAILURE })
  }
}
