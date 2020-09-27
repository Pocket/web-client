import { API_USER_ID } from 'common/constants'
import { getSchemaUri } from 'common/api/snowplow-analytics'

const API_USER_SCHEMA_URL = getSchemaUri('api_user')

export const createApiUserEntity = (appUserId) => ({
  schema: API_USER_SCHEMA_URL,
  data: {
    api_id: appUserId
  }
})

export const apiUserEntity = createApiUserEntity(API_USER_ID)

export default createApiUserEntity
