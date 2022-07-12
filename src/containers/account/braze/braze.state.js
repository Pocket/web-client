import { SETTINGS_FETCH_SUCCESS } from 'actions'
import { TOGGLE_BRAZE } from 'actions'
import { filterSettings } from 'common/utilities'

const initialState = {
  brazeSubscribed: true
}

/** ACTIONS
 --------------------------------------------------------------- */
export const toggleBraze = () => ({ type: TOGGLE_BRAZE })

/** REDUCERS
 --------------------------------------------------------------- */
export const userBrazeReducers = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_BRAZE: {
      return { ...state, brazeSubscribed: !state.brazeSubscribed }
    }

    case SETTINGS_FETCH_SUCCESS: {
      const { settings } = action
      return { ...state, ...filterSettings(settings?.braze, initialState) }
    }

    default:
      return state
  }
}
