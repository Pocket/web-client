import type { StorybookConfig } from '@storybook/nextjs'
import path from 'node:path'

const rootDirectory = '../../../'
const config: StorybookConfig = {
  stories: [
    path.join(__dirname, rootDirectory, 'ui/**/*.story.@(js|jsx|ts|tsx)')
    // path.join(__dirname, rootDirectory, 'src/**/*.story.@(js|jsx|ts|tsx)')
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  // staticDirs: [path.join(__dirname, rootDirectory, 'public')],
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  core: {
    disableTelemetry: true
  }
  // webpackFinal: async (config: any): Promise<any> => {
  //   const alias = {
  //     mock: path.join(__dirname, rootDirectory, '__mocks__/_data'),
  //     mocks: path.join(__dirname, rootDirectory, '__mocks__'),
  //     media: path.join(__dirname, rootDirectory, 'public/static'),
  //     common: path.join(__dirname, rootDirectory, 'src/common'),
  //     containers: path.join(__dirname, rootDirectory, 'src/containers'),
  //     components: path.join(__dirname, rootDirectory, 'src/components'),
  //     connectors: path.join(__dirname, rootDirectory, 'src/connectors'),
  //     actions$: path.join(__dirname, rootDirectory, 'src/actions.js'),
  //     store$: path.join(__dirname, rootDirectory, 'src/store.js'),
  //     layouts: path.join(__dirname, rootDirectory, 'src/containers/_layouts'),
  //     '@braze/web-sdk': path.join(__dirname, rootDirectory, '__mocks__/braze-sdk.js')
  //   }
  //   config.resolve.alias = { ...config.resolve.alias, ...alias }

  //   return config
  // }
}
export default config
