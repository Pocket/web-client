import { getSchemaUri } from 'connectors/snowplow/snowplow.utilities'
import { getObjectWithValidKeysOnly } from 'common/utilities/object-array/object-array'

/**
 * Schema information:
 * https://console.snowplowanalytics.com/cf0fba6b-23b3-49a0-9d79-7ce18b8f9618/data-structures/94f5d471bda9fff772fb3a36f675ca965d1ddd8d90eb4e9ced1a27ffe7f371e3
 */
const ENGAGEMENT_SCHEMA_URL = getSchemaUri('engagement')

export const ENGAGEMENT_TYPE_GENERAL = 'general'
export const ENGAGEMENT_TYPE_SAVE = 'save'
export const ENGAGEMENT_TYPE_REPORT = 'report'
/**
 * Event triggered when a user engages with a UI element. Entities included:
 * always api_user, user, ui; sometimes content, ad, report.
 * @param engagementType {(
 *          ENGAGEMENT_TYPE_GENERAL,
 *          ENGAGEMENT_TYPE_SAVE,
 *          ENGAGEMENT_TYPE_REPORT
 *         )} - Indicates the type of engagement. @required
 * @param value {string} - The new value of a setting/filter, if the user engaged with something and modified its state in doing so. @optional
 * @returns {{schema: *, data: {type: *, value: *}}}
 */
const createEngagementEvent = ({ engagementType = 'general', value }) => ({
  schema: ENGAGEMENT_SCHEMA_URL,
  data: getObjectWithValidKeysOnly({
    type: engagementType,
    value
  })
})

export default createEngagementEvent
