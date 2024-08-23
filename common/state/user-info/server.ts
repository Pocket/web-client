'use server'

import { getErrorMessage } from '@common/utilities/error-handler'
import { gql, pocketRequest } from '@common/utilities/pocket-request'

import { getClaims, verifySession } from './session'

// Types
import type { ResponseError, UserDisplayData } from '@common/types'
import type { User } from '@common/types/pocket'

/**
 * getUserQuery
 * ---
 * Request query for getting user information
 */
const getUserQuery = gql`
  query User {
    user {
      avatarUrl
      firstName
      lastName
      isPremium
      id
      email
      premiumStatus
      username
    }
  }
`

/**
 * getUser
 * ---
 * Returns user information like first name/last name/email/avatar etc
 * User
 */
export async function getUser(): Promise<UserDisplayData | ResponseError> {
  try {
    const { token, isAuthenticated } = await verifySession()
    if (!isAuthenticated) throw new UserRequestError('User not authenticated')

    const response = await pocketRequest<{ user: User }>({ query: getUserQuery }, token)
    const user: User = response?.user

    if (!user) throw new UserRequestError('User response was not valid')
    return user
  } catch (error) {
    return { responseError: getErrorMessage(error) }
  }
}

/**
 * getStoredUser
 * ---
 * Returns the claims from a stored JWT. This is just an optimistic return
 * and a secondary call to getUser should be made if the claim seems authenticated
 */
export async function getStoredUser(): Promise<UserDisplayData> {
  try {
    const claims = await getClaims()
    if (claims?.encoded_id) {
      return {
        firstName: claims?.first_name as string,
        lastName: claims?.last_name as string,
        email: claims?.email as string,
        avatarUrl: claims?.avatar_url as string,
        id: claims?.encoded_id as string,
        accountCreationDate: claims?.account_creation_date
      }
    }
    return {}
  } catch (err) {
    return {}
  }
}

/**
 * UserRequestError
 * ---
 * Generic UserRequestError to make visibility more useful
 */
class UserRequestError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'UserRequestError'
  }
}
