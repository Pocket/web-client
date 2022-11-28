import { put, takeEvery, call, select } from 'redux-saga/effects'
import { SETTINGS_FETCH_SUCCESS } from 'actions'
import { SETTINGS_UPDATE } from 'actions'

import { HOME_ONBOARDING_INCREMENT } from 'actions'

import { HOME_SAVE_SUCCESS } from 'actions'
import { READ_ITEM_SUCCESS } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const incrementOnboardingStep = () => ({ type: HOME_ONBOARDING_INCREMENT })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  onboardingStatus: false,
  currentStep: 0
}

export const homeOnboardingReducers = (state = initialState, action) => {
  switch (action.type) {
    case SETTINGS_FETCH_SUCCESS: {
      const { settings } = action
      const { onboardingStatus = false, currentStep } = settings
      return { ...state, onboardingStatus }
    }
      
    case HOME_ONBOARDING_INCREMENT: {
      return { ...state, currentStep: state.currentStep + 1 }
    }
      
    case HOME_SAVE_SUCCESS: {
      return { ...state, currentStep: 1 }
    }
      
    case READ_ITEM_SUCCESS: {
      return { ...state, currentStep: 2 }
    }
      
    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const homeOnboardingSagas = [
  // takeEvery(HOME_SET_STORED_USER_TOPICS, clearUserTopicsCookie),
  // takeEvery([
  //   HOME_SET_STORED_USER_TOPICS,
  //   SET_TOPIC_SUCCESS
  // ], saveSettings)
]

/** SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
// const getUserTopics = (state) => state.homeSetup.userTopics

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */

function* saveSettings() {
  yield put({ type: SETTINGS_UPDATE })
} 
