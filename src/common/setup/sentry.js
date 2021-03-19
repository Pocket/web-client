const isDev = process.env.NODE_ENV === 'dev'

export const sentrySettings = {
  dsn:
    'https://cc3aea2dd5ca4aefb5a18c671a229237@o28549.ingest.sentry.io/5436250',
  release: process.env.BUILD_ID,
  environment: isDev ? 'Development' : 'Production'
}
