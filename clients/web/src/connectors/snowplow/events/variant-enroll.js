import { getSchemaUri } from 'connectors/snowplow/snowplow.utilities'

/**
 * Schema information:
 * https://console.snowplowanalytics.com/cf0fba6b-23b3-49a0-9d79-7ce18b8f9618/data-structures/1945896af520f129eb62b20ceef8cca5be4e3285754b7e51093c089a1ccc7ee9
 */
const VARIANT_ENROLL_SCHEMA_URL = getSchemaUri('variant_enroll')

/**
 * Event triggered when an app enrolls a user in a test (details in “How to
 * Implement A/B Test Analytics” in Analytics wiki). Entities included:
 * always api_user, user, feature_flag; sometimes ui.
 *
 * @returns {{schema: *, data: {type: string}}}
 */
const createVariantEnrollEvent = () => ({
  schema: VARIANT_ENROLL_SCHEMA_URL,
  data: {}
})

export default createVariantEnrollEvent
