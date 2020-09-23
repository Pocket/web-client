import { getSchemaUri } from 'common/api/snowplow-analytics'

export const CONTENT_SCHEMA_URL = getSchemaUri('content')

const createContentEntity = (url, itemId) => ({
  schema: CONTENT_SCHEMA_URL,
  data: {
    item_id: parseInt(itemId, 10),
    url
  }
})

export default createContentEntity
