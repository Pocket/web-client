import nextJest from 'next/jest.js'

import type { Config } from 'jest'

const createJestConfig = nextJest()

// Add any custom config to be passed to Jest
const config: Config = {
  testEnvironmentOptions: {
    customExportConditions: ['']
  },
  moduleNameMapper: {
    '^mock(.*)$': '<rootDir>/__mocks__/_data$1',
    '^mock/article': '<rootDir>/__mocks__/_data/article/index.js',
    '^static(.*)$': '<rootDir>/public/static$1',
    '^common(.*)$': '<rootDir>/src/common$1',
    '^containers(.*)$': '<rootDir>/src/containers$1',
    '^components(.*)$': '<rootDir>/src/components$1',
    '^connectors(.*)$': '<rootDir>/src/connectors$1',
    '^layouts(.*)$': '<rootDir>/src/containers/_layouts$1',
    '^pages(.*)$': '<rootDir>/src/pages$1',
    '^actions': '<rootDir>/src/actions.js',
    '^store': '<rootDir>/src/store.js',
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '@config/jest/mocks/file-mock.js',
    '\\.(css|less)$': '@config/jest/mocks/file-mock.js'
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/coverage'],
  setupFilesAfterEnv: ['@config/jest/mocks/matchmedia.js'],
  testEnvironment: 'jsdom',
  snapshotResolver: '@config/jest/setup/jest.snapshot-resolver.ts'
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
