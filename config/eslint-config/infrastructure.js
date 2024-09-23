const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')

module.exports = {
  extends: ['eslint-config-turbo'].map(require.resolve),
  parserOptions: {
    project
  },
  settings: {
    'import/resolver': {
      typescript: {
        project
      }
    }
  },
  ignorePatterns: ['node_modules/', 'dist/'],
  // add rules configurations here
  rules: {
    'import/no-default-export': 0,
    'import/order': 0,
    'import/no-duplicates': 0,
    camelcase: 0,
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
    'no-unused-vars': ['warn', { vars: 'local', args: 'after-used', ignoreRestSiblings: true }],
    eqeqeq: 0,
    'eslint-comments/require-description': 0,
    'func-names': 0,
    'import/named': 0,
    'import/newline-after-import': 0,
    'import/no-cycle': 0,
    'import/no-named-as-default': 0,
    'import/no-unresolved': 0,
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
    '@typescript-eslint/no-unsafe-call': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
    '@typescript-eslint/no-unsafe-return': 0,
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/restrict-template-expressions': 0
  }
}
