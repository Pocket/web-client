// type-check

import { fixupConfigRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import prettierConfig from 'eslint-config-prettier'
import path from 'path'
import tseslint from 'typescript-eslint'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
  // ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  prettierConfig,

  // ...fixupConfigRules(compat.extends('next/typescript')),

  ...fixupConfigRules(compat.extends('next/core-web-vitals')),
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      '@next/next/no-img-element': 0,
      'import/no-default-export': 0,
      'import/no-anonymous-default-export': [2, { allowObject: true }],
      'import/order': 0,
      '@typescript-eslint/await-thenable': 0,
      '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
      '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
      // Legacy rules for legacy code
      '@typescript-eslint/prefer-optional-chain': 0,
      '@typescript-eslint/prefer-nullish-coalescing': 0,
      '@typescript-eslint/prefer-for-of': 0,
      '@typescript-eslint/dot-notation': 0,
      '@typescript-eslint/prefer-regexp-exec': 0,
      '@typescript-eslint/no-unsafe-assignment': 0
    }
  }
)
