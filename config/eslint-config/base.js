const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['next', 'plugin:@typescript-eslint/recommended', 'prettier'],
  plugins: ['@typescript-eslint', 'only-warn', 'jest'],
  globals: {
    React: true,
    JSX: true,
    snowplow: true,
    OneTrust: true
  },
  env: {
    node: true
  },
  settings: {
    'import/resolver': {
      typescript: {
        project
      }
    }
  },
  ignorePatterns: [
    '*.tmp.js',
    '**/release-notes/*.js',
    '__mocks__/**/*.js',
    'node_modules/',
    'dist/'
  ],
  overrides: [
    {
      files: ['*.js?(x)', '*.ts?(x)']
    }
  ],
  rules: {
    'prefer-const': 'error',
    'import/no-anonymous-default-export': [2, { allowObject: true }],
    '@next/next/no-img-element': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { vars: 'local', args: 'after-used', ignoreRestSiblings: true }
    ]
  }
}
