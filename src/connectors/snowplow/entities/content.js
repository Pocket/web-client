import { getSchemaUri } from 'common/api/snowplow-analytics'

export const CONTENT_SCHEMA_URL = getSchemaUri('content')

const createContentEntity = (url, itemId) => {
  const data = { url }
  if (itemId) data.item_id = parseInt(itemId, 10)

  return {
    schema: CONTENT_SCHEMA_URL,
    data
  }
}

export default createContentEntity
