// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'
import { Dedupe as DedupeIntegration } from '@sentry/integrations'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
  dsn: SENTRY_DSN || 'https://cc3aea2dd5ca4aefb5a18c671a229237@o28549.ingest.sentry.io/5436250',
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.5,
  sampleRate: 0.5,
  beforeSend(event, hint) {
    const error = hint.originalException
    // Per this thread https://github.com/getsentry/sentry-javascript/issues/1811
    if (window && window.location && window.location.search) {
      if (window.location.search.indexOf('fbclid') !== -1) return null
    }

    // Pocket IOS injection error
    if (error && error.message) {
      if (error.message.match(/pktAnnotationHighlighter/i)) return null
    }
    return event
  },
  whitelistUrls: [/https:\/\/(.+)?getpocket\.com/],
  ignoreErrors: [
    // Firefox Extension misbehaving
    "TypeError: can't access dead object", //eslint-disable-line
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
  integrations: [new DedupeIntegration()]
})
