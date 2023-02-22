import { put, select, takeEvery, call } from 'redux-saga/effects'

import { getShareableList } from 'common/api/queries/get-shareable-list'

import { ITEMS_SHAREABLE_LIST_REQUEST } from 'actions'
import { ITEMS_SHAREABLE_LIST_SUCCESS } from 'actions'
import { ITEMS_SHAREABLE_LIST_FAILURE } from 'actions'

import { ITEMS_LISTS_PAGE_SET_SORT_ORDER_REQUEST } from 'actions'
import { ITEMS_LISTS_PAGE_SET_SORT_ORDER } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getIndividualListAction = (id) => ({ type: ITEMS_SHAREABLE_LIST_REQUEST, id })
export const listsItemsSetSortOrder = (sortOrder) => ({type: ITEMS_LISTS_PAGE_SET_SORT_ORDER_REQUEST, sortOrder}) //prettier-ignore

/** LIST SAVED REDUCERS
 --------------------------------------------------------------- */
export const pageListsIdsReducers = (state = [], action) => {
  switch (action.type) {
    case ITEMS_LISTS_PAGE_SET_SORT_ORDER: {
      return []
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
  error: false
}

export const pageListsInfoReducers = (state = initialState, action) => {
  switch (action.type) {
    case ITEMS_LISTS_PAGE_SET_SORT_ORDER: {
      const { sortOrder } = action
      return { ...state, sortOrder }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const pageListsIdsSagas = [
  takeEvery(ITEMS_SHAREABLE_LIST_REQUEST, getIndividualList),
  takeEvery(ITEMS_LISTS_PAGE_SET_SORT_ORDER_REQUEST, adjustSortOrder),
]

/** SAGA :: SELECTORS
 --------------------------------------------------------------- */
const getSortOrder = (state) => state.pageListsInfo?.sortOrder

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* getIndividualList({ id }) {
  try {
    const response = yield call(getShareableList, id)
    // const { listItems, ...rest } = response

    yield put({ type: ITEMS_SHAREABLE_LIST_SUCCESS })
  } catch (error) {
    yield put({ type: ITEMS_SHAREABLE_LIST_FAILURE, error })
  }
}

function* adjustSortOrder(action) {
  const {sortOrder} = action
  const currentSortOrder = yield select(getSortOrder)

  // Don't change sort order if it's already in the same space
  if(currentSortOrder === sortOrder) return

  yield put({type: ITEMS_LISTS_PAGE_SET_SORT_ORDER, sortOrder})
}
