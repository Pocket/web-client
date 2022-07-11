import { getSchemaUri } from 'connectors/snowplow/snowplow.utilities'

/**
 * Schema information:
 * https://console.snowplowanalytics.com/cf0fba6b-23b3-49a0-9d79-7ce18b8f9618/data-structures/a06b8567dc9d443fcdc750a09f14f890b20d3b9400a08f6733d9ebe46bc6dc10
 */
const RECOMMENDATION_SCHEMA_URL = getSchemaUri('corpus_recommendation')

/**
 * Entity to describe a content recommendation. Should be included with any impression or engagement events with recommendations.
 *
 * @param corpus_recommendation_id {string} - The unique identifier for a recommendation, which is sometimes referred to as a feed_item_id. @required
 * @returns {{schema: *, data: {corpus_recommendation_id: string}}}
 */
export const createCorpusRecommendationEntity = ({ corpusRecommendationId }) => ({
  schema: RECOMMENDATION_SCHEMA_URL,
  data: {
    corpus_recommendation_id: corpusRecommendationId
  }
})

export default createCorpusRecommendationEntity
