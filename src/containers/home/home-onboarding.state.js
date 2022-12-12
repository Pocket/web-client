import { put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { SETTINGS_FETCH_SUCCESS } from 'actions'
import { SETTINGS_UPDATE } from 'actions'

import { HOME_ONBOARDING_SAVE_SHOW } from 'actions'
import { HOME_ONBOARDING_READ_SHOW } from 'actions'
import { HOME_ONBOARDING_SAVE_DISMISS } from 'actions'
import { HOME_ONBOARDING_READ_DISMISS } from 'actions'
import { HOME_ONBOARDING_SAVE_IMPRESSION } from 'actions'
import { HOME_ONBOARDING_READ_IMPRESSION } from 'actions'
import { HOME_ONBOARDING_UNLOAD } from 'actions'
import { HOME_ONBOARDING_RESET } from 'actions'

import { HOME_SETUP_SET_STATUS } from 'actions'
import { HOME_SETUP_RESELECT_TOPICS } from 'actions'
import { HOME_CONTENT_SUCCESS } from 'actions'
import { HOME_RECENT_SAVES_SUCCESS } from 'actions'

import { HOME_SAVE_SUCCESS } from 'actions'
import { HOME_UNSAVE_SUCCESS } from 'actions'
import { READ_ITEM_SUCCESS } from 'actions'
import { ARTICLE_ITEM_SUCCESS } from 'actions' //v3

/** ACTIONS
 --------------------------------------------------------------- */
export const unloadOnboarding = () => ({ type: HOME_ONBOARDING_UNLOAD })
export const saveDismissAction = () => ({ type: HOME_ONBOARDING_SAVE_DISMISS })
export const readDismissAction = () => ({ type: HOME_ONBOARDING_READ_DISMISS })
export const saveImpressionEvent = () => ({ type: HOME_ONBOARDING_SAVE_IMPRESSION })
export const readImpressionEvent = () => ({ type: HOME_ONBOARDING_READ_IMPRESSION })
export const resetOnboarding = () => ({ type: HOME_ONBOARDING_RESET })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  running: false,
  currentStep: 0,
  saveComplete: false,
  saveImpression: false,
  readComplete: false,
  readImpression: false
}

export const homeOnboardingReducers = (state = initialState, action) => {
  switch (action.type) {
    case SETTINGS_FETCH_SUCCESS: {
      const { settings } = action
      const { homeOnboarding } = settings
      return { ...state, ...homeOnboarding }
    }

    // topic selection skipped
    case HOME_SETUP_SET_STATUS: {
      const { setupStatus } = action
      const running = setupStatus === 'skipped' || state.running
      return { ...state, running }
    }

    case HOME_SETUP_RESELECT_TOPICS: {
      return { ...state, running: false }
    }

    case HOME_ONBOARDING_SAVE_SHOW: {
      return { ...state, running: true }
    }

    case HOME_ONBOARDING_SAVE_DISMISS: {
      return { ...state, currentStep: 1, saveComplete: true, running: false }
    }

    case HOME_ONBOARDING_SAVE_IMPRESSION: {
      return { ...state, saveImpression: true }
    }

    // on home save or having saved on another page
    case HOME_SAVE_SUCCESS:
    case HOME_ONBOARDING_READ_SHOW: {
      return { ...state, currentStep: 1, saveComplete: true, running: true }
    }

    case HOME_UNSAVE_SUCCESS: {
      return { ...state, running: false }
    }

    case HOME_ONBOARDING_READ_DISMISS: {
      return { ...state, currentStep: 2, readComplete: true, running: false }
    }

    case HOME_ONBOARDING_READ_IMPRESSION: {
      return { ...state, readImpression: true }
    }

    // navigated to reader, won't show again
    case READ_ITEM_SUCCESS:
    case ARTICLE_ITEM_SUCCESS: {
      return { ...state, currentStep: 2, readComplete: true, running: false }
    }

    case HOME_ONBOARDING_UNLOAD: {
      return {
        ...state,
        running: false,
        saveComplete: state.saveImpression,
        readComplete: state.readImpression
      }
    }

    case HOME_ONBOARDING_RESET: {
      return { ...initialState }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const homeOnboardingSagas = [
  takeEvery(HOME_CONTENT_SUCCESS, homeContentLoaded),
  takeEvery(HOME_RECENT_SAVES_SUCCESS, homeSavesLoaded),
  takeLatest([
    HOME_ONBOARDING_SAVE_SHOW,
    HOME_ONBOARDING_SAVE_DISMISS,
    HOME_ONBOARDING_SAVE_IMPRESSION,
    HOME_ONBOARDING_READ_SHOW,
    HOME_ONBOARDING_READ_DISMISS,
    HOME_ONBOARDING_READ_IMPRESSION,
    HOME_ONBOARDING_UNLOAD,
    HOME_ONBOARDING_RESET,
  ], saveSettings)
]

/** SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getHomeSetupState = (state) => state.homeSetup
const getHomeOnboardingState = (state) => state.homeOnboarding

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* homeContentLoaded() {
  const { finalizedTopics, setupStatus } = yield select(getHomeSetupState)
  const { saveComplete, saveImpression } = yield select(getHomeOnboardingState)
  if (finalizedTopics && setupStatus === 'complete' && !saveComplete && !saveImpression) {
    yield put({ type: HOME_ONBOARDING_SAVE_SHOW })
  }
}

function* homeSavesLoaded({ items }) {
  const { readComplete, readImpression } = yield select(getHomeOnboardingState)
  if (items?.length && !readComplete && !readImpression) {
    yield put({ type: HOME_ONBOARDING_READ_SHOW })
  }
}

function* saveSettings() {
  yield put({ type: SETTINGS_UPDATE })
}
