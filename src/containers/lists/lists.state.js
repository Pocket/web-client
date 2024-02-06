import { put, select, takeEvery, call } from 'redux-saga/effects'

import { getShareableListPilotStatus } from 'common/api/queries/get-shareable-lists-pilot-status'
import { getShareableLists } from 'common/api/queries/get-shareable-lists'
import { getShareableList } from 'common/api/queries/get-shareable-list'
import { getShareableListPublic } from 'common/api/queries/get-shareable-list-public'
import { getRecentShareableLists } from 'common/api/queries/get-shareable-lists-recent'

import { decodeSpecialChars } from 'common/api/derivers/shared-lists'
import { arrayToObject } from 'common/utilities/object-array/object-array'

import { LIST_ITEMS_SUCCESS } from 'actions'
import { LIST_PAGE_INFO_SUCCESS } from 'actions'

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

import { LIST_INDIVIDUAL_MORE_REQUEST } from 'actions'
import { LIST_INDIVIDUAL_MORE_FAILURE } from 'actions'

import { LIST_CREATE_SUCCESS } from 'actions'
import { LIST_DELETE_SUCCESS } from 'actions'
import { LIST_UPDATE_SUCCESS } from 'actions'

import { LIST_RECENT_REQUEST } from 'actions'
import { LIST_RECENT_SUCCESS } from 'actions'
import { LIST_RECENT_FAILURE } from 'actions'
import { LIST_ADD_ITEM_SUCCESS } from 'actions'
import { LIST_DELETE_ITEM_SUCCESS } from 'actions'
import { LIST_UPDATE_STATUS_SUCCESS } from 'actions'
import { LIST_ITEM_ADD_NOTE_SUCCESS } from 'actions'
import { LIST_ITEM_EDIT_NOTE_SUCCESS } from 'actions'
import { LIST_ITEM_NOTE_DELETE_SUCCESS } from 'actions'
import { LIST_ITEMS_REORDER_SUCCESS } from 'actions'

import { VARIANTS_SAVE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const checkListsPilotStatus = () => ({ type: LIST_CHECK_PILOT_STATUS_REQUEST })
export const listsItemsSetSortOrder = (sortOrder) => ({ type: LIST_PAGE_SET_SORT_ORDER_REQUEST, sortOrder }) //prettier-ignore
export const getAllListsAction = () => ({ type: LIST_ALL_REQUEST })
export const getIndividualListAction = (id) => ({ type: LIST_INDIVIDUAL_REQUEST, id })
export const getMoreIndividualListAction = (id) => ({ type: LIST_INDIVIDUAL_MORE_REQUEST, id })
export const getRecentListsAction = () => ({ type: LIST_RECENT_REQUEST })

/** LISTS PAGE REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  enrolled: false,
  enrolledFetched: false,
  sortOrder: 'DESC',
  loading: true,
  listsIds: [],
  pageInfo: {}
}

export const pageListsInfoReducers = (state = initialState, action) => {
  switch (action.type) {
    case LIST_PAGE_INFO_SUCCESS: {
      const { pageInfo } = action
      return { ...state, pageInfo, loading: false }
    }

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

    case LIST_ALL_REQUEST_SUCCESS: {
      const { externalIds, titleToIdList } = action
      return { ...state, loading: false, titleToIdList, listsIds: externalIds }
    }

    case LIST_INDIVIDUAL_MORE_REQUEST: {
      return { ...state, loading: true }
    }

    case LIST_RECENT_SUCCESS: {
      const { listsIds, titleToIdList } = action
      return { ...state, listsIds, titleToIdList }
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
  takeEvery(LIST_INDIVIDUAL_REQUEST, getIndividualList),
  takeEvery(LIST_INDIVIDUAL_MORE_REQUEST, getMoreIndividualList),
  takeEvery(
    [
      LIST_RECENT_REQUEST,
      LIST_CREATE_SUCCESS,
      LIST_DELETE_SUCCESS,
      LIST_UPDATE_SUCCESS,
      LIST_UPDATE_STATUS_SUCCESS,
      LIST_ADD_ITEM_SUCCESS,
      LIST_DELETE_ITEM_SUCCESS,
      LIST_ITEM_ADD_NOTE_SUCCESS,
      LIST_ITEM_EDIT_NOTE_SUCCESS,
      LIST_ITEM_NOTE_DELETE_SUCCESS,
      LIST_ITEMS_REORDER_SUCCESS
    ],
    getRecentLists
  )
]

/** SAGA :: SELECTORS
 --------------------------------------------------------------- */
const getSortOrder = (state) => state.pageListsInfo?.sortOrder
const getListsPageInfo = (state) => state.pageListsInfo?.pageInfo
const getListsItemIds = (state, id) => state.listsDisplay?.[id]?.listItemIds

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* fetchListPilotStatus() {
  try {
    const enrolled = yield getShareableListPilotStatus()
    const version = enrolled ? 'pilot.v1' : 'control'
    const variants = { 'shareable.lists': version }

    yield put({ type: VARIANTS_SAVE, variants })
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
    const { itemsById, pageInfo } = yield call(getShareableList, id)

    yield put({ type: LIST_PAGE_INFO_SUCCESS, pageInfo })
    yield put({ type: LIST_ITEMS_SUCCESS, itemsById })
  } catch (error) {
    yield put({ type: LIST_INDIVIDUAL_FAILURE, error })
  }
}

function* getMoreIndividualList({ id }) {
  try {
    const { endCursor } = yield select(getListsPageInfo)
    const pagination = { after: endCursor }

    const { itemsById, pageInfo } = yield call(getShareableList, id, pagination)

    // This little bummer of a blob is what inserts the new item ids
    // into the array the page uses to display the list
    const previousIds = yield select(getListsItemIds, id)
    // Don't want the id for the page itself to bleed into the display
    const newIds = Object.keys(itemsById).filter((val) => val !== id)
    const listItemIds = [...previousIds, ...newIds]

    // Adding newly fetched items, and updating the array of items
    // associated with this List
    const updatedItems = {
      ...itemsById,
      [id]: { listItemIds }
    }

    yield put({ type: LIST_PAGE_INFO_SUCCESS, pageInfo })
    yield put({ type: LIST_ITEMS_SUCCESS, itemsById: updatedItems })
  } catch (error) {
    yield put({ type: LIST_INDIVIDUAL_MORE_FAILURE, error })
  }
}

function* getRecentLists() {
  try {
    const shareableLists = yield getRecentShareableLists()
    const listsIds = shareableLists.map((list) => list.externalId)
    const lists = shareableLists.map(({ items, ...listInfo }) => listInfo)
    const itemsById = arrayToObject(lists, 'externalId')

    const titleToIdList = shareableLists.reduce(
      (obj, list) => ({ ...obj, [decodeSpecialChars(list.title)]: list.externalId }),
      {}
    )

    yield put({ type: LIST_RECENT_SUCCESS, listsIds, titleToIdList })
    yield put({ type: LIST_ITEMS_SUCCESS, itemsById })
  } catch {
    yield put({ type: LIST_RECENT_FAILURE })
  }
}

/** ASYNC REQUESTS
 --------------------------------------------------------------- */
export function fetchPublicListHydrationData({ slug, listId }) {
  return getShareableListPublic({ slug, listId })
}
