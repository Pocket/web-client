import { getUserInfo } from 'common/api/user'
import { createGuid } from 'common/api/user'
import { getValueFromCookie } from 'common/utilities'
import { setCookie } from 'nookies'

import { HYDRATE } from 'actions'
import { USER_HYDRATE } from 'actions'
import { USER_REQUEST } from 'actions'
import { USER_DEV_REQUEST } from 'actions'
import { USER_SUCCESS } from 'actions'
import { USER_FAILURE } from 'actions'
import { SESS_GUID_HYDRATE } from 'actions'

const initialState = { auth: false, sess_guid: null }

/** ACTIONS
 --------------------------------------------------------------- */
export const userHydrate = (hydrate) => ({ type: USER_HYDRATE, hydrate })
export const getUser = () => ({ type: USER_REQUEST })
export const devUser = () => ({ type: USER_DEV_REQUEST })
export const sessGuidHydrate = (sess_guid) => ({
  type: SESS_GUID_HYDRATE,
  sess_guid
})

/** REDUCERS
 --------------------------------------------------------------- */
export const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_HYDRATE: {
      const { hydrate } = action
      return { ...state, ...hydrate, auth: true }
    }

    case USER_SUCCESS: {
      const { user } = action
      return { ...state, ...user, auth: true }
    }

    case USER_FAILURE: {
      return {
        ...state,
        auth: false // force auth to false
      }
    }

    case SESS_GUID_HYDRATE: {
      const { sess_guid } = action
      return { ...state, sess_guid }
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE:
      const { user } = action.payload
      return { ...state, ...user }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const userSagas = []

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */

/** ASYNC Functions
 --------------------------------------------------------------- */
export async function fetchUserData(ctx) {
  const cookie = ctx?.req?.headers?.cookie
  const response = await getUserInfo(cookie)

  if (response.xErrorCode) return false

  const { user } = response
  return user
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
        domain: 'getpocket.com',
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
