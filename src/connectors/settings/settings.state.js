import { put, takeLatest, select } from 'redux-saga/effects'
import { getAppSettings } from 'common/api/_legacy/settings'
import { putAppSettings } from 'common/api/_legacy/settings'

import { localStore } from 'common/utilities'
import { getObjectWithValidKeysOnly } from 'common/utilities'
import { filterSettings } from 'common/utilities'

import { SETTINGS_FETCH_REQUEST } from 'actions'
import { SETTINGS_FETCH_SUCCESS } from 'actions'
import { SETTINGS_FETCH_FAILURE } from 'actions'
import { SETTINGS_SAVE_SUCCESS } from 'actions'
import { SETTINGS_SAVE_FAILURE } from 'actions'
import { SETTINGS_UPDATE } from 'actions'

import { USER_TAGS_EDIT_SUCCESS } from 'actions'
import { USER_TAGS_DELETE_SUCCESS } from 'actions'
import { USER_TAGS_PINS_SET } from 'actions'

import { PINNED_TOPICS_SET } from 'actions'

import { TOGGLE_BRAZE } from 'actions'

import { CACHE_KEY_HOME_STORED_TOPICS } from 'common/constants'

const initialState = {
  pinnedTags: [],
  pinnedTopics: [],
  settingsFetched: false
}

/** ACTIONS
 --------------------------------------------------------------- */
export const hydrateSettings = () => ({ type: SETTINGS_FETCH_REQUEST })

/** REDUCERS
 --------------------------------------------------------------- */
export const settingsReducers = (state = initialState, action) => {
  switch (action.type) {
    case SETTINGS_FETCH_SUCCESS:
    case SETTINGS_UPDATE: {
      const { settings } = action
      return {
        ...state,
        ...filterSettings(settings, initialState),
        settingsFetched: true
      }
    }

    case USER_TAGS_EDIT_SUCCESS:
    case USER_TAGS_DELETE_SUCCESS:
    case USER_TAGS_PINS_SET: {
      const { pinnedTags } = action
      return {
        ...state,
        pinnedTags
      }
    }

    case PINNED_TOPICS_SET: {
      const { pinnedTopics } = action
      return {
        ...state,
        pinnedTopics
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
  takeLatest(SETTINGS_FETCH_SUCCESS, convertLocalSettings),
  takeLatest(SETTINGS_UPDATE, saveSettings),
  takeLatest(USER_TAGS_EDIT_SUCCESS, saveSettings),
  takeLatest(USER_TAGS_DELETE_SUCCESS, saveSettings),
  takeLatest(USER_TAGS_PINS_SET, saveSettings),
  takeLatest(PINNED_TOPICS_SET, saveSettings),
  takeLatest(TOGGLE_BRAZE, saveSettings)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
const getSettings = (state) => state.settings
const getOnboarding = (state) => state.onboarding
const getBraze = (state) => state.braze?.brazeSubscribed

function* fetchSettings() {
  try {
    const { error, status, ...settings } = yield getAppSettings()
    if (status !== 1) throw new Error(`Unable to fetch settings: ${error}`)

    yield put({ type: SETTINGS_FETCH_SUCCESS, settings })
  } catch (error) {
    yield put({ type: SETTINGS_FETCH_FAILURE, error })
  }
}

function* saveSettings() {
  try {
    const storedSettings = yield select(getSettings)
    const onboarding = yield select(getOnboarding)
    const brazeSubscribed = yield select(getBraze)
    const settings = { ...storedSettings, onboarding, brazeSubscribed }
    const { error, status } = yield putAppSettings(settings)
    if (status !== 1) throw new Error(`Unable to save settings: ${error}`)

    yield put({ type: SETTINGS_SAVE_SUCCESS })
  } catch (error) {
    yield put({ type: SETTINGS_SAVE_FAILURE, error })
  }
}

function* convertLocalSettings() {
  const localSettings = {
    pinnedTags: yield JSON.parse(localStore.getItem('user_tags_pinned')),
    pinnedTopics: yield JSON.parse(localStore.getItem(CACHE_KEY_HOME_STORED_TOPICS))
  }

  const keysToDelete = ['user_tags_pinned', CACHE_KEY_HOME_STORED_TOPICS]
  keysToDelete.forEach((val) => {
    localStore.removeItem(val)
  })

  yield put({ type: SETTINGS_UPDATE, settings: getObjectWithValidKeysOnly(localSettings) })
}
