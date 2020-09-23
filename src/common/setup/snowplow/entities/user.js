import { getSchemaUri } from 'common/api/snowplow-analytics'

const USER_SCHEMA_URL = getSchemaUri('user')

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
