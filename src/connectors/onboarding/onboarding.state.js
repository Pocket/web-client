import { put, takeLatest } from 'redux-saga/effects'
import { SETTINGS_FETCH_SUCCESS } from 'actions'
import { SETTINGS_UPDATE } from 'actions'
import { ONBOARDING_CLOSE_SAVE_FLYAWAY } from 'actions'
import { ONBOARDING_CLOSE_READER_FLYAWAY } from 'actions'
import { ONBOARDING_CLOSE_EXTENSION_FLYAWAY } from 'actions'
import { ONBOARDING_CLOSE_APPS_FLYAWAY } from 'actions'
import { ONBOARDING_RESET } from 'actions'
import { ARTICLE_ITEM_SUCCESS } from 'actions'
import { READ_ITEM_SUCCESS } from 'actions'

import { HOME_SAVE_REQUEST } from 'actions'

const initialState = {
  homeFlyawaySave: true,
  homeFlyawayReader: true,
  savesFlyawayExtension: true,
  readerFlyawayApps: true
}

/** ACTIONS
 --------------------------------------------------------------- */
export const onboardingCloseSaveFlyaway = () => ({ type: ONBOARDING_CLOSE_SAVE_FLYAWAY })
export const onboardingCloseReaderFlyaway = () => ({ type: ONBOARDING_CLOSE_READER_FLYAWAY })
export const onboardingCloseExtensionFlyaway = () => ({ type: ONBOARDING_CLOSE_EXTENSION_FLYAWAY })
export const onboardingCloseAppsFlyaway = () => ({ type: ONBOARDING_CLOSE_APPS_FLYAWAY })
export const resetOnboarding = () => ({ type: ONBOARDING_RESET })

/** REDUCERS
 --------------------------------------------------------------- */
export const onboardingReducers = (state = initialState, action) => {
  switch (action.type) {
    case SETTINGS_FETCH_SUCCESS: {
      const { settings } = action
      const onboarding = settings?.onboarding || {}
      return {
        ...state,
        ...onboarding
      }
    }

    case ONBOARDING_CLOSE_SAVE_FLYAWAY:
    case HOME_SAVE_REQUEST:
      return {
        ...state,
        homeFlyawaySave: false
      }

    case ONBOARDING_CLOSE_READER_FLYAWAY:
    case ARTICLE_ITEM_SUCCESS:
    case READ_ITEM_SUCCESS:
      return {
        ...state,
        homeFlyawayReader: false
      }

    case ONBOARDING_CLOSE_EXTENSION_FLYAWAY:
      return {
        ...state,
        savesFlyawayExtension: false
      }

    case ONBOARDING_CLOSE_APPS_FLYAWAY:
      return {
        ...state,
        readerFlyawayApps: false
      }

    case ONBOARDING_RESET:
      return initialState

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const onboardingSagas = [
  takeLatest([
    ONBOARDING_RESET,
    ONBOARDING_CLOSE_SAVE_FLYAWAY,
    ONBOARDING_CLOSE_READER_FLYAWAY,
    ONBOARDING_CLOSE_EXTENSION_FLYAWAY,
    ONBOARDING_CLOSE_APPS_FLYAWAY,
    ARTICLE_ITEM_SUCCESS,
    READ_ITEM_SUCCESS,
    HOME_SAVE_REQUEST
  ], saveSettings)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* saveSettings() {
  yield put({ type: SETTINGS_UPDATE })
}
