import perfectionist from 'eslint-plugin-perfectionist'

export default [
  {
    plugins: {
      perfectionist
    },
    rules: {
      'perfectionist/sort-exports': 'off',
      'perfectionist/sort-named-exports': 'off',
      'perfectionist/sort-jsx-props': 'off',
      'perfectionist/sort-objects': 'off',
      'perfectionist/sort-union-types': 'off',
      'perfectionist/sort-object-types': 'off',
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          groups: [
            'ui-styles',
            'constants',
            'config',
            'testing',
            'testing-setup',
            'decorators',
            'icons',
            ['frameworks', 'builtin', 'external'],
            'internal',
            'object',
            'state',
            'data',
            ['parent', 'sibling', 'index'],
            [
              'type',
              'internal-type',
              'parent-type',
              'sibling-type',
              'index-type',
              'storybook-type',
              'common-type'
            ],
            'unknown'
          ],
          customGroups: {
            value: {
              'ui-styles': [
                'style',
                '@ui/styles/**',
                './style.module.css',
                '../**/style.module.css'
              ],
              config: ['@config/env'],
              constants: ['@common/constants'],
              frameworks: ['react', 'react-*', 'next/**', '@next/**'],
              icons: ['react-icons/**'],
              testing: ['@config/jest', '@testing-library/**'],
              'testing-setup': ['../__setup__/**', '../__mocks__/**'],
              data: ['@common/mock-data/**', '*.json'],
              decorators: '../_decorators/**',
              'common-type': ['@common/types', '@common/types/**'],
              state: '@common/state/**'
            },
            type: {
              'common-type': ['@common/types', '@common/types/**'],
              'storybook-type': '@storybook/react'
            }
          },
          newlinesBetween: 'ignore',
          internalPattern: ['@ui/components/**', '@common/utilities/**']
        }
      ]
    }
  }
]
