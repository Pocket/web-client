import { put, select, takeEvery } from 'redux-saga/effects'

import { getShareableLists } from 'common/api/queries/get-shareable-lists'

import { ITEMS_LISTS_PAGE_SET_SORT_ORDER_REQUEST } from 'actions'
import { ITEMS_LISTS_PAGE_SET_SORT_ORDER } from 'actions'
import { USER_SHAREABLE_LISTS_REQUEST } from 'actions'
import { USER_SHAREABLE_LISTS_REQUEST_SUCCESS } from 'actions'
import { USER_SHAREABLE_LISTS_REQUEST_FAILURE } from 'actions'
import { ITEMS_CREATE_LIST_SUCCESS } from 'actions'
import { SHAREABLE_LIST_DELETE_SUCCESS } from 'actions'
import { arrayToObject } from 'common/utilities/object-array/object-array'

/** ACTIONS
 --------------------------------------------------------------- */
export const listsItemsSetSortOrder = (sortOrder) => ({type: ITEMS_LISTS_PAGE_SET_SORT_ORDER_REQUEST, sortOrder}) //prettier-ignore
export const getUserShareableLists = () => ({ type: USER_SHAREABLE_LISTS_REQUEST })

/** LIST SAVED REDUCERS
 --------------------------------------------------------------- */
export const pageListsIdsReducers = (state = [], action) => {
  switch (action.type) {
    case ITEMS_LISTS_PAGE_SET_SORT_ORDER: {
      return []
    }

    case ITEMS_CREATE_LIST_SUCCESS: {
      const { externalId } = action
      return [externalId, ...state]
    }

    case SHAREABLE_LIST_DELETE_SUCCESS:
    case USER_SHAREABLE_LISTS_REQUEST_SUCCESS: {
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
  sortOrder: 'DESC',
  count: 30,
  loading: true,
  totalCount: 0,
  error: false,
  userShareableLists: false
}

export const pageListsInfoReducers = (state = initialState, action) => {
  switch (action.type) {
    case ITEMS_LISTS_PAGE_SET_SORT_ORDER: {
      const { sortOrder } = action
      return { ...state, sortOrder }
    }

    case ITEMS_CREATE_LIST_SUCCESS: {
      const { newList, externalId } = action
      return {
        ...state,
        [externalId]: newList
      }
    }

    case USER_SHAREABLE_LISTS_REQUEST_SUCCESS: {
      const { allLists } = action
      return {
        ...state,
        ...allLists,
        loading: false
      }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const pageListsIdsSagas = [
  takeEvery(ITEMS_LISTS_PAGE_SET_SORT_ORDER_REQUEST, adjustSortOrder),
  takeEvery(USER_SHAREABLE_LISTS_REQUEST, userShareableListsRequest)
]

/** SAGA :: SELECTORS
 --------------------------------------------------------------- */
const getSortOrder = (state) => state.pageListsInfo?.sortOrder

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* adjustSortOrder(action) {
  const { sortOrder } = action
  const currentSortOrder = yield select(getSortOrder)

  // Don't change sort order if it's already in the same space
  if (currentSortOrder === sortOrder) return

  yield put({ type: ITEMS_LISTS_PAGE_SET_SORT_ORDER, sortOrder })
}

function* userShareableListsRequest() {
  try {
    const userShareableLists = yield getShareableLists()
    const externalIds = userShareableLists.map((list) => list.externalId)
    const allLists = arrayToObject(userShareableLists, 'externalId')

    return yield put({
      type: USER_SHAREABLE_LISTS_REQUEST_SUCCESS,
      allLists,
      externalIds
    })
  } catch {
    return yield put({ type: USER_SHAREABLE_LISTS_REQUEST_FAILURE })
  }
}
