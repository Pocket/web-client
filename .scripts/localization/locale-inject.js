const fs = require('fs-extra')

try {
  fs.copySync('node_modules/@pocket/web-localization/locales', 'public/locales')
  console.log('success!')
} catch (err) {
  console.error(err)
}
