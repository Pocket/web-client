import { requestGQL } from 'common/utilities/request/request'
import { TOPICS_BY_NAME } from 'common/constants'
import getSlateLineup from 'common/api/queries/get-slate-lineup'
import { processLineup } from 'common/api/derivers/lineups'

export async function getTopicFeed(topic, recommendationCount = 30) {
  return requestGQL({
    query: getSlateLineup,
    variables: { id: TOPICS_BY_NAME[topic].id, recommendationCount, slateCount: 2 }
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  const { slateItemArrays, itemsById } = processLineup(response)
  const curatedItems = slateItemArrays[0]
  const algorithmicItems = slateItemArrays[1]

  return { curatedItems, algorithmicItems, itemsById }
}
