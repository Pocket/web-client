import { put, takeLatest, select } from 'redux-saga/effects'
import { SETTINGS_FETCH_SUCCESS } from 'actions'
import { SETTINGS_UPDATE } from 'actions'
import { ONBOARDING_CLOSE_TOPICS_MODAL } from 'actions'
import { ONBOARDING_CLOSE_SAVE_FLYAWAY } from 'actions'
import { ONBOARDING_CLOSE_MY_LIST_FLYAWAY } from 'actions'
import { ONBOARDING_CLOSE_READER_FLYAWAY } from 'actions'
import { ONBOARDING_CLOSE_EXTENSION_FLYAWAY } from 'actions'
import { ONBOARDING_CLOSE_APPS_FLYAWAY } from 'actions'
import { ONBOARDING_RESET } from 'actions'
import { MYLIST_UPDATE_REQUEST } from 'actions'
import { ARTICLE_ITEM_SUCCESS } from 'actions'

import { HOME_SAVE_REQUEST } from 'actions'

const initialState = {
  topicSelectionModal: true,
  homeFlyawaySave: true,
  homeFlyawayMyList: true,
  myListFlyawayReader: true,
  myListFlyawayExtension: true,
  readerFlyawayApps: true
}

/** ACTIONS
 --------------------------------------------------------------- */

export const onboardingCloseTopicSelectionModal = () => ({ type: ONBOARDING_CLOSE_TOPICS_MODAL })
export const onboardingCloseSaveFlyaway = () => ({ type: ONBOARDING_CLOSE_SAVE_FLYAWAY })
export const onboardingCloseMyListFlyaway = () => ({ type: ONBOARDING_CLOSE_MY_LIST_FLYAWAY })
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
    case ONBOARDING_CLOSE_TOPICS_MODAL:
      return {
        ...state,
        topicSelectionModal: false
      }

    case ONBOARDING_CLOSE_SAVE_FLYAWAY:
    case HOME_SAVE_REQUEST:
      return {
        ...state,
        homeFlyawaySave: false
      }

    case ONBOARDING_CLOSE_MY_LIST_FLYAWAY:
      return {
        ...state,
        homeFlyawayMyList: false
      }

    case ONBOARDING_CLOSE_READER_FLYAWAY:
    case ARTICLE_ITEM_SUCCESS:
      return {
        ...state,
        myListFlyawayReader: false
      }

    case ONBOARDING_CLOSE_EXTENSION_FLYAWAY:
      return {
        ...state,
        myListFlyawayExtension: false
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
  takeLatest(ONBOARDING_RESET, saveSettings),
  takeLatest(ONBOARDING_CLOSE_TOPICS_MODAL, saveSettings),
  takeLatest(ONBOARDING_CLOSE_SAVE_FLYAWAY, saveSettings),
  takeLatest(ONBOARDING_CLOSE_MY_LIST_FLYAWAY, saveSettings),
  takeLatest(ONBOARDING_CLOSE_READER_FLYAWAY, saveSettings),
  takeLatest(ONBOARDING_CLOSE_EXTENSION_FLYAWAY, saveSettings),
  takeLatest(ONBOARDING_CLOSE_APPS_FLYAWAY, saveSettings),
  takeLatest(ARTICLE_ITEM_SUCCESS, saveSettings),
  takeLatest(HOME_SAVE_REQUEST, saveSettings),
  takeLatest(MYLIST_UPDATE_REQUEST, confirmFlyawayStatus)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */

const getHomeFlyawayMyList = (state) => state.onboarding.homeFlyawayMyList
const getHomeFlyawaySave = (state) => state.onboarding.homeFlyawaySave

function* saveSettings() {
  yield put({ type: SETTINGS_UPDATE })
}

function* confirmFlyawayStatus() {
  const homeFlyawayMyList = yield select(getHomeFlyawayMyList)
  const homeFlyawaySave = yield select(getHomeFlyawaySave)

  if (homeFlyawayMyList && !homeFlyawaySave) {
    yield put({ type: ONBOARDING_CLOSE_MY_LIST_FLYAWAY })
  }
}
