import { localStore } from 'common/utilities/browser-storage/browser-storage'
import { takeLatest, put, select, call } from 'redux-saga/effects'

import { APP_DEV_MODE_TOGGLE } from 'actions'
import { APP_SET_BASE_URL } from 'actions'
import { APP_SET_MODE } from 'actions'
import { APP_SET_SECTION } from 'actions'
import { APP_SET_PREFERENCES } from 'actions'
import { APP_LIST_MODE_TOGGLE } from 'actions'
import { APP_LIST_MODE_SET } from 'actions'

import { APP_SORT_ORDER_TOGGLE } from 'actions'
import { APP_SORT_ORDER_OLD } from 'actions'
import { APP_SORT_ORDER_NEW } from 'actions'
import { APP_SORT_ORDER_RELEVANCE } from 'actions'
import { APP_SORT_ORDER_SET } from 'actions'

import { APP_LIST_MODE_LIST } from 'actions'
import { APP_LIST_MODE_GRID } from 'actions'
import { APP_LIST_MODE_DETAIL } from 'actions'

import { APP_COLOR_MODE_SET } from 'actions'

import { APP_SET_RELEASE } from 'actions'
import { APP_UPDATE_RELEASE } from 'actions'

import { ITEMS_BULK_CLEAR } from 'actions'

import { HYDRATE } from 'actions'
import { parseCookies, destroyCookie } from 'nookies'

import { COLOR_MODE_PREFIX } from 'common/constants'
import { CACHE_KEY_COLOR_MODE } from 'common/constants'
import { CACHE_KEY_LIST_MODE } from 'common/constants'
import { CACHE_KEY_SORT_OPTIONS } from 'common/constants'
import { CACHE_KEY_RELEASE_VERSION } from 'common/constants'

const initialState = {
  devMode: false,
  mode: 'default',
  listMode: 'grid',
  colorMode: 'light',
  sortOptions: {},
  releaseVersion: null
}

/** ACTIONS
 --------------------------------------------------------------- */
export const devModeToggle = () => ({ type: APP_DEV_MODE_TOGGLE })
export const appSetBaseURL = (baseURL) => ({ type: APP_SET_BASE_URL, baseURL })
export const appSetMode = (mode) => ({ type: APP_SET_MODE, mode })
export const appSetSection = (section) => ({ type: APP_SET_SECTION, section })
export const appSetPreferences = () => ({ type: APP_SET_PREFERENCES })

export const listModeToggle = () => ({ type: APP_LIST_MODE_TOGGLE })
export const listModeSet = (listMode) => ({ type: APP_LIST_MODE_SET, listMode }) //prettier-ignore
export const setListModeList = () => ({type: APP_LIST_MODE_LIST, listMode: 'list'}) //prettier-ignore
export const setListModeGrid = () => ({type: APP_LIST_MODE_GRID, listMode: 'grid'}) //prettier-ignore
export const setListModeDetail = () => ({type: APP_LIST_MODE_DETAIL, listMode: 'detail'}) //prettier-ignore

export const sortOrderToggle = () => ({ type: APP_SORT_ORDER_TOGGLE })
export const sortOrderSetOld = () => ({ type: APP_SORT_ORDER_OLD, sortOrder: 'oldest' }) //prettier-ignore
export const sortOrderSetNew = () => ({ type: APP_SORT_ORDER_NEW, sortOrder: 'newest' }) //prettier-ignore
export const sortOrderSetRelevance = () => ({ type: APP_SORT_ORDER_RELEVANCE, sortOrder: 'relevance' }) //prettier-ignore

export const setColorMode = (colorMode) => ({ type: APP_COLOR_MODE_SET, colorMode }) //prettier-ignore
export const setColorModeLight = () => ({ type: APP_COLOR_MODE_SET, colorMode: 'light' }) //prettier-ignore
export const setColorModeDark = () => ({ type: APP_COLOR_MODE_SET, colorMode: 'dark' }) //prettier-ignore
export const setColorModeSepia = () => ({ type: APP_COLOR_MODE_SET, colorMode: 'sepia' }) //prettier-ignore

