import { request, requestGQL } from 'common/utilities/request/request'
import { TOPICS_BY_NAME } from 'common/constants'
import getSlateLineup from 'common/api/queries/get-slate-lineup'
import { processLineup } from 'common/api/derivers/lineups'

export async function getNewTopicFeed(topic, recommendationCount = 30) {
  return requestGQL({
    query: getSlateLineup,
    variables: { id: TOPICS_BY_NAME[topic].id, recommendationCount, slateCount: 2 }
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

/**
 * Get the topic page feed
 * @param {string} topic Topic to fetch
 * @param {int} (optional @default 5) curated_count Number of curated articles to return
 * @param {int} (optional @default 20) algorithmic_count Number of community sourced articles to return
 */
export function getTopicFeed(topic, curated = 5, algorithmic = 20, ssr = true) {
  return request({
    path: 'v3/discover/topics',
    ssr,
    params: {
      topics: topic,
      curated_count: curated,
      algorithmic_count: algorithmic
    }
  })
}

function handleResponse(response) {
  const { slateItemArrays, itemsById } = processLineup(response)
  const curatedItems = slateItemArrays[0]
  const algorithmicItems = slateItemArrays[1]

  return { curatedItems, algorithmicItems, itemsById }
}
