import { SNOWPLOW_COLLECTOR } from 'common/constants'
import { SNOWPLOW_HEARTBEAT_DELAY } from 'common/constants'
import { SNOWPLOW_HEARTBEAT_INTERVAL } from 'common/constants'
import { SNOWPLOW_CONFIG } from 'common/constants'
import { SNOWPLOW_ANONYMOUS_CONFIG } from 'common/constants'
import { createUserEntity, apiUserEntity } from 'connectors/snowplow/entities'
import {
  newTracker,
  setUserId,
  addGlobalContexts,
  enableActivityTracking,
  clearUserData
} from '@snowplow/browser-tracker'
import {
  LinkClickTrackingPlugin,
  enableLinkClickTracking
} from '@snowplow/browser-plugin-link-click-tracking'
import {
  ButtonClickTrackingPlugin,
  enableButtonClickTracking
} from '@snowplow/browser-plugin-button-click-tracking'
import { FormTrackingPlugin, enableFormTracking } from '@snowplow/browser-plugin-form-tracking'
import { PerformanceNavigationTimingPlugin } from '@snowplow/browser-plugin-performance-navigation-timing'
import { ClientHintsPlugin } from '@snowplow/browser-plugin-client-hints'
import { PrivacySandboxPlugin } from '@snowplow/browser-plugin-privacy-sandbox'
import { TimezonePlugin } from '@snowplow/browser-plugin-timezone'

import * as Sentry from '@sentry/nextjs'

export function initializeSnowplow(user_id, sess_guid, cookied, finalizeInit) {
  try {
    // configure snowplow
    const snowplowConfig = cookied ? SNOWPLOW_CONFIG : SNOWPLOW_ANONYMOUS_CONFIG
    newTracker('sp', SNOWPLOW_COLLECTOR, {
      ...snowplowConfig,
      plugins: [
        LinkClickTrackingPlugin(),
        ButtonClickTrackingPlugin(),
        FormTrackingPlugin(),
        PerformanceNavigationTimingPlugin(),
        ClientHintsPlugin(),
        PrivacySandboxPlugin(),
        TimezonePlugin()
      ]
    })
    // add User entity to Snowplow global context
    const userEntity = createUserEntity(user_id, sess_guid)
    const globalContexts = [userEntity, apiUserEntity]
    setUserId(user_id)
    addGlobalContexts(globalContexts)

    // enable activity monitoring (heartbeat)
    enableActivityTracking({
      minimumVisitLength: SNOWPLOW_HEARTBEAT_DELAY,
      heartbeatDelay: SNOWPLOW_HEARTBEAT_INTERVAL
    })

    // automatic link tracking
    enableLinkClickTracking()

    // automatic button tracking
    enableButtonClickTracking()

    // automatic form elements tracking
    enableFormTracking()

    // no analytics cookies allowed, make sure user data is clean
    if (!cookied) clearUserData()

    finalizeInit()
  } catch (err) {
    Sentry.withScope((scope) => {
      scope.setTag('snowplow')
      scope.setFingerprint('Snowplow Error')
      Sentry.captureMessage(err)
    })
  }
}
