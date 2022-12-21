import { arrayToObject } from 'common/utilities/object-array/object-array'
import { slateMeta } from 'common/slate-meta'
import { deriveRecommendation } from 'common/api/derivers/item'

/**
 * Process lineup
 * This takes a lineup and returns fully derived and enriched items as well as slates by Id
 * @param {graphQL} response
 * @returns {object}
 *   @param {object} slateItemArrays
 *   @param {object} slatesById
 *   @param {object} itemsById
 */
export function processLineup(response, utmId) {
  const responseData = response?.data?.getSlateLineup
  const { slateLineupExperiment, slateLineupRequestId, slateLineupId, slates } = responseData
  const lineupAnalytics = { slateLineupExperiment, slateLineupRequestId, slateLineupId }

  // All the items returned in an key/value object where itemId is the key
  const itemsById = getRecsById(slates, lineupAnalytics, utmId)

  // All the slates returned in an key/value object where itemId is the key
  const slatesById = processSlates(slates)

  // Array of items preserved in each slate
  const slateItemArrays = slates.map((slate) =>
    slate?.recommendations.map((rec) => rec?.item?.itemId)
  )

  return { slateItemArrays, slatesById, itemsById }
}

export function getRecsById(slates, lineupAnalytics, utmId) {
  return slates.reduce((accumulator, current) => {
    const recommendations = deriveItems(current, lineupAnalytics, utmId)
    const recsById = arrayToObject(recommendations, 'itemId')
    return { ...accumulator, ...recsById }
  }, {})
}

function processSlates(slates) {
  const slateWithIds = slates.map((slate) => {
    const derivedSlate = enrichSlate(slate)
    return derivedSlate
      ? {
          ...derivedSlate,
          recommendations: slate?.recommendations?.map((rec) => rec?.item?.itemId)
        }
      : undefined
  })
  return arrayToObject(slateWithIds, 'slateId')
}

function deriveItems(slate, lineupAnalytics, utmId) {
  const recommendations = slate?.recommendations
  const { slateId, slateRequestId, slateExperiment, displayName, description } = slate
  const analyticsData = {
    ...lineupAnalytics,
    slateId,
    slateRequestId,
    slateExperiment,
    displayName,
    description
  }

  return recommendations.map((item) => deriveRecommendation(item, analyticsData, utmId))
}

/** Enrichment Functions
 --------------------------------------------------------------- */
/**
 * This gives us a chance to adjust some of the meta data.  This function will be unncessary when
 * we have more consistent meta coming in from the server.
 * @param {object} slate
 * @returns object
 */
function enrichSlate(slate) {
  const currentMeta = slateMeta[slate.slateId]
  const updatedMeta = derivedMeta(currentMeta, slate)
  return { ...slate, ...updatedMeta }
}

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
