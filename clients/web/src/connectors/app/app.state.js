import { localStore } from 'common/utilities/browser-storage/browser-storage'
import { takeLatest, put, select } from 'redux-saga/effects'

import { APP_DEV_MODE_TOGGLE } from 'actions'
import { APP_SET_BASE_URL } from 'actions'
import { APP_SET_MODE } from 'actions'
import { APP_SET_SECTION } from 'actions'
import { APP_SET_PREFERENCES } from 'actions'
import { APP_LIST_MODE_SET } from 'actions'

import { APP_SORT_ORDER_OLD } from 'actions'
import { APP_SORT_ORDER_NEW } from 'actions'
import { APP_SORT_ORDER_RELEVANCE } from 'actions'
import { APP_SORT_ORDER_SET } from 'actions'

import { APP_LIST_MODE_LIST } from 'actions'
import { APP_LIST_MODE_GRID } from 'actions'
import { APP_LIST_MODE_DETAIL } from 'actions'

import { APP_COLOR_MODE_SET } from 'actions'

import { SNOWPLOW_SEND_EVENT } from 'actions'

import { MUTATION_BULK_CLEAR } from 'actions'
import { MUTATION_BULK_BATCH_COMPLETE } from 'actions'

import { HYDRATE } from 'actions'
import { parseCookies, destroyCookie } from 'nookies'

import { COLOR_MODE_PREFIX } from 'common/constants'
import { CACHE_KEY_COLOR_MODE } from 'common/constants'
import { CACHE_KEY_LIST_MODE } from 'common/constants'
import { CACHE_KEY_SORT_OPTIONS } from 'common/constants'

const initialState = {
  devMode: false,
  mode: 'default',
  listMode: 'grid',
  colorMode: 'light',
  sortOptions: {}
}

/** ACTIONS
 --------------------------------------------------------------- */
export const devModeToggle = () => ({ type: APP_DEV_MODE_TOGGLE })
export const appSetBaseURL = (baseURL) => ({ type: APP_SET_BASE_URL, baseURL })
export const appSetMode = (mode) => ({ type: APP_SET_MODE, mode })
export const appSetSection = (section) => ({ type: APP_SET_SECTION, section })
export const appSetPreferences = () => ({ type: APP_SET_PREFERENCES })

export const listModeSet = (listMode) => ({ type: APP_LIST_MODE_SET, listMode }) //prettier-ignore
export const setListModeList = () => ({type: APP_LIST_MODE_LIST, listMode: 'list'}) //prettier-ignore
export const setListModeGrid = () => ({type: APP_LIST_MODE_GRID, listMode: 'grid'}) //prettier-ignore
export const setListModeDetail = () => ({type: APP_LIST_MODE_DETAIL, listMode: 'detail'}) //prettier-ignore

export const sortOrderSetOld = () => ({ type: APP_SORT_ORDER_OLD, sortOrder: 'oldest' }) //prettier-ignore
export const sortOrderSetNew = () => ({ type: APP_SORT_ORDER_NEW, sortOrder: 'newest' }) //prettier-ignore
export const sortOrderSetRelevance = () => ({ type: APP_SORT_ORDER_RELEVANCE, sortOrder: 'relevance' }) //prettier-ignore

