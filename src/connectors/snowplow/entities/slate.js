import { getSchemaUri } from 'common/api/snowplow-analytics'
import { getObjectWithValidKeysOnly } from 'common/utilities'

/**
 * Schema information:
 * https://console.snowplowanalytics.com/cf0fba6b-23b3-49a0-9d79-7ce18b8f9618/data-structures/9f608b11d56b7ce7c2637fb2d16e2502173d0c924c099653522750aed7d0604f
 */
const SLATE_SCHEMA_URL = getSchemaUri('slate')

/**
 * Entity to describe a slate of recommendations. Should be included with any impression or engagement events with recommendations.
 *
 * @param slate_id {string} - A unique slug/id that is used to identify a slate and its specific configuration. @required
 * @param request_id {string} - A guid that is unique to every API request that returns slates. @required
 * @param experiment {string} - A string identifier of a recommendation experiment. @required
 * @param index {int} - The zero-based index value of the slate’s display position among other slates in the same lineup. @required
 * @param display_name {string} - The name to show the user for a slate. @optional
 * @param description {string} - The description of the slate. @optional
 *
 * @returns {{schema: *, data: {slate_id: string, request_id: string, experiment: string, index: int, ?display_name: string, ?description: string }}}
 */
export const createSlateEntity = ({
  slate_id,
  request_id,
  experiment,
  index,
  display_name,
  description
}) => ({
  schema: SLATE_SCHEMA_URL,
  data: getObjectWithValidKeysOnly({
    slate_id,
    request_id,
    experiment,
    index,
    display_name,
    description
  })
})

export default createSlateEntity
