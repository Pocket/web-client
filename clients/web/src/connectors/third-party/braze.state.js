import { put, takeLatest, call } from 'redux-saga/effects'
import { SETTINGS_FETCH_SUCCESS } from 'actions'
import { BRAZE_INITIALIZED } from 'actions'
import { BRAZE_TOKEN_REQUEST } from 'actions'
import { BRAZE_TOKEN_SUCCESS } from 'actions'
import { BRAZE_TOKEN_FAILURE } from 'actions'
import { TOGGLE_BRAZE } from 'actions'

import { getBrazeToken } from 'common/api/internal/braze'

const initialState = {
  initialized: false,
  brazeSubscribed: true,
  token: null
}

/** ACTIONS
 --------------------------------------------------------------- */
export const initializeBraze = () => ({ type: BRAZE_INITIALIZED })
export const fetchBrazeToken = (userId) => ({ type: BRAZE_TOKEN_REQUEST, userId })
export const toggleBraze = () => ({ type: TOGGLE_BRAZE })

/** REDUCERS
 --------------------------------------------------------------- */
export const brazeReducers = (state = initialState, action) => {
  switch (action.type) {
    case BRAZE_INITIALIZED: {
      return { ...state, initialized: true }
    }

    case BRAZE_TOKEN_SUCCESS: {
      const { token } = action
      return { ...state, token }
    }

    case TOGGLE_BRAZE: {
      return { ...state, brazeSubscribed: !state.brazeSubscribed }
    }

    case SETTINGS_FETCH_SUCCESS: {
      const { settings } = action
      const brazeSubscribed = settings?.brazeSubscribed === false ? settings.brazeSubscribed : true
      return { ...state, brazeSubscribed }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const brazeSagas = [takeLatest(BRAZE_TOKEN_REQUEST, brazeTokenRequest)]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* brazeTokenRequest({ userId }) {
  try {
    const token = yield call(getBrazeToken, userId)
    if (!token) throw new Error('Unable to fetch token')

    yield put({ type: BRAZE_TOKEN_SUCCESS, token })
  } catch (error) {
    yield put({ type: BRAZE_TOKEN_FAILURE, error })
  }
}
