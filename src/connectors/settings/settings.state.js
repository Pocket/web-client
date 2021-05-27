import { put, takeLatest, call, select } from 'redux-saga/effects'
import { getAppSettings } from 'common/api/settings'
import { putAppSettings } from 'common/api/settings'

import { localStore } from 'common/utilities/browser-storage/browser-storage'

import { SETTINGS_FETCH_REQUEST } from 'actions'
import { SETTINGS_FETCH_SUCCESS } from 'actions'
import { SETTINGS_FETCH_FAILURE } from 'actions'
import { SETTINGS_SAVE_REQUEST } from 'actions'
import { SETTINGS_SAVE_SUCCESS } from 'actions'
import { SETTINGS_SAVE_FAILURE } from 'actions'

import { CACHE_KEY_COLOR_MODE } from 'common/constants'
import { CACHE_KEY_LIST_MODE } from 'common/constants'
import { CACHE_KEY_SORT_OPTIONS } from 'common/constants'
import { CACHE_KEY_RELEASE_VERSION } from 'common/constants'
import { CACHE_KEY_HOME_STORED_TOPICS } from 'common/constants'

const initialState = {
  colorMode: localStore.getItem(CACHE_KEY_COLOR_MODE) || 'light',
  listMode: localStore.getItem(CACHE_KEY_LIST_MODE) || 'grid',
  sortOrder: JSON.parse(localStore.getItem(CACHE_KEY_SORT_OPTIONS)) || {},
  releaseVersion: localStore.getItem(CACHE_KEY_RELEASE_VERSION) || null,
  lineHeight: localStore.getItem('lineHeight') || 3,
  columnWidth: localStore.getItem('columnWidth') || 3,
  fontSize: localStore.getItem('fontSize') || 3,
  fontFamily: localStore.getItem('fontFamily') || 'blanco',
  userTags: JSON.parse(localStore.getItem('user_tags_pinned')) || [],
  homeSavedTopics: JSON.parse(localStore.getItem(CACHE_KEY_HOME_STORED_TOPICS)) || []
}

/** ACTIONS
 --------------------------------------------------------------- */
export const hydrateSettings = () => ({ type: SETTINGS_FETCH_REQUEST })

 /** REDUCERS
 --------------------------------------------------------------- */
export const settingsReducers = (state = initialState, action) => {
  switch (action.type) {
    case SETTINGS_FETCH_SUCCESS: {
      const { settings } = action
      return {
        ...state,
        ...settings
      }
    }

    default:
      return state
  }
}

 /** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const settingsSagas = [
  takeLatest(SETTINGS_FETCH_REQUEST, fetchSettings),
  takeLatest(SETTINGS_FETCH_SUCCESS, convertLocalSettings)
]

 /** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
const getSettings = (state) => state.settings

function* fetchSettings() {
  try {
    const { error, status, ...settings } = yield getAppSettings()
    if (status !== 1) throw new Error('Unable to fetch settings')
    // console.log({ settings })

    yield put({ type: SETTINGS_FETCH_SUCCESS, settings })
  } catch (error) {
    yield put({ type: SETTINGS_FETCH_FAILURE, error })
  }
}

function* saveSettings() {
  try {
    const settings = yield select(getSettings)
    const { error, status } = yield putAppSettings(settings)

    yield put({ type: SETTINGS_SAVE_SUCCESS })
  } catch (error) {
    yield put({ type: SETTINGS_SAVE_FAILURE, error})
  }
}

function* convertLocalSettings() {
  const stateSettings = yield select(getSettings)

  // console.log(stateSettings)
}
