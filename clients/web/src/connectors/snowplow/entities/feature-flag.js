import { getSchemaUri } from 'connectors/snowplow/snowplow.utilities'

/**
 * Schema information:
 * https://console.snowplowanalytics.com/cf0fba6b-23b3-49a0-9d79-7ce18b8f9618/data-structures/f74e3dd14cdf3157fbced8f7f78061f62016bdbe1e75c85338f3767ea5f139e7
 */
const FEATURE_FLAG_SCHEMA_URL = getSchemaUri('feature_flag')

/**
 * Entity to describe a feature flag, or test/experiment. Expected to be
 * included with any `variant_enroll` event
 *
 * @param name {string} - The name of the feature flag, or test/experiment @required
 * @param variant {string} - The name of the feature flag / test variant. Each feature flag should always include a 'control' variant @required
 * @returns {{schema: *, data: {name: string, variant: string}}}
 */
export const createFeatureFlagEntity = (name, variant) => ({
  schema: FEATURE_FLAG_SCHEMA_URL,
  data: {
    name,
    variant // remember one variant MUST be 'control'!
  }
})

export default createFeatureFlagEntity
