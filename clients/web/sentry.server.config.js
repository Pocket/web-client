// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
  dsn: SENTRY_DSN || 'https://cc3aea2dd5ca4aefb5a18c671a229237@o28549.ingest.sentry.io/5436250',
  // Adjust this value in production, or use tracesSampler for greater control
  sampleRate: 0.5,
  beforeSend(event, hint) {
    const error = hint.originalException

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
  }
})
