// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
  dsn: SENTRY_DSN || 'https://cc3aea2dd5ca4aefb5a18c671a229237@o28549.ingest.sentry.io/5436250',
  sampleRate: 0.5,
  beforeSend(event, hint) {
    const error = hint.originalException

    if (window && window.location && window.location.search) {
      // Per this thread https://github.com/getsentry/sentry-javascript/issues/1811
      if (window.location.search.indexOf('fbclid') !== -1) return null

      // This will group the article not found errors as it seems to be another ios injection error
      // We are not gonna ignore it until that's confirmed but it will give us a clearer sense
      // of volume
      if (window.location.search.indexOf('mobile_web_view') !== -1) {
        event.fingerprint = ['mobile-web-view']
      }
    }

    if (error && error.message) {
      // Pocket IOS injection error
      if (error.message.match(/pktAnnotationHighlighter/i)) return null

      // Firefox Extension misbehaving
      if (error.message.match(/can't access dead object/i)) return null

      // Apple mail peek error (we don't use a raw variable `article`)
      if (error.message.match(/Can't find variable: article/i)) return null

      // Snowplow trying to redefine the user agent
      // !! NOTE: we should remove this once we upgrade snowplow for the browser
      if (error.message.match(/can't redefine non-configurable property "userAgent"/i)) return null
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
  ]
})
