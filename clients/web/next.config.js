/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config.js')
const nextOptions = {
  output: 'standalone',
  transpilePackages: ['@ui/icons', '@ui/components', '@common/i18n'],
  i18n,
  env: {
    SHOW_DEV: process.env.SHOW_DEV,
    RELEASE_VERSION: process.env.RELEASE_VERSION,
    TEST_SNOWPLOW: process.env.TEST_SNOWPLOW,
    REVALIDATION_TOKEN: process.env.REVALIDATION_TOKEN
  },
  compiler: {
    emotion: true
  },
  assetPrefix: process.env.ASSET_PREFIX,
  async rewrites() {
    return [
      { source: '/explore', destination: '/discover' },
      { source: '/explore/item/:slug', destination: '/discover/item/:slug' },
      { source: '/explore/:slug', destination: '/discover/:slug' },
      { source: '/web-client-health', destination: '/api/health' },
      { source: '/web-client-api/:path*', destination: '/api/:path*' }
    ]
  },
  async redirects() {
    return [
      {
        source: '/my-list/read/:slug',
        destination: '/read/:slug',
        permanent: true
      },
      {
        source: '/get-started',
        destination: '/home',
        permanent: false
      },
      {
        source: '/collections/page/1',
        destination: '/collections',
        permanent: false
      },
      {
        source: '/listen/:anything*',
        destination:
          'https://help.getpocket.com/article/1081-listening-to-articles-in-pocket-with-text-to-speech',
        permanent: false,
        basePath: false
      },
      { source: '/saves', destination: '/home', permanent: false },
      { source: '/collections', destination: '/home', permanent: false },
      { source: '/explore', destination: '/home', permanent: false },
      { source: '/discover', destination: '/home', permanent: false },
      { source: '/farewell', destination: '/home', permanent: false }
    ]
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: [{ key: 'X-Frame-Options', value: 'SAMEORIGIN' }]
      }
    ]
  }
}

module.exports = nextOptions
