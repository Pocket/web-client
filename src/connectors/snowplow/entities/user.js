import { getSchemaUri } from 'common/api/snowplow-analytics'

/**
 * Schema information:
 * https://console.snowplowanalytics.com/cf0fba6b-23b3-49a0-9d79-7ce18b8f9618/data-structures/7d9b5dadf4636e0818411c215770fd3090cb1c226480588fd72c237e89ca9895
 */
const USER_SCHEMA_URL = getSchemaUri('user')

/**
 * Entity to describe a user based on available identifiers. Expected to be included in all events that are [theoretically] initiated by a human.
 *
 * @param hashedUserId {string} - The hashed backend identifier for a full Pocket account. @optional
 * @param hashedSessionGuid {string} - The hashed backend cookie-based identifier for a user (logged in or out). @required
 * @returns {{schema: *, data: {hashed_guid: string, ?hashed_user_id: string}}}
 */
const createUserEntity = (hashedUserId = false, hashedSessionGuid) => {
  const data = hashedUserId
    ? {
        hashed_user_id: hashedUserId,
        hashed_guid: hashedSessionGuid
      }
    : {
        hashed_guid: hashedSessionGuid
      }

  return {
    schema: USER_SCHEMA_URL,
    data
  }
}

export default createUserEntity
