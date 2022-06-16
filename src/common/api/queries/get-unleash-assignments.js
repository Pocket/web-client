import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'
import * as Sentry from '@sentry/nextjs'

const getUnleashAssignmentsQuery = gql`
  query GetUnleashAssignments(
    $sessionId: String!
    $userId: String
    $accountCreatedAt: String
    $locale: String
    $appName: String
    $recItUserProfile: RecItUserProfile
  ) {
    unleashAssignments(
      context: {
        sessionId: $sessionId
        userId: $userId
        appName: $appName
        properties: {
          accountCreatedAt: $accountCreatedAt
          locale: $locale
          recItUserProfile: $recItUserProfile
        }
      }
    ) {
      assignments {
        name
        assigned
        variant
        payload
      }
    }
  }
`

/**
 * getUnleash
 * @param {string} sessionId unique identifier (sess_guid)
 * @param {string} userId user id if available
 * @param {string} birth account creation date if available
 * @param {string} appName name of the app asking for features
 */
export async function getUnleashAssignments(sessionId, userId, birth, appName, locale, userModels) {
  const variables = {
    sessionId,
    userId,
    accountCreatedAt: birth,
    appName,
    locale,
    recItUserProfile: { userModels }
  }
  return requestGQL({ query: getUnleashAssignmentsQuery, variables })
    .then((response) => response?.data?.getUnleashAssignments)
    .catch((error) => {
      Sentry.withScope((scope) => {
        scope.setFingerprint('Unleash')
        Sentry.captureMessage(error)
      })
    })
}
