import { put, takeEvery } from 'redux-saga/effects'
import { localStore } from 'common/utilities/browser-storage/browser-storage'

import { UPDATE_LINE_HEIGHT } from 'actions'
import { UPDATE_COLUMN_WIDTH } from 'actions'
import { UPDATE_FONT_SIZE } from 'actions'
import { UPDATE_FONT_TYPE } from 'actions'
import { HYDRATE_DISPLAY_SETTINGS } from 'actions'
import { SNOWPLOW_SEND_EVENT } from 'actions'
import { READ_ITEM_SUCCESS } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
// Settings actions
export const updateLineHeight = (lineHeight) => ({ type: UPDATE_LINE_HEIGHT, lineHeight })
export const updateColumnWidth = (columnWidth) => ({ type: UPDATE_COLUMN_WIDTH, columnWidth })
export const updateFontSize = (fontSize) => ({ type: UPDATE_FONT_SIZE, fontSize })
export const updateFontType = (fontFamily) => ({ type: UPDATE_FONT_TYPE, fontFamily })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  lineHeight: 3,
  columnWidth: 3,
  fontSize: 3,
  fontFamily: 'blanco'
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
  takeEvery([READ_ITEM_SUCCESS], hydrateDisplaySettings)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */

function* saveDisplaySettings({ type, ...settings }) {
  const settingKeys = Object.keys(settings)
  yield settingKeys.forEach((val) => {
    localStore.setItem(val.toString(), settings[val])
  })

  const identifier = 'reader.display'

  // We only pass one of these at a time but we need to break them into expected format
  // So we take the name of the first value and apply it to the original object
  const label = settingKeys[0]
  const value = settings[label]?.toString()
  const data = { label, value }

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
