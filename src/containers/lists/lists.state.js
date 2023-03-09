import { put, select, takeEvery } from 'redux-saga/effects'

import { getShareableListPilotStatus } from 'common/api/queries/get-shareable-lists-pilot-status'
import { getShareableLists } from 'common/api/queries/get-shareable-lists'

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
import { arrayToObject } from 'common/utilities/object-array/object-array'

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

    case LIST_DELETE_SUCCESS:
    case LIST_ALL_REQUEST_SUCCESS: {
      const { externalIds } = action
      return [...externalIds]
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
  loading: true,
  userShareableLists: false
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
      const { newList, externalId } = action
      return {
        ...state,
        [externalId]: newList
      }
    }

    case LIST_ALL_REQUEST_SUCCESS: {
      const { allLists, titleToIdList } = action
      return {
        ...state,
        ...allLists,
        loading: false,
        titleToIdList
      }
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
    const response = yield getShareableListPilotStatus()
    yield put({ type: LIST_CHECK_PILOT_STATUS_SUCCESS, enrolled: response })
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
    const userShareableLists = yield getShareableLists()
    const externalIds = userShareableLists.map((list) => list.externalId)
    const allLists = arrayToObject(userShareableLists, 'externalId')
    const titleToIdList = userShareableLists.reduce((obj, list) => ({ ...obj, [list.title]: list.externalId }), {})

    return yield put({
      type: LIST_ALL_REQUEST_SUCCESS,
      allLists,
      externalIds,
      titleToIdList
    })
  } catch {
    return yield put({ type: LIST_ALL_REQUEST_FAILURE })
  }
}
