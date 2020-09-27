import { getSchemaUri } from 'common/api/snowplow-analytics'

const FEATURE_FLAG_SCHEMA_URL = getSchemaUri('feature_flag')

/**
 * Entity to describe a feature flag, or test/experiment. Expected to be included with any `variant_enroll` event
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
