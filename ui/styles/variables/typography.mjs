// root font sizes are percent values to honor a user's browser setting if applicable

// font sizes use 'rems' to provide consistent font sizes that will scale with the
// root font size (browser font size setting), but won't be affected by inherited
// font size assignments (e.g. 'em' sizing)
export const typography = {
  fontSerif: '"Blanco OSF", Garamond, Times, Serif',
  fontSerifAlt: '"Doyle", Garamond, Times, Serif',
  fontSansSerif: '"Graphik Web", "Helvetica Neue", Helvetica, Arial, Sans-Serif',
  fontSizeRootSmall: '80%', // root size at small breakpoint
  fontSizeRootMedium: '87.5%', // root size at medium breakpoint
  fontSizeRoot: '100%', // root size value (browser default is 16px)
  fontSize065: '0.625rem', // 16px * 0.625 = 10px
  fontSize075: '0.75rem', // 16px * 0.75 = 12px
  fontSize085: '0.875rem', // 16px * 0.875 = 14px
  fontSize100: '1rem', // 16px * 1 = 16px
  fontSize125: '1.1875rem', // 16px * 1.1875 = 19px
  fontSize150: '1.4375rem', // 16px * 1.4375 = 23px
  fontSize175: '1.75rem', // 16px * 1.75 = 28px
  fontSize200: '2.0625rem', // 16px * 2.0625 = 33px
  fontSize250: '2.5rem', // 16px * 2.5 = 40px
  fontSize300: '3rem' // 16px * 2.5 = 48px
}
