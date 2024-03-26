import path from 'node:path'

const resolverConfig = {
  // resolves from test to snapshot path
  resolveSnapshotPath: (testPath: string, snapshotExtension: string) => {
    const parentFolder = path.basename(path.dirname(testPath))
    const total = path.resolve('__snapshots__', parentFolder)
    return `${total}.ts${snapshotExtension}`
  },

  // resolves from snapshot to test path
  resolveTestPath: (snapshotFilePath: string) => {
    const componentName = path.parse(snapshotFilePath).name.replace('.ts', '')
    const total = path.resolve(componentName, 'component.test.tsx')
    return total
  },
  // Example test path, used for preflight consistency check of the implementation above
  testPathForConsistencyCheck: path.resolve('some-example/component.test.tsx')
}

export default resolverConfig
