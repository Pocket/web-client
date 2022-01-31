import { GraphQLClient } from 'graphql-request'
import { UNLEASH_API_URL } from 'common/constants'
import getUnleashAssignments from './queries/get-unleash-assignments'

/**
 * getUnleash
 * @param {string} sessionId unique identifier (sess_guid)
 * @param {string} userId user id if available
 * @param {string} birth account creation date if available
 * @param {string} appName name of the app asking for features
 */
export async function getUnleash(sessionId, userId, birth, appName, locale, userModels) {
  const variables = {
    sessionId,
    userId,
    accountCreatedAt: birth,
    appName,
    locale,
    recItUserProfile: { userModels }
  }
  const url = UNLEASH_API_URL
  const client = new GraphQLClient(url)
  return await client
    .request(getUnleashAssignments, variables)
    .then((response) => response.getUnleashAssignments)
    .catch((error) => console.error(error))
}
