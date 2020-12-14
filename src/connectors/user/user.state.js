import { getUserInfo } from 'common/api/user'
import { createGuid } from 'common/api/user'
import { setCookie } from 'nookies'
import { put, takeLatest } from 'redux-saga/effects'
import { getRequestToken, getAccessToken } from 'common/api/oauth'
import { OAUTH_REDIRECT_URL } from 'common/constants'
import { localStore } from 'common/utilities/browser-storage/browser-storage'

import { USER_HYDRATE } from 'actions'
import { USER_REQUEST } from 'actions'
import { USER_DEV_REQUEST } from 'actions'
import { USER_SUCCESS } from 'actions'
import { USER_FAILURE } from 'actions'
import { SESS_GUID_HYDRATE } from 'actions'
import { USER_OAUTH_TOKEN_REQUEST } from 'actions'

const useOAuth = localStore.getItem('useOAuth') || false

const initialState = {
  auth: false,
  sess_guid: null,
  user_status: 'pending',
  useOAuth
}
const yearInMs = 60 * 60 * 24 * 365

/** ACTIONS
 --------------------------------------------------------------- */
export const userHydrate = (hydrate, skipCookies) => ({ type: USER_HYDRATE, hydrate, skipCookies}) //prettier-ignore
export const getUser = () => ({ type: USER_REQUEST })
export const devUser = () => ({ type: USER_DEV_REQUEST })
export const sessGuidHydrate = (sess_guid) => ({type: SESS_GUID_HYDRATE,sess_guid}) //prettier-ignore
export const userOAuthLogIn = () => ({ type: USER_OAUTH_TOKEN_REQUEST })

/** REDUCERS
 --------------------------------------------------------------- */
export const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_HYDRATE: {
      const { hydrate } = action
      const user_status = hydrate === false ? 'invalid' : 'valid'
      const auth = hydrate !== false ? true : hydrate
      return { ...state, ...hydrate, auth, user_status }
    }

    case USER_SUCCESS: {
      const { user } = action
      return { ...state, ...user, auth: true, user_status: 'valid' }
    }

    case USER_FAILURE: {
      return {
        ...state,
        user_status: 'invalid',
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

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const userSagas = [
  takeLatest(USER_REQUEST, userRequest),
  // takeLatest(USER_HYDRATE, hydrateUser),
  takeLatest(USER_OAUTH_TOKEN_REQUEST, userTokenRequest)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* userRequest() {
  const response = yield getUserInfo()
  if (response.xErrorCode) return false

  const { user } = response
  if (user) yield put({ type: USER_SUCCESS, user })
}

/**
 * Side effect when hydrating users.  This will we would store user info
 * if they have opted in to trust their current machine.  If the machine
 * is SkyNet, we just avoid this all together
 * The main function here is to speed up user hydration in the future
 */
// function* hydrateUser(action) {
//   const { hydrate, skipCookies } = action
//   if (!hydrate || skipCookies) return
// }

function* userTokenRequest() {
  const response = yield getRequestToken()

  if (response?.code) {
    const { code } = response

    setCookie(null, 'pkt_request_code', code, {
      samesite: 'lax',
      path: '/',
      maxAge: 5 * 60 * 1000 // 5 minutes
    })

    const origin = window.location.origin
    // Send the user to our oauth page request page
    const loginUrl = `${OAUTH_REDIRECT_URL}?request_token=${code}&redirect_uri=${origin}`
    document.location = loginUrl
  }
}

/** ASYNC Functions
 --------------------------------------------------------------- */
export async function fetchUserData() {
  const response = await getUserInfo()

  if (response.xErrorCode) return false

  const { user } = response
  return user
}

export async function getSessGuid() {
  const response = await createGuid()
  if (response.status !== 1) return false

  const { guid: sess_guid } = response
  setCookie(null, 'sess_guid', sess_guid, {
    samesite: 'lax',
    path: '/',
    maxAge: yearInMs
  })
}

export async function userTokenValidate(code) {
  const response = await getAccessToken(code)
  if (response?.access_token) {
    const { access_token } = response
    setCookie(null, 'pkt_access_token', access_token, {
      samesite: 'lax',
      path: '/',
      maxAge: yearInMs
    })
  }
  return false
}
