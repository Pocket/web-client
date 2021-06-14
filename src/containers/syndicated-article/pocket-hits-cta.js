import { ScrollPocketHitsChyron } from 'components/pocket-hits-chyron/scroll-pocket-hits-chyron'
import { trackEmailSubmitSuccess } from './syndicated-article.analytics'

const PH_THRESHOLD_PERCENTAGE = 0.75

export function PocketHitsCta({ isAuthenticated }) {
  return (
    <ScrollPocketHitsChyron
      thresholdPercent={PH_THRESHOLD_PERCENTAGE}
      isAuthenticated={isAuthenticated}
      instanceId="syndicated-ph-signup"
      utmCampaign="article-chyron"
      utmSource="syndication"
      handleSubmitSuccess={trackEmailSubmitSuccess}
    />
  )
}
