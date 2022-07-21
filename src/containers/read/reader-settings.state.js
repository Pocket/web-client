import { put, takeEvery } from 'redux-saga/effects'
import { localStore } from 'common/utilities/browser-storage/browser-storage'

import { UPDATE_LINE_HEIGHT } from 'actions'
import { UPDATE_COLUMN_WIDTH } from 'actions'
import { UPDATE_FONT_SIZE } from 'actions'
import { UPDATE_FONT_TYPE } from 'actions'
import { TOGGLE_READER_SIDEBAR } from 'actions'
import { HYDRATE_DISPLAY_SETTINGS } from 'actions'
import { READER_CLEAR_DELETION } from 'actions'
import { SNOWPLOW_SEND_EVENT } from 'actions'
import { READ_ITEM_SUCCESS } from 'actions'
import { ARTICLE_ITEM_SUCCESS } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
// Settings actions
export const updateLineHeight = (lineHeight) => ({ type: UPDATE_LINE_HEIGHT, lineHeight })
export const updateColumnWidth = (columnWidth) => ({ type: UPDATE_COLUMN_WIDTH, columnWidth })
export const updateFontSize = (fontSize) => ({ type: UPDATE_FONT_SIZE, fontSize })
export const updateFontType = (fontFamily) => ({ type: UPDATE_FONT_TYPE, fontFamily })
export const toggleSidebar = () => ({ type: TOGGLE_READER_SIDEBAR })
export const clearDeletion = () => ({ type: READER_CLEAR_DELETION })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  lineHeight: 3,
  columnWidth: 3,
  fontSize: 3,
  fontFamily: 'blanco',
  sideBarOpen: false,
  deleted: false
}

export const readerSettingsReducers = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LINE_HEIGHT: {
      const { lineHeight } = action
      return { ...state, lineHeight }
    }

    case UPDATE_COLUMN_WIDTH: {
      const { columnWidth } = action
      return { ...state, columnWidth }
    }

    case UPDATE_FONT_SIZE: {
      const { fontSize } = action
      return { ...state, fontSize }
    }

    case UPDATE_FONT_TYPE: {
      const { fontFamily } = action
      return { ...state, fontFamily }
    }

    case TOGGLE_READER_SIDEBAR: {
      return { ...state, sideBarOpen: !state.sideBarOpen }
    }

    case READER_CLEAR_DELETION: {
      return { ...state, deleted: false }
    }

    case HYDRATE_DISPLAY_SETTINGS: {
      const { settings } = action
      return { ...state, ...settings }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const readerSettingsSagas = [
  // settings
  takeEvery(
    [UPDATE_LINE_HEIGHT, UPDATE_COLUMN_WIDTH, UPDATE_FONT_SIZE, UPDATE_FONT_TYPE],
    saveDisplaySettings
  ),
  takeEvery([ARTICLE_ITEM_SUCCESS, READ_ITEM_SUCCESS], hydrateDisplaySettings)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */

function* saveDisplaySettings({ type, ...settings }) {
  yield Object.keys(settings).forEach((val) => {
    localStore.setItem(val.toString(), settings[val])
  })

  const identifier = 'reader.display'
  const data = Object.keys(settings).map((label) => ({
    value: settings[label]?.toString(),
    label
  }))
  yield put({ type: SNOWPLOW_SEND_EVENT, identifier, data })
}

function* hydrateDisplaySettings() {
  const displaySettings = ['lineHeight', 'columnWidth', 'fontSize', 'fontFamily']

  const settings = displaySettings.reduce((obj, val) => {
    obj[val] = localStore.getItem(val) || initialState[val]
    return obj
  }, {})

  yield put({ type: HYDRATE_DISPLAY_SETTINGS, settings })
}
