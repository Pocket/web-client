const path = require('path')

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames.map((f) => path.relative(process.cwd(), f)).join(' ')}`

module.exports = {
  '*.ts': [buildEslintCommand, 'prettier --write'],
  '*.tsx': [buildEslintCommand, 'prettier --write'],
  '*.md': ['prettier --write'],
  '*.js': ['prettier --write']
}
