const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    'next',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:perfectionist/recommended-natural',
    'plugin:jsdoc/recommended-typescript-error',
    'plugin:i18next/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'only-warn',
    'jest',
    'react',
    'unicorn',
    'perfectionist',
    'jsdoc',
    'i18next'
  ],
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
      files: ['*.story.tsx', '*.test.tsx'],
      rules: {
        'i18next/no-literal-string': 'off'
      }
    }
  ],
  rules: {
    'import/no-anonymous-default-export': [2, { allowObject: true }],
    '@next/next/no-img-element': 0,
    'react/button-has-type': 'error',
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandLast: true,
        ignoreCase: true,
        reservedFirst: true
      }
    ],
    'react/jsx-boolean-value': ['error', 'always'],
    'react/jsx-no-target-blank': 'off',
    '@typescript-eslint/no-unnecessary-condition': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { vars: 'local', args: 'after-used', ignoreRestSiblings: true }
    ],

    'jsdoc/informative-docs': 1,
    'jsdoc/require-param': 0, // Generally handled by typescript
    'jsdoc/require-returns': 0, // Generally handled by typescript
    'jsdoc/check-tag-names': ['error', { definedTags: ['alpha', 'beta'] }]
  }
}
