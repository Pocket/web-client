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
  },
  features: {
    experimentalRSC: true
  }
}
export default config
