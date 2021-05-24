import { ScrollPocketHitsChyron } from 'components/pocket-hits-chyron/scroll-pocket-hits-chyron'
import { trackEmailInputFocus } from './syndicated-article.analytics'
import { trackEmailSubmit } from './syndicated-article.analytics'
import { trackEmailSubmitSuccess } from './syndicated-article.analytics'
import { trackEmailSubmitFailure } from './syndicated-article.analytics'
import { trackEmailValidationError } from './syndicated-article.analytics'
import { trackEmailImpression } from './syndicated-article.analytics'
import { trackEmailDismiss } from './syndicated-article.analytics'

const PH_THRESHOLD_PERCENTAGE = 0.75

export function PocketHitsCta({ isAuthenticated }) {
  return (
    <ScrollPocketHitsChyron
      thresholdPercent={PH_THRESHOLD_PERCENTAGE}
      isAuthenticated={isAuthenticated}
      instanceId="syndicated-ph-signup"
      utmCampaign="article-chyron"
      utmSource="syndication"
      handleSubmit={trackEmailSubmit}
      handleSubmitSuccess={trackEmailSubmitSuccess}
      handleSubmitFailure={trackEmailSubmitFailure}
      handleValidationError={trackEmailValidationError}
      handleEmailInputFocus={trackEmailInputFocus}
      onVisible={trackEmailImpression}
      handleEmailDismiss={trackEmailDismiss}
    />
  )
}
