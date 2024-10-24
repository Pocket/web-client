const path = require('path')

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`

module.exports = {
  '*.ts': [buildEslintCommand, 'prettier --write'],
  '*.tsx': [buildEslintCommand, 'prettier --write'],
  '*.md': ['prettier --write'],
  '*.js': ['prettier --write']
}
