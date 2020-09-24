import { create } from '@storybook/theming'

const pocketLogo = require('./img/logo.svg')

export default create({
  base: 'light',

  colorSecondary: '#1CB0A8',

  appBorderRadius: 4,

  // Text colors
  textColor: '#000',

  // Toolbar default and active colors
  barTextColor: 'silver',
  barSelectedColor: '#1CB0A8',

  brandTitle: 'Pocket'
})
