const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    '@vercel/style-guide/eslint/node',
    '@vercel/style-guide/eslint/typescript',
    '@vercel/style-guide/eslint/browser',
    '@vercel/style-guide/eslint/react',
    '@vercel/style-guide/eslint/next',
    'eslint-config-turbo'
  ].map(require.resolve),
  plugins: ['jest'],
  env: {
    'jest/globals': true
  },
  parserOptions: {
    project
  },
  globals: {
    React: true,
    JSX: true,
    snowplow: true
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
  // add rules configurations here
  rules: {
    'import/no-default-export': 0,
    'import/no-anonymous-default-export': [2, { allowObject: true }],
    'import/order': 0,
    'import/no-duplicates': 0,
    camelcase: 0,
    'react/no-unknown-property': 0,
    'react/function-component-definition': 0,
    'react/jsx-boolean-value': 0,
    'react/jsx-no-useless-fragment': 0,
    'react/jsx-curly-brace-presence': 0,
    'react/self-closing-comp': 0,
    'react/button-has-type': 0,
    'react/no-array-index-key': 0,
    'unicorn/filename-case': 0,
    '@next/next/no-img-element': 0,
    'no-useless-escape': 0,
    'no-implicit-coercion': 0,
    'no-nested-ternary': 0,
    'no-console': 0,
    'no-unreachable-loop': 0,
    'prefer-named-capture-group': 0,
    'prefer-promise-reject-errors': 0,
    'prefer-rest-params': 0,
    'array-callback-return': 0,
    'object-shorthand': 0,
    'jsx-a11y/no-autofocus': 0,
    'jsx-a11y/media-has-caption': 0,
    'jsx-a11y/iframe-has-title': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'no-unused-vars': ['warn', { vars: 'local', args: 'after-used', ignoreRestSiblings: true }],
    '@next/next/no-html-link-for-pages': 0,
    eqeqeq: 0,
    'eslint-comments/require-description': 0,
    'func-names': 0,
    'import/named': 0,
    'import/newline-after-import': 0,
    'import/no-cycle': 0,
    'import/no-named-as-default': 0,
    'import/no-unresolved': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/img-redundant-alt': 0,
    'no-bitwise': 0,
    'no-dupe-keys': 0,
    'no-else-return': 0,
    'no-empty-function': 0,
    'no-extra-boolean-cast': 0,
    'no-lone-blocks': 0,
    'no-lonely-if': 0,
    'no-unneeded-ternary': 0,
    'no-unsafe-optional-chaining': 0,
    'no-unused-vars': 0,
    'no-useless-return': 0,
    'no-var': 0,
    'react/hook-use-state': 0,
    'react/jsx-fragments': 0,
    'react/jsx-no-leaked-render': 0,
    'react/no-unstable-nested-components': 0,
    '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
    '@typescript-eslint/no-unsafe-call': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
    '@typescript-eslint/no-unsafe-return': 0,
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/restrict-template-expressions': 0
  }
}
