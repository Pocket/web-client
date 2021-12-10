const path = require('path')
const nextBuildId = require('next-build-id')
const assetRegEx = /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
const assetPrefix = process.env.ASSET_PREFIX || ''
const { i18n } = require('./next-i18next.config.js')
const withLinaria = require('next-linaria')
const { withSentryConfig } = require('@sentry/nextjs')

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
      }
    ]
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' }
        ]
      }
    ]
  },
  //prettier-ignore
  webpack: (config, { isServer, webpack }) => {

        config.resolve.alias['static'] = path.join(__dirname, 'public/static')
        config.resolve.alias['common'] = path.join(__dirname, 'src/common')
        config.resolve.alias['containers'] = path.join(__dirname, 'src/containers')
        config.resolve.alias['components'] = path.join(__dirname, 'src/components')
        config.resolve.alias['connectors'] = path.join(__dirname, 'src/connectors')
        config.resolve.alias['layouts'] = path.join(__dirname, 'src/containers/_layouts')
        config.resolve.alias['pages'] = path.join(__dirname, 'src/pages')
        config.resolve.alias['actions$'] = path.join(__dirname, 'src/actions.js')
        config.resolve.alias['store$'] = path.join(__dirname, 'src/store.js')

        // Replace @sentry/node imports with @sentry/browser when client side
        if (!isServer) {
          config.resolve.alias['@sentry/node'] = '@sentry/react'
        }

        config.plugins.push(
          new webpack.DefinePlugin({
            'process.env.BUILD_ID':  JSON.stringify(nextBuildId.sync({ dir: __dirname }))
          }),
          new webpack.ContextReplacementPlugin(/power-assert-formatter/)
        )

        return config
      },
  crossOrigin: 'anonymous',
  generateBuildId: () => nextBuildId({ dir: __dirname }),
  assetPrefix
}

module.exports = withSentryConfig(withLinaria(nextOptions), SentryWebpackPluginOptions)
