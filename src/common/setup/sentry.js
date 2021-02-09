import { Integrations } from '@sentry/tracing'
const isDev = process.env.NODE_ENV !== 'production'

export const sentrySettings = {
  dsn:
    'https://cc3aea2dd5ca4aefb5a18c671a229237@o28549.ingest.sentry.io/5436250',
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: ['localhost.web.getpocket.com/', 'getpocket.com']
    })
  ],
  release: process.env.BUILD_ID,
  tracesSampleRate: 0,
  environment: isDev ? 'Development' : 'Production'
}
