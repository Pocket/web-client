import { put, takeLatest, call } from 'redux-saga/effects'

import { getUserInfo } from 'common/api/_legacy/user'
import { createGuid } from 'common/api/_legacy/user'
import { getRecItProfile } from 'common/api/_legacy/user'

import { setCookie } from 'nookies'

import { USER_REQUEST } from 'actions'
import { USER_SUCCESS } from 'actions'
import { USER_FAILURE } from 'actions'
import { SESS_GUID_HYDRATE } from 'actions'

import { userProfileReducers, userProfileSagas } from 'containers/account/profile/profile.state'
import { userEmailReducers, userEmailSagas } from 'containers/account/email/email.state'
import { userNotificationReducers, userNotificationSagas } from 'containers/account/notifications/notfications.state' // prettier-ignore
import { userConnectedServicesReducers, userConnectedServicesSagas } from 'containers/account/connections/connections.state' // prettier-ignore
import { userPrivacyReducers, userPrivacySagas } from 'containers/account/privacy/privacy.state'

const initialState = {
  auth: false,
  sess_guid: null,
  user_status: 'pending'
}

const yearInMs = 60 * 60 * 24 * 365

/** ACTIONS
 --------------------------------------------------------------- */
export const setUser = (newVisitor) => ({ type: USER_REQUEST, newVisitor}) //prettier-ignore
export const sessGuidHydrate = (sess_guid) => ({type: SESS_GUID_HYDRATE,sess_guid}) //prettier-ignore

/** REDUCERS
 --------------------------------------------------------------- */
export const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_SUCCESS: {
      const { user, recent_searches, user_models = [] } = action
      return {
        ...state,
        ...user,
        recent_searches,
        auth: true,
        user_status: 'valid',
        user_models
      }
    }

    case USER_FAILURE: {
      return {
        ...state,
        user_status: 'invalid',
        user_models: [],
        auth: false // force auth to false
      }
    }

    case SESS_GUID_HYDRATE: {
      const { sess_guid } = action
      return { ...state, sess_guid }
    }

    default:
      return state
  }
}

export const accountReducers = {
  userProfile: userProfileReducers,
  userEmail: userEmailReducers,
  userNotifications: userNotificationReducers,
  userConnectedServices: userConnectedServicesReducers,
  userPrivacy: userPrivacyReducers
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const userSagas = [
  takeLatest(USER_REQUEST, userRequest),
  ...userProfileSagas,
  ...userEmailSagas,
  ...userNotificationSagas,
  ...userConnectedServicesSagas,
  ...userPrivacySagas
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* userRequest(action) {
  // If the user has no sess_guid, we just want to set user to invalid
  // and treat them as logged out
  const { newVisitor } = action
  if (newVisitor) return yield put({ type: USER_FAILURE })

  // Otherwise let's grab the user info use
  const response = yield call(getUserInfo)

  // Not logged in, or something else went awry?
  if (response?.xErrorCode) return yield put({ type: USER_FAILURE })

  // Yay we have a user
  const { user } = response
  const { username, first_name, last_name, profile, email, aliases, friend, ...rest } = user

  // Check to see if the user has a personalization profile
  const recitProfileResponse = yield call(getRecItProfile)
  const { user_models = [] } = recitProfileResponse || {}

  if (user)
    return yield put({
      type: USER_SUCCESS,
      user: rest,
      profile: { username, first_name, last_name, ...profile },
      user_models,
      aliases,
      email,
      friend
    })
}

/** ASYNC Functions
 --------------------------------------------------------------- */

export async function getSessGuid() {
  const response = await createGuid()
  if (response.status !== 1) return false

  const { guid: sess_guid } = response
  setCookie(null, 'sess_guid', sess_guid, {
    samesite: 'lax',
    path: '/',
    maxAge: yearInMs
  })

  return sess_guid
}
