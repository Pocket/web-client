/**
 * GET RECS IDS
 * @param {object} data Object returned from the Recs API endpoint
 */
export function getRecIds(data) {
  const { id, experimentId, requestId } = data
  return {
    requestId,
    experimentId,
    id
  }
}

/**
 * RECOMMENDATIONS FROM SLATE
 * @param {object} data Object returned from the Recs API endpoint
 * @param {object} slateLineup Object built by the getRecsIds function
 */
export function recommendationsFromSlate(data, slateLineup) {
  const recs = data.recommendations.map(item => {
    return {
      ...item,
      slateLineup,
      slate: getRecIds(data)
    }
  })

  return recs
}
