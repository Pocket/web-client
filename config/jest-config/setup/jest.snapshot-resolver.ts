const resolverConfig = {
  // resolves from test to snapshot path
  resolveSnapshotPath: (testPath: string, snapshotExtension: string) => {
    return testPath + snapshotExtension
  },

  // resolves from snapshot to test path
  resolveTestPath: (snapshotFilePath: string, snapshotExtension: string) => {
    return snapshotFilePath.slice(0, -snapshotExtension.length)
  },
  // Example test path, used for preflight consistency check of the implementation above
  testPathForConsistencyCheck: 'some/example.spec.js'
}

export default resolverConfig
