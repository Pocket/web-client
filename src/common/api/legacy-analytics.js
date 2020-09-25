import { track as trackRequest } from '@pocket/web-utilities/legacy-analytics'
import { CONSUMER_KEY } from 'common/constants'

export const legacyAnalyticsTrack = (params) => {
  return trackRequest(CONSUMER_KEY, params)
}
