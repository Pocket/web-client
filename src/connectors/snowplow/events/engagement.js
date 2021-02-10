import { getSchemaUri } from 'common/api/snowplow-analytics'

const ENGAGEMENT_SCHEMA_URL = getSchemaUri('engagement')

export const ENGAGEMENT_TYPE_GENERAL = 'general'
export const ENGAGEMENT_TYPE_SAVE = 'save'
export const ENGAGEMENT_TYPE_REPORT = 'report'
/**
 * Event triggered when a user engages with a UI element. Entities included:
 * always api_user, user, ui; sometimes content, ad, report.
 * @param type {(
 *          ENGAGEMENT_TYPE_GENERAL,
 *          ENGAGEMENT_TYPE_SAVE,
 *          ENGAGEMENT_TYPE_REPORT
 *         )} - Indicates the type of engagement
 * @returns {{schema: *, data: {type: *, value: *}}}
 */
const createEngagementEvent = (type, value) => {
  const data = { type }
  if (value) data.value = value

  return {
    schema: ENGAGEMENT_SCHEMA_URL,
    data
  }
}

export default createEngagementEvent
