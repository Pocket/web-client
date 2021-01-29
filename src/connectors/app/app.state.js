import { takeLatest, put, select } from 'redux-saga/effects'
import { APP_DEV_MODE_TOGGLE } from 'actions'
import { APP_SET_BASE_URL } from 'actions'
import { APP_SET_MODE } from 'actions'
import { APP_SET_SECTION } from 'actions'
import { APP_LIST_MODE_TOGGLE } from 'actions'
import { APP_LIST_MODE_SET } from 'actions'
import { APP_SORT_ORDER_TOGGLE } from 'actions'
import { APP_SORT_ORDER_SET } from 'actions'
import { APP_LIST_MODE_LIST } from 'actions'
import { APP_LIST_MODE_GRID } from 'actions'
import { APP_LIST_MODE_DETAIL } from 'actions'
import { ITEMS_BULK_CLEAR } from 'actions'

import { HYDRATE } from 'actions'
import { setCookie } from 'nookies'

const initialState = {
  devMode: false,
  mode: 'default',
  listMode: 'grid',
  sortOrder: 'initial'
}

const yearInMs = 60 * 60 * 24 * 365

/** ACTIONS
 --------------------------------------------------------------- */
export const devModeToggle = () => ({ type: APP_DEV_MODE_TOGGLE })
export const appSetBaseURL = (baseURL) => ({ type: APP_SET_BASE_URL, baseURL })
export const appSetMode = (mode) => ({ type: APP_SET_MODE, mode })
export const appSetSection = (section) => ({ type: APP_SET_SECTION, section })

export const listModeToggle = () => ({ type: APP_LIST_MODE_TOGGLE })
export const listModeSet = (listMode) => ({ type: APP_LIST_MODE_SET, listMode }) //prettier-ignore
export const setListModeList = () => ({type: APP_LIST_MODE_LIST, listMode: 'list'}) //prettier-ignore
export const setListModeGrid = () => ({type: APP_LIST_MODE_GRID, listMode: 'grid'}) //prettier-ignore
export const setListModeDetail = () => ({type: APP_LIST_MODE_DETAIL, listMode: 'detail'}) //prettier-ignore

export const sortOrderToggle = () => ({ type: APP_SORT_ORDER_TOGGLE })
export const sortOrderSet = (sortOrder) => ({type: APP_SORT_ORDER_SET, sortOrder}) //prettier-ignore

/** REDUCERS
 --------------------------------------------------------------- */
export const appReducers = (state = initialState, action) => {
  switch (action.type) {
    case APP_DEV_MODE_TOGGLE: {
      const devModeState = state.devMode
      return { ...state, devMode: !devModeState }
    }

    case APP_LIST_MODE_SET: {
      const { listMode } = action
      return { ...state, listMode }
    }

    case APP_SORT_ORDER_SET: {
      const { sortOrder } = action
      return { ...state, sortOrder }
    }

    case APP_SET_BASE_URL: {
      const { baseURL } = action
      return { ...state, baseURL }
    }

    case APP_SET_SECTION: {
      const { section } = action
      return { ...state, section }
    }

    case APP_SET_MODE: {
      // MODES
      // default
      // search
      // add
      // bulk
      const { mode } = action
      return { ...state, mode }
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE:
      const { app } = action.payload
      return { ...state, baseURL: app.baseURL }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const appSagas = [
  takeLatest(APP_SET_MODE, appModeSwitch),
  takeLatest(APP_LIST_MODE_TOGGLE, appListModeToggle),
  takeLatest(APP_SORT_ORDER_TOGGLE, appSortOrderToggle),
  takeLatest(APP_LIST_MODE_LIST, appListModeSet),
  takeLatest(APP_LIST_MODE_GRID, appListModeSet),
  takeLatest(APP_LIST_MODE_DETAIL, appListModeSet)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
const getListMode = (state) => state.app.listMode
const getSortOrder = (state) => state.app.sortOrder

function* appModeSwitch(action) {
  const { mode } = action
  if (mode !== 'bulk') yield put({ type: ITEMS_BULK_CLEAR })
}

function* appListModeSet(action) {
  const { listMode } = action
  setCookie(null, 'list_mode', listMode, { samesite: 'strict', path: '/', maxAge: yearInMs }) //prettier-ignore
  yield put({ type: APP_LIST_MODE_SET, listMode })
}

function* appListModeToggle() {
  const listMode = yield select(getListMode)
  const newListMode = listMode === 'grid' ? 'list' : 'grid'
  setCookie(null, 'list_mode', newListMode, { samesite: 'strict', path: '/', maxAge: yearInMs }) //prettier-ignore

  yield put({ type: APP_LIST_MODE_SET, listMode: newListMode })
}

function* appSortOrderToggle() {
  const sortOrder = yield select(getSortOrder)
  const newSortOrder = sortOrder === 'newest' ? 'oldest' : 'newest'
  setCookie(null, 'sort_order', newSortOrder, { samesite: 'strict', path: '/', maxAge: yearInMs }) //prettier-ignore

  yield put({ type: APP_SORT_ORDER_SET, sortOrder: newSortOrder })
}
