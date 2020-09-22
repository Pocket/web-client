const path = require('path')

require('@babel/register')({
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          layouts: path.join(__dirname, '../src/components/_layouts')
        }
      }
    ]
  ]
})
