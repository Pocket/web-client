const nextBuildId = require('next-build-id')
const assetPrefix = process.env.ASSET_PREFIX || ''
const { i18n } = require('./next-i18next.config.js')
const withLinaria = require('next-linaria')
const { withSentryConfig } = require('@sentry/nextjs')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options.
const SentryWebpackPluginOptions = {
  silent: true // Suppresses all logs
}

const nextOptions = {
  i18n,
  env: {
    SHOW_DEV: process.env.SHOW_DEV,
    RELEASE_VERSION: process.env.RELEASE_VERSION,
    TEST_SNOWPLOW: process.env.TEST_SNOWPLOW
  },
  assetPrefix,
  async rewrites() {
    return [
      { source: '/explore', destination: '/discover' },
      { source: '/explore/item/:slug', destination: '/discover/item/:slug' },
      { source: '/explore/:slug', destination: '/discover/:slug' },
      { source: '/web-client-health', destination: '/health' },
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
      }
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
  },
  //prettier-ignore
  webpack: (config, { webpack }) => {

        config.plugins.push(
          new webpack.DefinePlugin({
            'process.env.BUILD_ID':  JSON.stringify(nextBuildId.sync({ dir: __dirname }))
          }),
          new webpack.ContextReplacementPlugin(/power-assert-formatter/)
        )

        return config
      },
  crossOrigin: 'anonymous',
  generateBuildId: () => nextBuildId({ dir: __dirname })
}

module.exports = withBundleAnalyzer(
  withSentryConfig(withLinaria(nextOptions), SentryWebpackPluginOptions)
)
