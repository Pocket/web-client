import { getSchemaUri } from 'common/api/snowplow-analytics'

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