export const setColorMode = (colorMode) => ({ type: APP_COLOR_MODE_SET, colorMode }) //prettier-ignore
export const setColorModeLight = () => ({ type: APP_COLOR_MODE_SET, colorMode: 'light' }) //prettier-ignore
export const setColorModeDark = () => ({ type: APP_COLOR_MODE_SET, colorMode: 'dark' }) //prettier-ignore
export const setColorModeSepia = () => ({ type: APP_COLOR_MODE_SET, colorMode: 'sepia' }) //prettier-ignore

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

    // Revert global nav once bulk action is complete
    case APP_SET_MODE:
    case MUTATION_BULK_BATCH_COMPLETE: {
      // MODES  [default, search, add, bulk]
      const { mode = 'default' } = action
      return { ...state, mode }
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE: {
      const { app } = action.payload
      return { ...state, baseURL: app.baseURL }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const appSagas = [
  takeLatest(APP_SET_PREFERENCES, appPreferences),
  takeLatest(APP_SET_MODE, appModeSwitch),
  takeLatest(APP_SORT_ORDER_OLD, appSortOrderSet),
  takeLatest(APP_SORT_ORDER_NEW, appSortOrderSet),
  takeLatest(APP_SORT_ORDER_RELEVANCE, appSortOrderSet),
  takeLatest(APP_LIST_MODE_LIST, appListModeSet),
  takeLatest(APP_LIST_MODE_GRID, appListModeSet),
  takeLatest(APP_LIST_MODE_DETAIL, appListModeSet),
  takeLatest(APP_COLOR_MODE_SET, appColorModeSet)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
const getSubset = (state) => state.app.section
const getSortOptions = (state) => state.app.sortOptions

function* appModeSwitch(action) {
  const { mode } = action
  if (mode !== 'bulk') {
    yield put({ type: MUTATION_BULK_CLEAR })
  }
}

function* appColorModeSet({ colorMode, skipAnalytics = false }) {
  localStore.setItem(CACHE_KEY_COLOR_MODE, colorMode)
  setColorClass(colorMode)

  if (skipAnalytics) return
  const identifier = 'saves.theme'
  const data = { value: colorMode }
  yield put({ type: SNOWPLOW_SEND_EVENT, identifier, data })
}

function* appListModeSet({ listMode }) {
  localStore.setItem(CACHE_KEY_LIST_MODE, listMode)
  yield put({ type: APP_LIST_MODE_SET, listMode })

  const identifier = 'saves.display.view'
  const data = { value: listMode }
  yield put({ type: SNOWPLOW_SEND_EVENT, identifier, data })
}

function* appSortOrderSet({ sortOrder }) {
  const subset = yield select(getSubset)
  const oldSortOptions = yield select(getSortOptions)
  const updatedSortOptions = { ...oldSortOptions, [subset]: sortOrder }
  localStore.setItem(CACHE_KEY_SORT_OPTIONS, JSON.stringify(updatedSortOptions))
  yield put({ type: APP_SORT_ORDER_SET, sortOrder, subset })

  const identifier = 'saves.sort'
  const data = { value: sortOrder }
  yield put({ type: SNOWPLOW_SEND_EVENT, identifier, data })
}

function* appPreferences() {
  // This is a temporary measure to transfer cookies to local storage
  yield convertToLocalStorage()

  const colorMode = localStore.getItem(CACHE_KEY_COLOR_MODE) || 'light'
  const listMode = localStore.getItem(CACHE_KEY_LIST_MODE) || 'grid'

  const storedSortOrder = localStore.getItem(CACHE_KEY_SORT_OPTIONS)
  const sortOrderParsed = storedSortOrder ? JSON.parse(storedSortOrder) : {}
  const sortList = Object.keys(sortOrderParsed)
  for (var i = 0; i < sortList.length; i++) {
    const subset = sortList[i]
    yield put({ type: APP_SORT_ORDER_SET, sortOrder: sortOrderParsed[subset], subset })
  }

  yield put({ type: APP_COLOR_MODE_SET, colorMode, skipAnalytics: true })
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
      valid: ['light', 'dark', 'sepia', 'system']
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
      const value = setting.valid.includes(cookieValue) ? cookieValue : setting.valid[0]

      //Kill and cookies that exist in favor of local storage
      localStore.setItem(key, value)
      destroyCookie(null, cookieName)
    }
  })
}

export function setColorClass(colorMode) {
  const htmlTag = global.document && global.document.documentElement
  if (!colorMode || !htmlTag) return

  const mode = colorMode === 'system' ? getSystemColorMode() : colorMode

  htmlTag?.classList.toggle(`${COLOR_MODE_PREFIX}-light`, mode === 'light') //prettier-ignore
  htmlTag?.classList.toggle(`${COLOR_MODE_PREFIX}-dark`, mode === 'dark') //prettier-ignore
  htmlTag?.classList.toggle(`${COLOR_MODE_PREFIX}-sepia`, mode === 'sepia') //prettier-ignore
}

function getSystemColorMode() {
  const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return isSystemDark ? 'dark' : 'light'
}
