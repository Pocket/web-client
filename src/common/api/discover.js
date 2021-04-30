import { request } from 'common/utilities/request/request'
import { GraphQLClient } from 'graphql-request'
import { GRAPHQL_URL } from 'common/constants'
import { TOPIC_IDS } from 'common/constants'

import getSlateLineup from 'common/api/graphql-queries/get-slate-lineup'

export async function getDiscoverFeed(recommendationCount = 30) {
  const variables = { id: TOPIC_IDS['explore'].id, recommendationCount }

  return request({
    api_url: GRAPHQL_URL,
    path: 'graphql',
    method: 'POST',
    body: JSON.stringify({
      query: getSlateLineup,
      variables
    })
  })
    .then(processSlates)
    .catch((error) => console.error(error))
}

function processSlates(response) {
  const slates = response?.data?.getSlateLineup?.slates || []
  const top = slates[0]?.recommendations
  const bottom = slates[1]?.recommendations
  return [...top, ...bottom]
}
