const path = require('path')

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames
    .map((f) => {
      const modified = f.replaceAll(/[\[\]]/g, '\\$&')
      return path.relative(process.cwd(), modified)
    })
    .join(' --file ')}`

module.exports = {
  '*.ts': ['prettier --write'],
  '*.tsx': ['prettier --write'],
  '*.md': ['prettier --write'],
  '*.js': ['prettier --write']
}
