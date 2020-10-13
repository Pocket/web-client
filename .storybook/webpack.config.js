const path = require('path')

module.exports = ({ config, mode }) => {
  const alias = {
    mock: path.join(__dirname, './_data'),
    helpers: path.join(__dirname, './helpers'),
    media: path.join(__dirname, '../public/static'),
    common: path.join(__dirname, '../src/common'),
    containers: path.join(__dirname, '../src/containers'),
    components: path.join(__dirname, '../src/components'),
    connectors: path.join(__dirname, '../src/connectors'),
    actions$: path.join(__dirname, '../src/actions.js'),
    store$: path.join(__dirname, '../src/store.js'),
    layouts: path.join(__dirname, '../src/containers/_layouts')
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

  return config
}
