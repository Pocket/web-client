const path = require('path')

require('@babel/register')({
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          layouts: path.join(__dirname, '../src/containers/_layouts'),
          mock: path.join(__dirname, '../.storybook/_data')
        }
      }
    ]
  ]
})
