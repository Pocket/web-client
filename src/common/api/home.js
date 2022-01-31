import { requestGQL } from 'common/utilities/request/request'
import getSlateLineup from 'common/api/queries/get-slate-lineup'
import { processLineup } from 'common/api/derivers/lineups'

export async function getHomeLineup({ id, recommendationCount = 5 }) {
  return requestGQL({
    query: getSlateLineup,
    variables: { id, recommendationCount, slateCount: 20 }
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  const { slatesById, itemsById } = processLineup(response)
  const { generalSlates, topicSlates } = splitSlates(slatesById)
  return { generalSlates, topicSlates, slatesById, itemsById }
}

function splitSlates(slatesById) {
  const generalSlates = Object.keys(slatesById).filter((id) => slatesById[id].type !== 'topic')
  const topicSlates = Object.keys(slatesById).filter((id) => slatesById[id].type === 'topic')

  return { generalSlates, topicSlates }
}
