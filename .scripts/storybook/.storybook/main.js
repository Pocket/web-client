const path = require('path')

module.exports = {
  stories: [
    '../../../src/components/**/*.story.@(js|jsx|ts|tsx)',
    '../../../ui/**/*.story.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: '@storybook/react',
  staticDirs: ['../../../public'],
  features: { postcss: false },
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    const alias = {
      mock: path.join(__dirname, './_data'),
      mocks: path.join(__dirname, '../../../__mocks__'),
      media: path.join(__dirname, '../../../public/static'),
      common: path.join(__dirname, '../../../src/common'),
      containers: path.join(__dirname, '../../../src/containers'),
      components: path.join(__dirname, '../../../src/components'),
      connectors: path.join(__dirname, '../../../src/connectors'),
      actions$: path.join(__dirname, '../../../src/actions.js'),
      store$: path.join(__dirname, '../../../src/store.js'),
      layouts: path.join(__dirname, '../../../src/containers/_layouts')
    }
    config.resolve.alias = { ...config.resolve.alias, ...alias }

    // add support for Linaria preprocessing
    config.module.rules.push({
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        { loader: 'babel-loader' },
        {
          loader: 'linaria/loader',
          options: {
            sourceMap: process.env.NODE_ENV !== 'production'
          }
        }
      ]
    })

    config.node = { ...config.node, fs: 'empty' }

    // Return the altered config
    return config
  }
}
