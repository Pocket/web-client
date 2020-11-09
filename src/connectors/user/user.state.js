import { getUserInfo } from 'common/api/user'
import { createGuid } from 'common/api/user'
import { getValueFromCookie } from 'common/utilities'
import { setCookie } from 'nookies'
import { put, takeLatest } from 'redux-saga/effects'
import { getRequestToken, getAccessToken } from 'common/api/oauth'
import { OAUTH_REDIRECT_URL } from 'common/constants'

import { USER_HYDRATE } from 'actions'
import { USER_REQUEST } from 'actions'
import { USER_DEV_REQUEST } from 'actions'
import { USER_SUCCESS } from 'actions'
import { USER_FAILURE } from 'actions'
import { SESS_GUID_HYDRATE } from 'actions'
import { USER_OAUTH_TOKEN_REQUEST } from 'actions'

const initialState = { auth: false, sess_guid: null, user_status: 'pending' }

/** ACTIONS
 --------------------------------------------------------------- */
export const userHydrate = (hydrate) => ({ type: USER_HYDRATE, hydrate })
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

export async function setUserData() {
  // const cookies = parseCookies()
  return { username: 'joel' }
}

/**
 * getSessGuid will get a valid sess_guid from either a cookie or the server,
 * if it gets one from the server, it will also store that guid in a cookie
 * @return {string} sess_guid
 */
export async function checkSessGuid(ctx) {
  try {
    // Get sess_guid
    const cookie = ctx?.req?.headers?.cookie
    const sessGuidSSR = getValueFromCookie('sess_guid', cookie)
    const sess_guid = sessGuidSSR || (await createGuid())

    if (!sessGuidSSR) {
      setCookie(ctx, 'sess_guid', sess_guid, {
        samesite: 'lax',
        path: '/',
        maxAge: 473040000,
        httpOnly: true
      })
    }

    return sess_guid
  } catch (error) {
    return false
  }
}

export async function getSessGuid() {
  const sess_guid = await createGuid()
  setCookie(null, 'sess_guid', sess_guid, {
    samesite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 365
  })
}

export async function userTokenValidate(code) {
  const response = await getAccessToken(code)
  if (response?.access_token) {
    const { access_token } = response
    setCookie(null, 'pkt_access_token', access_token, {
      samesite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365
    })
  }
  return false
}
