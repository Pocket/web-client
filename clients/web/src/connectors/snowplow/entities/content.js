import { getSchemaUri } from 'connectors/snowplow/snowplow.utilities'

/**
 * Schema information:
 * https://console.snowplowanalytics.com/cf0fba6b-23b3-49a0-9d79-7ce18b8f9618/data-structures/2670cc5283eccc08b92590ae528a7afade0f677593df2240fac40ce17720c55b
 */
export const CONTENT_SCHEMA_URL = getSchemaUri('content')

/**
 * A unique piece of content (item) within Pocket, usually represented by a URL. Should be included in all events that relate to content (primarily recommendation card impressions/engagements and item page impressions/engagements).
 *
 * @param url {string} - The full URL of the content. @required
 * @returns {{schema: *, data: {url: string}}}
 */
const createContentEntity = ({ url }) => ({
  schema: CONTENT_SCHEMA_URL,
  data: {
    url
  }
})

export default createContentEntity
