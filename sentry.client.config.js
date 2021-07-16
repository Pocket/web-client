// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'
import { Dedupe as DedupeIntegration } from '@sentry/integrations'

const isDev = process.env.SHOW_DEV === 'included'
const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
  dsn: SENTRY_DSN || 'https://cc3aea2dd5ca4aefb5a18c671a229237@o28549.ingest.sentry.io/5436250',
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.5,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
  beforeSend(event, hint) {
    const error = hint.originalException
    // Snowplow trys to adjust userAgent which is a problem client side
    if (error && error.message) {
      if (error.message.match(/pubads_impl/i)) return null
    }
    return event
  },
  whitelistUrls: [/https:\/\/(.+)?getpocket\.com/],
  ignoreErrors: [
    // Random plugins/extensions
    'top.GLOBALS',
    // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
    'originalCreateNotification',
    'canvas.contentDocument',
    // Facebook borked
    'fb_xd_fragment',
    // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to
    // reduce this. (thanks @acdha)
    // See http://stackoverflow.com/questions/4113268
    'bmi_SafeAddOnload',
    'EBCallBackMessageReceived',
    // See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
    'conduitPage'
  ],
  denyUrls: [
    // Ignore Google flakiness
    /\/(gtm|ga|analytics)\.js/i,
    // Facebook flakiness
    /graph\.facebook\.com/i,
    // Facebook blocked
    /connect\.facebook\.net\/en_US\/all\.js/i,
    // Chrome extensions
    /extensions\//i,
    /^chrome:\/\//i
  ],
  release: process.env.BUILD_ID,
  environment: isDev ? 'Development' : 'Production',
  integrations: [new DedupeIntegration()]
})
