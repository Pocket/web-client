import { SETTINGS_FETCH_SUCCESS } from 'actions'
import { filterSettings } from 'common/utilities'

const initialState = {}

/** ACTIONS
 --------------------------------------------------------------- */

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

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */

export const onboardingSagas = [

]


/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
