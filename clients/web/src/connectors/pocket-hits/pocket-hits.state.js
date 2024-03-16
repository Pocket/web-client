import { takeLatest, put } from 'redux-saga/effects'
import { pocketHitsSignup } from 'common/api/_legacy/pocket-hits'

import {
  POCKET_HITS_SIGNUP_REQUESTED,
  POCKET_HITS_SIGNUP_REQUEST_SUCCEEDED,
  POCKET_HITS_SIGNUP_REQUEST_FAILED
} from 'actions'

const initialState = {
  /**
   * Current status of a request to sign up for Pocket Hits.
   * Expects one of: 'pending', 'success', 'failure'
   */
  signupRequestState: null,

  /**
   * If the Pocket Hits signup request fails, the error response is stored here.
   */
  signupError: null
}

/** ACTIONS
 --------------------------------------------------------------- */
export const pocketHitsSignupRequested = (
  email,
  recaptchaResponseKey,
  utmCampaign,
  utmSource,
  marketingOptIn,
  frequency
) => ({
  type: POCKET_HITS_SIGNUP_REQUESTED,
  email,
  recaptchaResponseKey,
  utmCampaign,
  utmSource,
  marketingOptIn,
  frequency
})

/** REDUCERS
 --------------------------------------------------------------- */
export const pocketHitsReducers = (state = initialState, action) => {
  switch (action.type) {
    case POCKET_HITS_SIGNUP_REQUESTED: {
      return {
        ...state,
        signupRequestState: 'pending',
        signupError: null
      }
    }

    case POCKET_HITS_SIGNUP_REQUEST_SUCCEEDED: {
      return {
        ...state,
        signupRequestState: 'success'
      }
    }

    case POCKET_HITS_SIGNUP_REQUEST_FAILED: {
      return {
        ...state,
        signupRequestState: 'failure',
        signupError: action.error
      }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */

export const pocketHitsSagas = [takeLatest(POCKET_HITS_SIGNUP_REQUESTED, signupRequest)]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */

function* signupRequest({
  email,
  recaptchaResponseKey,
  utmCampaign,
  utmSource,
  marketingOptIn,
  frequency
}) {
  try {
    const response = yield pocketHitsSignup(
      email,
      recaptchaResponseKey,
      utmCampaign,
      utmSource,
      marketingOptIn,
      frequency
    )
    yield put({ type: POCKET_HITS_SIGNUP_REQUEST_SUCCEEDED, response })
  } catch (error) {
    yield put({ type: POCKET_HITS_SIGNUP_REQUEST_FAILED, error })
  }
}

/** ASYNC REQUESTS
 --------------------------------------------------------------- */
