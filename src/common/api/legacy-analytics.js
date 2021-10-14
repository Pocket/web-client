import { legacyAnalyticsTrack as trackRequest } from 'common/utilities/legacy-analytics'
import { CONSUMER_KEY } from 'common/constants'

export const legacyAnalyticsTrack = (params) => {
  return trackRequest(CONSUMER_KEY, params)
}
