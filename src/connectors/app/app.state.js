import { APP_DEV_MODE_TOGGLE } from 'actions'
import { HYDRATE } from 'actions'

const initialState = {
  served: 0,
  rendered: 0,
  devMode: false
}

/** ACTIONS
 --------------------------------------------------------------- */
export const devModeToggle = () => ({ type: APP_DEV_MODE_TOGGLE })

/** REDUCERS
 --------------------------------------------------------------- */
export const appReducers = (state = initialState, action) => {
  switch (action.type) {
    case APP_DEV_MODE_TOGGLE: {
      const devModeState = state.devMode
      return { ...state, devMode: !devModeState }
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE:
      return { ...state, served: true }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */

export const appSagas = []

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
