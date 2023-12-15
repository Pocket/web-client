/** COLOR PALETTE
 ---------------------------------------------------------------------------- */
/**
 * Prefer mapping to semantic names when using but allow these for
 * one off colors over including hex codes directly.
 *
 * These are used to generate CSS variables, linting, and hinting
 * !! These are not for direct use
 */

const greys = {
  grey10: '#1A1A1A',
  grey20: '#333333',
  grey25: '#404040',
  grey30: '#4D4D4D',
  grey35: '#595959',
  grey40: '#666666',
  grey45: '#737373',
  grey55: '#8C8C8C',
  grey65: '#A6A6A6',
  grey80: '#CCCCCC',
  grey85: '#D9D9D9',
  grey95: '#F2F2F2',
  white100: '#FFFFFF'
}

const sepias = {
  sepia10: '#191917',
  sepia20: '#33312E',
  sepia25: '#403E3A',
  sepia40: '#66635C',
  sepia45: '#736F68',
  sepia55: '#8C877E',
  sepia65: '#A6A095',
  sepia80: '#CCC5B8',
  sepia90: '#E5DECF',
  sepia96: '#F5EDDD',
  sepia100: '#FFF7E6',
  cream100: '#FFFCF7'
}

const teals = {
  teal25: '#00403C',
  teal30: '#004D48',
  teal45: '#00736C',
  teal50: '#008078',
  teal60: '#009990',
  teal65: '#00A69C',
  teal70: '#00B2A8',
  teal75: '#00BFB4',
  teal80: '#00CCC0',
  teal85: '#00D9CC',
  teal100: '#E8F7F6'
}

const teal = {
  tealDarker: '#004D48',
  tealDark: '#008078',
  teal: '#009990',
  tealLight: '#95D5D2',
  tealLightest: '#E8f7f6'
}

const coral = {
  coralDarker: '#6C000E',
  coralDark: '#901424',
  coral: '#EF4056',
  coralLight: '#F9BFD1',
  coralLightest: '#FDF2F5'
}

const amber = {
  amberDarker: '#B24000',
  amberDark: '#E55300',
  amber: '#FCB643',
  amberLight: '#FFD25E',
  amberLightest: '#FFFBE3'
}

const mint = {
  mintDarker: '#0B6639',
  mintDark: '#29A668',
  mint: '#00CB77',
  mintLight: '#82ECB7',
  mintLightest: '#C6FFE3'
}

const lapis = {
  lapisDarker: '#00256D',
  lapisDark: '#1649AC',
  lapis: '#3668FF',
  lapisLight: '#95D2FF',
  lapisLightest: '#DCEAFF'
}

const apricot = {
  apricotDarker: '#9F2600',
  apricotDark: '#D23807',
  apricot: '#F67D6D',
  apricotLight: '#FEB69F',
  apricotLightest: '#FDF0EC'
}

const iris = {
  irisDarker: '#802AC3',
  irisDark: '#9971EF',
  iris: '#C4A5F7',
  irisLight: '#DAB5FF',
  irisLightest: '#F2DEFF'
}

const platformBrandColors = {
  // Social
  brandPocket: '#EF4056',
  brandFacebook: '#3B5998',
  brandTwitter: '#00ACED',
  brandReddit: '#FF4500',
  brandLinkedin: '#007BB6',
  brandMastodon: '#563ACC'
}

export const _paletteGroups = [
  {
    title: 'UI Colors',
    description: 'The number value is determined by the brightness value (HSB).',
    colors: [greys, sepias, teals]
  },
  {
    title: 'Pocket Brand Colors',
    description:
      'You will need to check for conrast and create theme maps when using these colors.',
    colors: [teal, coral, amber, mint, lapis, apricot, iris]
  },
  {
    title: 'Platform Brand Colors',
    description:
      'You will need to check for conrast and create theme maps when using these colors.',
    colors: [platformBrandColors]
  }
]

export const _colorPalette = {
  ...greys,
  ...sepias,
  ...teals,
  ...teal,
  ...coral,
  ...amber,
  ...mint,
  ...lapis,
  ...apricot,
  ...iris,
  ...platformBrandColors
}

/** SEMANTIC COLORS & THEMEING
 ---------------------------------------------------------------------------- */
/**
 * These are used to generate CSS variables, linting, and hinting
 * !! These are not for direct use
 */

const canvas = {
  canvas: {
    light: _colorPalette.white100,
    dark: _colorPalette.grey10,
    sepia: _colorPalette.sepia96
  }
}

/** General Colors */
const general = {
  textPrimary: {
    light: _colorPalette.grey10,
    dark: _colorPalette.grey95,
    sepia: _colorPalette.sepia10
  },
  textSecondary: {
    light: _colorPalette.grey40,
    dark: _colorPalette.grey55,
    sepia: _colorPalette.sepia40
  },
  textTertiary: {
    light: _colorPalette.grey55,
    dark: _colorPalette.grey45,
    sepia: _colorPalette.sepia55
  },
  textLinkHover: {
    // color specifically for text links, in particular so that the dark theme text is readable
    light: _colorPalette.teal50,
    dark: _colorPalette.teal65,
    sepia: _colorPalette.teal45
  },
  textLinkPressed: {
    light: _colorPalette.teal30,
    dark: _colorPalette.teal85,
    sepia: _colorPalette.teal25
  },
  textAccent: {
    // requested by marketing
    light: _colorPalette.lapis,
    dark: _colorPalette.lapisLight,
    sepia: _colorPalette.lapisDark
  }
}

