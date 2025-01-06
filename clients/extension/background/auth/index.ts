import * as jose from 'jose'
import { v4 as uuidv4 } from 'uuid'
import { LOGOUT_URL, AUTH_URL, CONSUMER_KEY } from '../../constants'
import { getSetting, setSettings } from '../../utilities/storage'

import type { V3AuthorizationResponse, JWTResponse } from '../../types'

/**
 * setAuth
 * ---
 * Takes a token and a userId and requests valid authorizations to use in
 * requests
 */
export async function setAuth(token: string, userId: string) {
  // Getting a Guid to use in the request
  // Getting an auth token
  try {
    const guid = await getGuid()
    if (!guid) throw new Error('Guid could not be generated')

    await authorize(guid, token, userId)
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

export function logOut() {
  void chrome.tabs.create({ url: LOGOUT_URL })
}

export function loggedOutOfPocket() {
  void chrome.storage.local.clear()
}

export function logIn() {
  void chrome.tabs.create({ url: AUTH_URL })
}

/* GUID
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export async function getGuid(): Promise<string> {
  const extensionGuid = await getExtensionGuid()
  if (extensionGuid) return extensionGuid as string

  const siteGuid = await getSiteGuid()
  if (siteGuid) return siteGuid

  return uuidv4()
}

export async function getExtensionGuid() {
  const guid = await getSetting('guid')
  return guid ? guid : false
}

export async function getSiteGuid() {
  const cookies = await chrome.cookies.get({
    url: 'https://getpocket.com/',
    name: 'sess_guid'
  })

  return cookies?.value
}

/**
 * Authorize
 * ---
 * This takes the token we get from our extension log in and gets an access_token
 * for us to store and create sessions with
 */
export async function authorize(guid: string, token: string, user_id: string) {
  const headers = new Headers({
    'X-Accept': 'application/json',
    'Content-Type': 'application/json'
  })

  const response = await fetch('https://getpocket.com/v3/oauth/authorize/', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      consumer_key: CONSUMER_KEY,
      guid,
      token,
      user_id,
      account: '1',
      grant_type: 'extension'
    })
  })

  if (!response.ok) {
    throw new Error(`An error has occurred: ${response.status}`)
  }

  const { access_token, account, username } = (await response.json()) as V3AuthorizationResponse
  if (!access_token || !account) throw new Error(`Error getting account information `)

  const { premium_status } = account

  await setSettings({ access_token, premium_status, username })
  await createSession()
}

/**
 * createSession
 * ---
 * Creates a new session by requesting a JWT token.  If a valid access token is present, the JWT
 * should include authentication data
 */
export async function createSession() {
  try {
    // Retrieve the access token (if we have one) to fetch a new JWT
    const access_token = (await getSetting('access_token')) as string
    const response = await fetch(
      `https://getpocket.com/v3/jwt?access_token=${access_token}&consumer_key=${CONSUMER_KEY}`
    )

    // General error like the server is not responding
    if (!response.ok) throw new BearerTokenError(`Server Error: ${response.status}`)

    // If we don't have a bearer token, something has gone wrong with the response
    const { jwt: bearer_token } = (await response.json()) as JWTResponse
    if (!bearer_token) throw new BearerTokenError(`Bad response: ${response.status}`)

    // Otherwise we will store the new token and pass that valid token back to
    // the function verifying things
    await setSettings({ bearer_token })
    return bearer_token
  } catch (err) {
    console.error(err)
    return
  }
}

/**
 * verifySession
 * ---
 * Verifies the current session by checking the bearer token from cookies.
 * If the token exists and is not expired, it returns the token and authentication status.
 * Otherwise, it attempts to create a new session.
 */
export async function verifySession(): Promise<string | undefined> {
  try {
    const bearer_token = (await getSetting('bearer_token')) as string

    if (bearer_token) {
      const { isExpired } = checkToken(bearer_token)
      if (!isExpired) return bearer_token
    }

    const new_bearer_token = await createSession()
    return new_bearer_token
  } catch (err) {
    console.log(err)
    return
  }
}

/**
 * checkToken
 * ---
 * Decodes a JWT bearer token and determines its authentication and expiration status.
 *
 */
function checkToken(bearerToken: string) {
  const claims = jose.decodeJwt(bearerToken)
  const isAuthenticated = claims?.sub !== 'anonymous'
  const isExpired = claims?.exp ? Date.now() >= claims?.exp * 1000 : true

  return { isAuthenticated, isExpired }
}

/**
 * UserRequestError
 * ---
 * Something has gone wrong with the request at the server level
 */
class BearerTokenError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'BearerTokenError'
  }
}
