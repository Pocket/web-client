/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  resolver: '<rootDir>/.test-setup/custom-resolver.js',

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
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
    '^test-utils': '<rootDir>/.test-setup/test-utils',
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/file-mock.js',
    '\\.(css|less)$': 'rootDir>/__mocks__/file-mock.js'
  },

  // Use this configuration option to add custom reporters to Jest
  reporters: ['default', 'jest-junit'],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['<rootDir>/.test-setup/custom-mocks'],

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ['/node_modules/', '/cypress/'],

  // Use babel-jest to transpile tests with the next/babel preset
  transform: {
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
  },

  //Where do we put snapshot files
  snapshotResolver: '<rootDir>/.test-setup/snapshot-resolver.js'
}
