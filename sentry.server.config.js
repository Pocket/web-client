// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

const isDev = process.env.SHOW_DEV === 'included'
const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
  dsn: SENTRY_DSN || 'https://cc3aea2dd5ca4aefb5a18c671a229237@o28549.ingest.sentry.io/5436250',
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.5,
  sampleRate: 0.5,
  whitelistUrls: [/https:\/\/(.+)?getpocket\.com/],
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps

  release: process.env.BUILD_ID,
  environment: isDev ? 'Development' : 'Production'
})
