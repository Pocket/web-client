import { SNOWPLOW_COLLECTOR } from 'common/constants'
import { SNOWPLOW_HEARTBEAT_DELAY } from 'common/constants'
import { SNOWPLOW_HEARTBEAT_INTERVAL } from 'common/constants'
import { SNOWPLOW_CONFIG } from 'common/constants'
import { SNOWPLOW_ANONYMOUS_CONFIG } from 'common/constants'
import { createUserEntity, apiUserEntity } from 'connectors/snowplow/entities'
import { injectInlineScript } from 'common/utilities/inject-script'
import { SNOWPLOW_SCRIPT } from 'common/constants'
import * as Sentry from '@sentry/nextjs'

/**
 * Load the Snowplow script onto the page. Should be called within the document <head>.
 * @param {String} snowplowInstanceName   Name of snowplow function instance.
 */
function loadSnowplow(snowplowInstanceName) {
  // this script is provided by Snowplow, and was added along with v2.14.0 of the
  // tracking script that we publish in our CI deploy step.
  injectInlineScript(`;(function(p,l,o,w,i,n,g){if(!p[i]){p.GlobalSnowplowNamespace=p.GlobalSnowplowNamespace||[];
    p.GlobalSnowplowNamespace.push(i);p[i]=function(){(p[i].q=p[i].q||[]).push(arguments)
    };p[i].q=p[i].q||[];n=l.createElement(o);g=l.getElementsByTagName(o)[0];n.async=1;
    n.src=w;g.parentNode.insertBefore(n,g)}}(window,document,"script","${SNOWPLOW_SCRIPT}","${snowplowInstanceName}"));`)
}

export function initializeSnowplow(user_id, sess_guid, cookied, finalizeInit) {
  try {
    // load snowplow scripts
    loadSnowplow('snowplow')
    if (!snowplow) throw new SnowplowInjectionError()

    // configure snowplow
    const snowplowConfig = (cookied) ? SNOWPLOW_CONFIG : SNOWPLOW_ANONYMOUS_CONFIG
    snowplow('newTracker', 'sp', SNOWPLOW_COLLECTOR, snowplowConfig)

    // enable activity monitoring (heartbeat)
    snowplow('enableActivityTracking', {
      minimumVisitLength: SNOWPLOW_HEARTBEAT_DELAY,
      heartbeatDelay: SNOWPLOW_HEARTBEAT_INTERVAL
    })

    // automatic link tracking
    snowplow('enableLinkClickTracking')

    // automatic form elements tracking
    snowplow('enableFormTracking')

    // add User entity to Snowplow global context
    const userEntity = createUserEntity(user_id, sess_guid)
    const globalContexts = [userEntity, apiUserEntity]
    snowplow('addGlobalContexts', globalContexts)

    // no analytics cookies allowed, make sure user data is clean
    if (!cookied) snowplow('clearUserData')

    finalizeInit()
  } catch (err) {
    Sentry.withScope((scope) => {
      scope.setTag('snowplow')
      scope.setFingerprint('Snowplow Error')
      Sentry.captureMessage(err)
    })
  }
}

class SnowplowInjectionError extends Error {
  constructor(message) {
    super(message)
    this.name = 'SnowplowInjectionError'
  }
}
