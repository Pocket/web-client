import { requestGQL } from 'common/utilities/request/request'
import { arrayToObject } from 'common/utilities'
import getSlateLineup from 'common/api/graphql-queries/get-slate-lineup'
import { slateMeta } from 'common/slate-meta'
import { deriveRecommendation } from 'common/api/derivers/item'

const personalized = '05027beb-0053-4020-8bdc-4da2fcc0cb68'
// const unpersonalized = '249850f0-61c0-46f9-a16a-f0553c222800'
const homeLineup = personalized

export async function getHomeLineup({ recommendationCount = 5 }) {
  const id = homeLineup
  return requestGQL({
    query: getSlateLineup,
    variables: { id, recommendationCount, slateCount: 20 }
  })
    .then(processLineup)
    .catch((error) => console.error(error))
}

function processLineup(response) {
  const isPersonalized = response?.data?.getSlateLineup.id === homeLineup
  const responseData = response?.data?.getSlateLineup
  const { slateLineupExperiment, slateLineupRequestId, slateLineupId, slates } = responseData
  const lineupAnalytics = { slateLineupExperiment, slateLineupRequestId, slateLineupId }

  const itemsById = getRecsById(slates, lineupAnalytics)
  const slatesById = processSlates(slates, isPersonalized)

  const generalSlates = Object.keys(slatesById).filter((id) => slatesById[id].type !== 'topic')
  const topicSlates = Object.keys(slatesById).filter((id) => slatesById[id].type === 'topic')

  return { generalSlates, topicSlates, slatesById, itemsById, isPersonalized }
}

function getRecsById(slates, lineupAnalytics) {
  return slates.reduce((accumulator, current) => {
    const recommendations = deriveItems(current, lineupAnalytics)
    const recsById = arrayToObject(recommendations, 'itemId')
    return { ...accumulator, ...recsById }
  }, {})
}

function processSlates(slates, isPersonalized) {
  const slateWithIds = slates.map((slate) => {
    const derivedSlate = deriveSlate(slate, isPersonalized)
    return derivedSlate
      ? {
          ...derivedSlate,
          recommendations: slate?.recommendations?.map((rec) => rec?.item?.itemId)
        }
      : undefined
  })
  return arrayToObject(slateWithIds, 'slateId')
}

export function deriveItems(slate, lineupAnalytics) {
  const recommendations = slate?.recommendations
  const { slateId, slateRequestId, slateExperimentId, displayName, description } = slate
  const analyticsData = {
    ...lineupAnalytics,
    slateId,
    slateRequestId,
    slateExperimentId,
    displayName,
    description
  }

  return recommendations.map((item) => deriveRecommendation(item, analyticsData))
}

export function deriveSlate(slate) {
  const currentMeta = slateMeta[slate.slateId]
  const updatedMeta = derivedMeta(currentMeta, slate)
  return { ...slate, ...updatedMeta }
}

/** DERIVE Functions
  * ? Derived fields to help clarify logic for what values to use in some common cases
  * ? The data we receive this is not normalized yet.
 --------------------------------------------------------------- */
/** SLATE META
 * @param {object} currentMeta MetaData from a slate
 * @returns {object} The most appropriate meta for the slate
 */
function derivedMeta(currentMeta, slate) {
  const topicSlug = currentMeta?.slug || false
  // Adjust the topic returns since the data is imperfect
  if (topicSlug) {
    return {
      displayName: currentMeta?.curatorTopicLabel,
      description: currentMeta?.description,
      type: currentMeta?.type,
      topicSlug
    }
  }

  // This is a regular old slate so use the supplied meta
  return {
    displayName: slate?.displayName,
    description: slate?.description,
    type: currentMeta?.type || null,
    topicSlug: currentMeta?.slug || false
  }
}