/** Action Colors (general interactive elements - buttons, links, etc) */
const actions = {
  actionPrimary: {
    light: _colorPalette.teal50,
    dark: _colorPalette.teal50,
    sepia: _colorPalette.teal45
  },
  actionPrimaryHover: {
    light: _colorPalette.teal30,
    dark: _colorPalette.teal30,
    sepia: _colorPalette.teal25
  },
  actionPrimarySubdued: {
    light: _colorPalette.teal100,
    sepia: _colorPalette.teal100,
    dark: _colorPalette.teal25
  },
  actionPrimaryText: {
    // (text that overlays the action color)
    light: _colorPalette.white100,
    dark: _colorPalette.white100,
    sepia: _colorPalette.white100
  },
  actionSecondary: {
    light: _colorPalette.grey10,
    dark: _colorPalette.grey95,
    sepia: _colorPalette.sepia10
  },
  actionSecondaryHover: {
    light: _colorPalette.grey10,
    dark: _colorPalette.grey95,
    sepia: _colorPalette.sepia10
  },
  actionSecondaryHoverText: {
    light: _colorPalette.grey95,
    dark: _colorPalette.grey10,
    sepia: _colorPalette.cream100
  },
  actionSecondaryText: {
    // (text that overlays the action color)
    light: _colorPalette.grey10,
    dark: _colorPalette.grey95,
    sepia: _colorPalette.sepia10
  },
  actionBrand: {
    light: _colorPalette.coral,
    dark: _colorPalette.coral,
    sepia: _colorPalette.coral
  },
  actionBrandHover: {
    light: _colorPalette.coralDark,
    dark: _colorPalette.coralDark,
    sepia: _colorPalette.coralDark
  },
  actionBrandSubdued: {
    light: _colorPalette.coralLightest,
    sepia: _colorPalette.coralLightest,
    dark: _colorPalette.coralDarker
  },
  actionBrandText: {
    // (text that overlays the action color)
    light: _colorPalette.white100,
    dark: _colorPalette.white100,
    sepia: _colorPalette.white100
  },
  actionFocus: {
    // focus highlighting for an element with focus
    light: _colorPalette.teal60,
    dark: _colorPalette.teal80,
    sepia: _colorPalette.teal60
  }
}

/** Form Colors */
const forms = {
  formFieldFocusLabel: {
    light: _colorPalette.teal50,
    dark: _colorPalette.teal65,
    sepia: _colorPalette.teal45
  },
  formFieldTextPrimary: {
    light: _colorPalette.grey10,
    dark: _colorPalette.grey95,
    sepia: _colorPalette.sepia10
  },
  formFieldTextSecondary: {
    light: _colorPalette.grey40,
    dark: _colorPalette.grey55,
    sepia: _colorPalette.sepia40
  },
  formFieldBorder: {
    light: _colorPalette.grey55,
    dark: _colorPalette.grey45,
    sepia: _colorPalette.sepia55
  },
  formFieldBorderHover: {
    light: _colorPalette.grey20,
    dark: _colorPalette.grey80,
    sepia: _colorPalette.sepia20
  },
  error: {
    light: _colorPalette.amberDarker,
    dark: _colorPalette.amberDark,
    sepia: _colorPalette.amberDarker
  },
  toggleOff: {
    light: _colorPalette.grey45,
    dark: _colorPalette.grey45,
    sepia: _colorPalette.sepia40
  },
  toggleOffHover: {
    light: _colorPalette.grey25,
    dark: _colorPalette.grey25,
    sepia: _colorPalette.sepia25
  }
}

/** Raised Colors (menus, modals, etc) */
const raised = {
  activeCanvas: {
    light: '#F9F9FB',
    dark: _colorPalette.grey20,
    sepia: '#FFF4DE'
  },
  popoverCanvas: {
    light: _colorPalette.white100,
    dark: _colorPalette.grey20,
    sepia: _colorPalette.sepia96
  },
  popoverBorder: {
    light: _colorPalette.grey85,
    dark: _colorPalette.grey35,
    sepia: _colorPalette.sepia80
  },
  menuItemHover: {
    light: _colorPalette.teal50,
    dark: _colorPalette.teal50,
    sepia: _colorPalette.teal45
  },
  menuItemHoverText: {
    light: _colorPalette.white100,
    dark: _colorPalette.white100,
    sepia: _colorPalette.cream100
  },
  menuItemActive: {
    light: _colorPalette.teal30,
    dark: _colorPalette.teal30,
    sepia: _colorPalette.teal25
  },

  navCurrentTab: {
    light: '#E0F0EF',
    dark: '#274F4C',
    sepia: '#D8DECF'
  },
  navCurrentTabText: {
    light: _colorPalette.teal50,
    dark: _colorPalette.teal80,
    sepia: _colorPalette.teal45
  },

  tooltipCanvas: {
    light: _colorPalette.grey10,
    dark: _colorPalette.grey95,
    sepia: _colorPalette.sepia10
  },
  tooltipText: {
    light: _colorPalette.grey95,
    dark: _colorPalette.grey10,
    sepia: _colorPalette.grey95
  },
  drawerCanvas: {
    light: _colorPalette.white100,
    dark: _colorPalette.grey20,
    sepia: _colorPalette.sepia96
  },
  emptyCanvas: {
    light: '#f3f3f3',
    dark: _colorPalette.grey20,
    sepia: '#E0D9CA'
  }
}

