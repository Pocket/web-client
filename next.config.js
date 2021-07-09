const path = require('path')
const withPlugins = require('next-compose-plugins')
const withCSS = require('./.scripts/with-css')
const nextBuildId = require('next-build-id')
const assetRegEx = /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
const assetPrefix = process.env.ASSET_PREFIX || ''
const { i18n } = require('./next-i18next.config.js')

module.exports = withPlugins([withCSS], {
  i18n,
  env: {
    SHOW_DEV: process.env.SHOW_DEV,
    RELEASE_VERSION: process.env.RELEASE_VERSION
  },
  rewrites() {
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
      { source: '/', destination: '/home', permanent: false },
      {
        source: '/my-list/read/:slug',
        destination: '/read/:slug',
        permanent: true
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

        config.module.rules.push({
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'linaria/loader',
              options: {
                sourceMap: process.env.SHOW_DEV === 'included'
              }
            }
          ]
        })

        config.module.rules.push({
          test: assetRegEx,
          use: [
            {
              loader: 'file-loader',
              options: {
                publicPath: `${assetPrefix}/_next/static/images/`,
                outputPath: `${isServer ? '../' : ''}static/images/`,
                name: '[name].[hash].[ext]'
              }
            }
          ]
        })

        config.plugins.push(
          new webpack.DefinePlugin({
            'process.env.BUILD_ID':  JSON.stringify(nextBuildId.sync({ dir: __dirname }))
          })
        )

        return config
      },
  crossOrigin: 'anonymous',
  generateBuildId: () => nextBuildId({ dir: __dirname }),
  assetPrefix
})
