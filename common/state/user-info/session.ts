'use server'

import { CONSUMER_KEY } from '@common/constants'
import * as jose from 'jose'
import { cookies } from 'next/headers'
import 'server-only'

type Session = {
  token: string | undefined
  isAuthenticated: boolean
}

/**
 * createSession
 * ---
 * Creates a new session by requesting a JWT token.  If a valid access token is present, the JWT
 * should include authentication data
 */
export async function createSession(): Promise<Session> {
  try {
    // Retrieve the access token (if we have one) to fetch a new JWT
    const accessToken = await cookies().get('accessToken')?.value
    const bearerResponse = await fetch(
      `https://getpocket.com/v3/jwt?access_token=${accessToken}&consumer_key=${CONSUMER_KEY}&enable_cors=1`
    ).then((response) => response.json())

    // If we don't have a bearer token, something has gone wrong with the request
    const { jwt: bearer } = bearerResponse
    if (!bearer) throw new BearerTokenError()

    // Otherwise we will store the new token and pass that valid token back to the function
    // verifying things
    cookies().set({ name: 'bearerToken', value: bearer, httpOnly: true, secure: true, path: '/' })
    const { isAuthenticated } = checkToken(bearer)
    return { token: bearer, isAuthenticated }
  } catch (err) {
    return { token: undefined, isAuthenticated: false }
  }
}

/**
 * verifySession
 * ---
 * Verifies the current session by checking the bearer token from cookies.
 * If the token exists and is not expired, it returns the token and authentication status.
 * Otherwise, it attempts to create a new session.
 */
export async function verifySession(): Promise<Session> {
  try {
    const bearerToken = await cookies().get('bearerToken')?.value
    const accessToken = await cookies().get('accessToken')?.value

    if (bearerToken) {
      const { isExpired, isAuthenticated } = checkToken(bearerToken)

      // If the token states we are authenticated and not expired
      // AND we have an accessToken, let's refresh it.
      // NOTE: Access tokens do not expire on the server side
      if (isAuthenticated && accessToken && !isExpired) {
        const expires = Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days from now.
        cookies().set({
          expires,
          name: 'accessToken',
          value: accessToken,
          httpOnly: true,
          secure: true,
          path: '/'
        })
      }
      if (!isExpired) return { token: bearerToken, isAuthenticated }
    }
    const session: Session = await createSession()
    return session
  } catch (err) {
    return { token: undefined, isAuthenticated: false }
  }
}

/**
 * deleteSession
 * ---
 * Since we are not handling storage of authentication details, we can simulate a log out by
 * removing any token data we have on hand
 */
export async function deleteSession(): Promise<void> {
  cookies().delete('accessToken')
  cookies().delete('bearerToken')
}

/**
 * getClaims
 * ---
 * Decodes a JWT bearer token and returns the claims
 *
 */
export async function getClaims() {
  const bearerToken = await cookies().get('bearerToken')?.value
  if (bearerToken) {
    const claims = jose.decodeJwt(bearerToken)
    return claims
  }

  return {}
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
