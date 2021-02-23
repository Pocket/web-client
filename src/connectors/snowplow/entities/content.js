import { getSchemaUri } from 'common/api/snowplow-analytics'

export const CONTENT_SCHEMA_URL = getSchemaUri('content')

const createContentEntity = (url, resolvedId, itemId) => {
  const data = { url }
  // possible resolvedId is 0, return itemId in that instance
  if (resolvedId || itemId) {
    data.item_id = parseInt(resolvedId, 10) || parseInt(itemId, 10)
  }

  return {
    schema: CONTENT_SCHEMA_URL,
    data
  }
}

export default createContentEntity
