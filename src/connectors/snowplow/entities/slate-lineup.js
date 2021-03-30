import { getSchemaUri } from 'common/api/snowplow-analytics'

/**
 * Schema information:
 * https://console.snowplowanalytics.com/cf0fba6b-23b3-49a0-9d79-7ce18b8f9618/data-structures/9f608b11d56b7ce7c2637fb2d16e2502173d0c924c099653522750aed7d0604f
 */
const SLATE_SCHEMA_URL = getSchemaUri('slate_lineup')

/**
 * Entity to describe a lineup of slates. Should be included with any impression or engagement events with recommendations in a slate lineup view.
 *
 * @param slate_lineup_id {string} - A unique slug/id that is used to identify a slate lineup and its specific configuration. @required
 * @param request_id {string} - A guid that is unique to every API request that returns slates. @required
 * @param experiment {string} - A string identifier of a recommendation experiment. @required
 *
 * @returns {{schema: *, data: {slate_lineup_id: string, request_id: string, experiment: string }}}
 */
export const createSlateLineupEntity = (slate_lineup_id, request_id, experiment) => ({
  schema: SLATE_SCHEMA_URL,
  data: {
    slate_lineup_id,
    request_id,
    experiment
  }
})

export default createSlateLineupEntity
