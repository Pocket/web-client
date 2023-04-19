import { put, select, takeEvery, call } from 'redux-saga/effects'

import { getShareableListPilotStatus } from 'common/api/queries/get-shareable-lists-pilot-status'
import { getShareableLists } from 'common/api/queries/get-shareable-lists'
import { getShareableList } from 'common/api/queries/get-shareable-list'
import { getShareableListPublic } from 'common/api/queries/get-shareable-list-public'

import { LIST_ITEMS_SUCCESS } from 'actions'

import { LIST_CHECK_PILOT_STATUS_REQUEST } from 'actions'
import { LIST_CHECK_PILOT_STATUS_SUCCESS } from 'actions'
import { LIST_CHECK_PILOT_STATUS_FAILURE } from 'actions'

import { LIST_PAGE_SET_SORT_ORDER_REQUEST } from 'actions'
import { LIST_PAGE_SET_SORT_ORDER } from 'actions'
import { LIST_ALL_REQUEST } from 'actions'
import { LIST_ALL_REQUEST_SUCCESS } from 'actions'
import { LIST_ALL_REQUEST_FAILURE } from 'actions'

import { LIST_INDIVIDUAL_REQUEST } from 'actions'
import { LIST_INDIVIDUAL_FAILURE } from 'actions'

import { LIST_CREATE_SUCCESS } from 'actions'
import { LIST_DELETE_SUCCESS } from 'actions'

import { VARIANTS_SAVE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const checkListsPilotStatus = () => ({ type: LIST_CHECK_PILOT_STATUS_REQUEST })
export const listsItemsSetSortOrder = (sortOrder) => ({type: LIST_PAGE_SET_SORT_ORDER_REQUEST, sortOrder}) //prettier-ignore
export const getAllListsAction = () => ({ type: LIST_ALL_REQUEST })
export const getIndividualListAction = (id) => ({ type: LIST_INDIVIDUAL_REQUEST, id })

/** LISTS PAGE REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  enrolled: false,
  enrolledFetched: false,
  sortOrder: 'DESC',
  loading: true,
  listsIds: []
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
      const listsIds = [externalId, ...state.listsIds]
      const titleToIdList = { [listTitle]: externalId, ...state.titleToIdList }
      return { ...state, titleToIdList, listsIds }
    }

    case LIST_DELETE_SUCCESS: {
      const { deletedId } = action
      const listsIds = state.listsIds.filter((id) => id !== deletedId)
      const titleToIdList = Object.keys(state.titleToIdList)
        .filter((title) => state.titleToIdList[title] !== deletedId)
        .reduce((obj, title) => ({ ...obj, [title]: state.titleToIdList[title] }), {})
      return { ...state, titleToIdList, listsIds }
    }

    case LIST_ALL_REQUEST_SUCCESS: {
      const { externalIds, titleToIdList } = action
      return { ...state, loading: false, titleToIdList, listsIds: externalIds }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const pageListsInfoSagas = [
  takeEvery(LIST_CHECK_PILOT_STATUS_REQUEST, fetchListPilotStatus),
  takeEvery(LIST_PAGE_SET_SORT_ORDER_REQUEST, adjustSortOrder),
  takeEvery(LIST_ALL_REQUEST, getAllLists),
  takeEvery(LIST_INDIVIDUAL_REQUEST, getIndividualList)
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

function* getAllLists() {
  try {
    const { externalIds, itemsById, titleToIdList } = yield getShareableLists()

    yield put({ type: LIST_ITEMS_SUCCESS, itemsById })
    return yield put({ type: LIST_ALL_REQUEST_SUCCESS, externalIds, titleToIdList })
  } catch {
    return yield put({ type: LIST_ALL_REQUEST_FAILURE })
  }
}

function* getIndividualList({ id }) {
  try {
    const { itemsById } = yield call(getShareableList, id)

    yield put({ type: LIST_ITEMS_SUCCESS, itemsById })
  } catch (error) {
    yield put({ type: LIST_INDIVIDUAL_FAILURE, error })
  }
}

/** ASYNC REQUESTS
 --------------------------------------------------------------- */
 export function fetchPublicListHydrationData({ slug, listId }) {
  return getShareableListPublic({ slug, listId })
}