export const setReleaseNotes = (releaseVersion) => ({ type: APP_UPDATE_RELEASE, releaseVersion }) //prettier-ignore

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
      const { sortOrder, subset } = action
      const sortOptions = { ...state.sortOptions, [subset]: sortOrder }
      return { ...state, sortOptions }
    }

    case APP_SET_BASE_URL: {
      const { baseURL } = action
      return { ...state, baseURL }
    }

    case APP_SET_SECTION: {
      const { section } = action
      return { ...state, section }
    }

    case APP_COLOR_MODE_SET: {
      const { colorMode = 'light' } = action
      return { ...state, colorMode }
    }

    case APP_SET_MODE: {
      // MODES  [default, search, add, bulk]
      const { mode } = action
      return { ...state, mode }
    }

    case APP_SET_RELEASE: {
      const { releaseVersion } = action
      return { ...state, releaseVersion }
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
  takeLatest(APP_SET_PREFERENCES, appPreferences),
  takeLatest(APP_SET_MODE, appModeSwitch),
  takeLatest(APP_LIST_MODE_TOGGLE, appListModeToggle),
  takeLatest(APP_SORT_ORDER_TOGGLE, appSortOrderToggle),
  takeLatest(APP_SORT_ORDER_OLD, appSortOrderSet),
  takeLatest(APP_SORT_ORDER_NEW, appSortOrderSet),
  takeLatest(APP_SORT_ORDER_RELEVANCE, appSortOrderSet),
  takeLatest(APP_LIST_MODE_LIST, appListModeSet),
  takeLatest(APP_LIST_MODE_GRID, appListModeSet),
  takeLatest(APP_LIST_MODE_DETAIL, appListModeSet),
  takeLatest(APP_COLOR_MODE_SET, appColorModeSet),
  takeLatest(APP_UPDATE_RELEASE, appReleaseNotesSet)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
const getListMode = (state) => state.app.listMode
const getSubset = (state) => state.app.section
const getSortOptions = (state) => state.app.sortOptions
const getSortOptionsBySubset = (state, subset) => state.app.sortOptions[subset] || 'newest'

function* appModeSwitch(action) {
  const { mode } = action
  if (mode !== 'bulk') yield put({ type: ITEMS_BULK_CLEAR })
}

function appColorModeSet(action) {
  const { colorMode } = action
  localStore.setItem(CACHE_KEY_COLOR_MODE, colorMode)
  setColorClass(colorMode)
}

function* appListModeSet(action) {
  const { listMode } = action
  localStore.setItem(CACHE_KEY_LIST_MODE, listMode)
  yield put({ type: APP_LIST_MODE_SET, listMode })
}

function* appListModeToggle() {
  const listMode = yield select(getListMode)
  const newListMode = listMode === 'grid' ? 'list' : 'grid'
  yield call(appListModeSet, { listMode: newListMode })
}

function* appSortOrderSet({ sortOrder }) {
  const subset = yield select(getSubset)
  const oldSortOptions = yield select(getSortOptions)
  const updatedSortOptions = { ...oldSortOptions, [subset]: sortOrder }
  localStore.setItem(CACHE_KEY_SORT_OPTIONS, JSON.stringify(updatedSortOptions))
  yield put({ type: APP_SORT_ORDER_SET, sortOrder, subset })
}

function* appSortOrderToggle() {
  const subset = yield select(getSubset)
  const currentOrder = yield select(getSortOptionsBySubset, subset)
  const sortOrder = currentOrder === 'newest' ? 'oldest' : 'newest'
  yield call(appSortOrderSet, { sortOrder, subset})
}

function* appReleaseNotesSet({ releaseVersion }) {
  localStore.setItem(CACHE_KEY_RELEASE_VERSION, releaseVersion)
  yield put({ type: APP_SET_RELEASE, releaseVersion })
}

function* appPreferences() {
  // This is a temporary measure to transfer cookies to local storage
  yield convertToLocalStorage()

  const colorMode = localStore.getItem(CACHE_KEY_COLOR_MODE) || 'light'
  const listMode = localStore.getItem(CACHE_KEY_LIST_MODE) || 'grid'
  const releaseVersion = localStore.getItem(CACHE_KEY_RELEASE_VERSION)

  const storedSortOrder = localStore.getItem(CACHE_KEY_SORT_OPTIONS)
  const sortOrderParsed = storedSortOrder ? JSON.parse(storedSortOrder) : {}
  const sortList = Object.keys(sortOrderParsed)
  for (var i = 0; i < sortList.length; i++) {
    const subset = sortList[i]
    yield put({ type: APP_SORT_ORDER_SET, sortOrder: sortOrderParsed[subset], subset })
  }

  yield put({ type: APP_SET_RELEASE, releaseVersion })
  yield put({ type: APP_COLOR_MODE_SET, colorMode })
  yield put({ type: APP_LIST_MODE_SET, listMode })
}

export function convertToLocalStorage() {
  const cookies = parseCookies()
  const cookieToLocalMap = {
    list_mode: {
      key: CACHE_KEY_LIST_MODE,
      valid: ['grid', 'list', 'detail']
    },
    theme: {
      key: CACHE_KEY_COLOR_MODE,
      valid: ['light', 'dark', 'sepia']
    },
    birth: 'remove',
    first_name: 'remove',
    last_name: 'remove',
    username: 'remove',
    user_id: 'remove',
    email: 'remove',
    premium_status: 'remove'
  }

  Object.keys(cookies).forEach((cookieName) => {
    const cookieValue = cookies[cookieName]

    if (Object.keys(cookieToLocalMap).includes(cookieName)) {
      // Check our conversion map
      const setting = cookieToLocalMap[cookieName]

      // If it is something we simply want to remove (account info for example)
      if (setting === 'remove') return destroyCookie(null, cookieName)

      // If not we want to convert it to local storage
      const key = setting.key
      // Check for a valid value and if not set it to the default
      const value = setting.valid.includes(cookieValue)
        ? cookieValue
        : setting.valid[0]

      //Kill and cookies that exist in favor of local storage
      localStore.setItem(key, value)
      destroyCookie(null, cookieName)
    }
  })
}

export function setColorClass(colorMode) {
  const htmlTag = global.document && global.document.documentElement
  if (!colorMode || !htmlTag) return

  htmlTag?.classList.toggle(`${COLOR_MODE_PREFIX}-light`, colorMode === 'light') //prettier-ignore
  htmlTag?.classList.toggle(`${COLOR_MODE_PREFIX}-dark`, colorMode === 'dark') //prettier-ignore
  htmlTag?.classList.toggle(`${COLOR_MODE_PREFIX}-sepia`, colorMode === 'sepia') //prettier-ignore
}
