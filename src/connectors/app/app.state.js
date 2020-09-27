import { APP_DEV_MODE_TOGGLE } from 'actions'

const initialState = { devMode: false }

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

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */

export const appSagas = []

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
