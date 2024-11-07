// type-check

import perfectionist from '@config/eslint-config/perfectionist.mjs'
import { fixupConfigRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import prettierConfig from 'eslint-config-prettier'
import path from 'path'
import tseslint from 'typescript-eslint'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const compat = new FlatCompat({
  baseDirectory: __dirname
})

export default tseslint.config(
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'next.config.mjs',
      'postcss.config.js',
      '.lintstagedrc.js'
    ]
  },
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...perfectionist,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  prettierConfig,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  ...fixupConfigRules(compat.extends('next/core-web-vitals')),
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      '@next/next/no-html-link-for-pages': 0,
      '@next/next/no-img-element': 0,
      'import/no-default-export': 0,
      'import/no-anonymous-default-export': [2, { allowObject: true }],
      'import/order': 0,
      '@typescript-eslint/await-thenable': 0,
      '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
      '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }]
    }
  }
)