/** Divider Colors */
const dividers = {
  dividerPrimary: {
    light: _colorPalette.grey20,
    dark: _colorPalette.grey80,
    sepia: _colorPalette.sepia20
  },
  dividerSecondary: {
    light: _colorPalette.grey55,
    dark: _colorPalette.grey45,
    sepia: _colorPalette.sepia55
  },
  dividerTertiary: {
    light: _colorPalette.grey85,
    dark: _colorPalette.grey25,
    sepia: _colorPalette.sepia80
  }
}

/** Call Outs */
const callouts = {
  calloutBackgroundPrimary: {
    light: _colorPalette.teal100,
    dark: _colorPalette.teal30,
    sepia: _colorPalette.teal100
  },

  calloutBackgroundSecondary: {
    light: _colorPalette.coralLightest,
    dark: _colorPalette.grey20,
    sepia: _colorPalette.coralLightest
  },

  calloutAccent: {
    light: _colorPalette.grey10,
    dark: _colorPalette.teal80,
    sepia: _colorPalette.grey10
  },

  newsroomBackgroundPrimary: {
    light: '#FFF0E3',
    dark: '#FFF0E3',
    sepia: '#FFF0E3'
  },

  newsroomBackgroundSecondary: {
    light: '#DB6900',
    dark: '#DB6900',
    sepia: '#DB6900'
  },

  newsroomBackgroundText: {
    light: _colorPalette.grey10,
    dark: _colorPalette.grey10,
    sepia: _colorPalette.grey10
  }
}

const checkBoxes = {
  checkboxLabel: {
    light: _colorPalette.grey25,
    dark: _colorPalette.white100,
    sepia: _colorPalette.grey25
  },
  checkboxBorder: {
    light: _colorPalette.grey85,
    dark: _colorPalette.grey55,
    sepia: _colorPalette.grey85
  },
  checkboxBackground: {
    light: _colorPalette.white100,
    dark: _colorPalette.grey10,
    sepia: _colorPalette.sepia96
  },
  checkboxInputBorder: {
    light: _colorPalette.grey85,
    dark: _colorPalette.grey55,
    sepia: _colorPalette.grey55
  },
  checkboxInputBackground: {
    light: _colorPalette.white100,
    dark: _colorPalette.grey10,
    sepia: _colorPalette.sepia96
  },
  checkboxHighlight: {
    light: _colorPalette.teal60,
    dark: _colorPalette.teal60,
    sepia: _colorPalette.teal60
  },
  checkboxLabelSelected: {
    light: _colorPalette.teal50,
    dark: _colorPalette.teal100,
    sepia: _colorPalette.teal50
  },
  checkboxBorderSelected: {
    light: _colorPalette.teal50,
    dark: _colorPalette.teal100,
    sepia: _colorPalette.teal50
  },
  checkboxBackgroundSelected: {
    light: _colorPalette.teal100,
    dark: _colorPalette.teal50,
    sepia: _colorPalette.teal100
  },
  checkboxInputBorderSelected: {
    light: _colorPalette.teal50,
    dark: _colorPalette.white100,
    sepia: _colorPalette.teal50
  },
  checkboxInputBackgroundSelected: {
    light: _colorPalette.teal50,
    dark: _colorPalette.white100,
    sepia: _colorPalette.teal50
  }
}

const pagination = {
  paginationText: {
    light: _colorPalette.teal50,
    dark: _colorPalette.teal80,
    sepia: _colorPalette.teal45
  },
  paginationHover: {
    light: _colorPalette.grey95,
    dark: _colorPalette.grey25,
    sepia: _colorPalette.sepia90
  },
  paginationHoverText: {
    light: _colorPalette.teal50,
    dark: _colorPalette.teal80,
    sepia: _colorPalette.teal45
  },
  paginationActive: {
    light: _colorPalette.teal100,
    dark: _colorPalette.grey20,
    sepia: _colorPalette.sepia80
  },
  paginationActiveText: {
    light: _colorPalette.teal50,
    dark: _colorPalette.grey95,
    sepia: _colorPalette.sepia10
  }
}

/** Used in building color variables */
export const _colorModes = {
  ...canvas,
  ...general,
  ...actions,
  ...forms,
  ...raised,
  ...dividers,
  ...callouts,
  ...checkBoxes,
  ...pagination
}

/** Used for stories */
export const _themeGroups = {
  canvas,
  general,
  actions,
  forms,
  raised,
  dividers,
  callouts,
  checkBoxes
}
