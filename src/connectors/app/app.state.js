import { takeLatest, put } from 'redux-saga/effects'
import { APP_DEV_MODE_TOGGLE } from 'actions'
import { APP_SET_BASE_URL } from 'actions'
import { APP_SET_MODE } from 'actions'
import { APP_SET_SECTION } from 'actions'
import { APP_LIST_MODE_TOGGLE } from 'actions'
import { APP_SORT_ORDER_TOGGLE } from 'actions'
import { ITEMS_BULK_CLEAR } from 'actions'
import { HYDRATE } from 'actions'

const initialState = {
  devMode: false,
  mode: 'default',
  listMode: 'grid',
  sortOrder: 'newest'
}

/** ACTIONS
 --------------------------------------------------------------- */
export const devModeToggle = () => ({ type: APP_DEV_MODE_TOGGLE })
export const appSetBaseURL = (baseURL) => ({ type: APP_SET_BASE_URL, baseURL })
export const appSetMode = (mode) => ({ type: APP_SET_MODE, mode })
export const appSetSection = (section) => ({ type: APP_SET_SECTION, section })
export const listModeToggle = () => ({ type: APP_LIST_MODE_TOGGLE })
export const sortOrderToggle = () => ({ type: APP_SORT_ORDER_TOGGLE })

/** REDUCERS
 --------------------------------------------------------------- */
export const appReducers = (state = initialState, action) => {
  switch (action.type) {
    case APP_DEV_MODE_TOGGLE: {
      const devModeState = state.devMode
      return { ...state, devMode: !devModeState }
    }

    case APP_LIST_MODE_TOGGLE: {
      const listMode = state.listMode === 'grid' ? 'list' : 'grid'
      return { ...state, listMode }
    }

    case APP_SORT_ORDER_TOGGLE: {
      const sortOrder = state.sortOrder === 'newest' ? 'oldest' : 'newest'
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

export const appSagas = [takeLatest(APP_SET_MODE, appModeSwitch)]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* appModeSwitch(action) {
  const { mode } = action
  if (mode !== 'bulk') yield put({ type: ITEMS_BULK_CLEAR })
}
