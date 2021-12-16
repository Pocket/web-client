import { requestGQL } from 'common/utilities/request/request'
import getSlateLineup from 'common/api/graphql-queries/get-slate-lineup'
import { processLineup } from 'common/api/derivers/lineups'

const personalized = '05027beb-0053-4020-8bdc-4da2fcc0cb68'
// const unpersonalized = '249850f0-61c0-46f9-a16a-f0553c222800'
const homeLineup = personalized

export async function getHomeLineup({ recommendationCount = 5 }) {
  const id = homeLineup
  return requestGQL({
    query: getSlateLineup,
    variables: { id, recommendationCount, slateCount: 20 }
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  const isPersonalized = response?.data?.getSlateLineup.id === homeLineup
  const { slatesById, itemsById } = processLineup(response)
  const { generalSlates, topicSlates } = splitSlates(slatesById)
  return { generalSlates, topicSlates, slatesById, itemsById, isPersonalized }
}

function splitSlates(slatesById) {
  const generalSlates = Object.keys(slatesById).filter((id) => slatesById[id].type !== 'topic')
  const topicSlates = Object.keys(slatesById).filter((id) => slatesById[id].type === 'topic')

  return { generalSlates, topicSlates }
}
