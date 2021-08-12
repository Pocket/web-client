import { put, takeLatest } from 'redux-saga/effects'
import { SETTINGS_FETCH_SUCCESS } from 'actions'
import { SETTINGS_UPDATE } from 'actions'
import { ONBOARDING_CLOSE_TOPICS_MODAL } from 'actions'
import { ONBOARDING_CLOSE_SAVE_FLYAWAY } from 'actions'
import { ONBOARDING_RESET } from 'actions'
import { filterSettings } from 'common/utilities'

const initialState = {
  topicSelectionModal: true,
  saveFlyaway: true
}

/** ACTIONS
 --------------------------------------------------------------- */

export const onboardingCloseTopicSelectionModal = () => ({ type: ONBOARDING_CLOSE_TOPICS_MODAL })
export const onboardingCloseSaveFlyaway = () => ({ type: ONBOARDING_CLOSE_SAVE_FLYAWAY })
export const resetOnboarding = () => ({ type: ONBOARDING_RESET })

/** REDUCERS
 --------------------------------------------------------------- */

export const onboardingReducers = (state = initialState, action) => {
  switch (action.type) {

    case SETTINGS_FETCH_SUCCESS:
      const { settings } = action
      return {
        ...state,
        ...filterSettings(settings?.onboarding, initialState)
      }

    case ONBOARDING_CLOSE_TOPICS_MODAL:
      return {
        ...state,
        topicSelectionModal: false
      }

    case ONBOARDING_CLOSE_SAVE_FLYAWAY:
      return {
        ...state,
        saveFlyaway: false
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
]


/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */

function* saveSettings() {
  yield put({ type: SETTINGS_UPDATE })
}
