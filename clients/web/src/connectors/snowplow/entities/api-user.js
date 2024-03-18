import { API_USER_ID } from 'common/constants'
import { getSchemaUri } from 'connectors/snowplow/snowplow.utilities'

const RELEASE_VERSION = process.env.RELEASE_VERSION || 'v0.0.0'

/**
 * Schema information:
 * https://console.snowplowanalytics.com/cf0fba6b-23b3-49a0-9d79-7ce18b8f9618/data-structures/da71630eac419a8fe06a5b6ff7b4030d53f07713feb23d0d72adf61fc950377b
 */
const API_USER_SCHEMA_URL = getSchemaUri('api_user', '1-0-1')

/**
 * Entity to describe an app using the Pocket API that triggers (not executes) updates on the backend. Expected to be included on all events.
 *
 * @param api_id {string} - Pocket backend identifier for an app using the Pocket API. @required
 * @returns {{schema: *, data: {api_id: string, client_version: string}}}
 */
export const createApiUserEntity = (appUserId) => ({
  schema: API_USER_SCHEMA_URL,
  data: {
    api_id: appUserId,
    client_version: RELEASE_VERSION
  }
})

export const apiUserEntity = createApiUserEntity(API_USER_ID)

export default createApiUserEntity
