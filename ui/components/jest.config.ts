import nextJest from 'next/jest.js'

import type { Config } from 'jest'

const createJestConfig = nextJest()

// Add any custom config to be passed to Jest
const config: Config = {
  testEnvironmentOptions: {
    customExportConditions: ['']
  },
  testEnvironment: '@config/jest/setup/jsdom-extended.js',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/coverage'],
  setupFilesAfterEnv: ['@config/jest/mocks/matchmedia.js'],
  snapshotResolver: '@config/jest/setup/jest.snapshot-resolver.ui.ts',
  reporters: ['default', 'jest-junit']
}

const esModules = ['query-string', 'decode-uri-component', 'split-on-first', 'filter-obj']

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
const generateConfig = async () => {
  const generated = await createJestConfig(config)()
  return {
    ...generated,
    transformIgnorePatterns: esModules.length
      ? [`<rootDir>/node_modules/.pnpm/(?!${esModules.join('|')})`]
      : []
  }
}
export default generateConfig
