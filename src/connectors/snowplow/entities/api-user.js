import { API_USER_ID } from 'common/constants'
import { getSchemaUri } from 'common/api/snowplow-analytics'

const RELEASE_VERSION = process.env.RELEASE_VERSION || 'v0.0.0'

const API_USER_SCHEMA_URL = getSchemaUri('api_user', '1-0-1')

export const createApiUserEntity = (appUserId) => ({
  schema: API_USER_SCHEMA_URL,
  data: {
    api_id: appUserId,
    client_version: RELEASE_VERSION
  }
})

export const apiUserEntity = createApiUserEntity(API_USER_ID)

export default createApiUserEntity
