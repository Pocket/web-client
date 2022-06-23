import '../../../public/static/pocket-web-ui.css' // This is our base styles

import { Provider } from 'react-redux'
import { initializeStore } from 'store'

import i18n from './i18n' // This just needs to be present

const store = initializeStore()

const customViewports = {
  screenTinyHandset: {
    name: 'screenTinyHandset',
    styles: {
      width: '359px',
      height: '100%'
    }
  },
  screenSmallHandset: {
    name: 'screenSmallHandset',
    styles: {
      width: '399px',
      height: '100%'
    }
  },
  screenMediumHandset: {
    name: 'screenMediumHandset',
    styles: {
      width: '479px',
      height: '100%'
    }
  },
  screenLargeHandset: {
    name: 'screenLargeHandset',
    styles: {
      width: '599px',
      height: '100%'
    }
  },
  screenTinyTablet: {
    name: 'screenTinyTablet',
    styles: {
      width: '719px',
      height: '100%'
    }
  },
  screenSmallTablet: {
    name: 'screenSmallTablet',
    styles: {
      width: '839px',
      height: '100%'
    }
  },
  screenMediumTablet: {
    name: 'screenMediumTablet',
    styles: {
      width: '959px',
      height: '100%'
    }
  },
  screenLargeTablet: {
    name: 'screenLargeTablet',
    styles: {
      width: '1023px',
      height: '100%'
    }
  },
  screenSmallDesktop: {
    name: 'screenSmallDesktop',
    styles: {
      width: '1279px',
      height: '100%'
    }
  },
  screenMediumDesktop: {
    name: 'screenMediumDesktop',
    styles: {
      width: '1439px',
      height: '100%'
    }
  }
}

export const parameters = {
  backgrounds: { disable: true },
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: {
    viewports: customViewports
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  options: {
    storySort: (a, b) => {
      if (/^ui-/.test(a[1].id)) return false
      if (/^ui-/.test(b[1].id)) return true
      return a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })
    }
  }
}

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'photo',
      // array of plain string values or MenuItem shape (see below)
      items: ['light', 'dark', 'sepia']
    }
  }
}

export const decorators = [
  (Story, context) => {
    document.body.classList.remove('colormode-light')
    document.body.classList.remove('colormode-dark')
    document.body.classList.remove('colormode-sepia')
    document.body.classList.add(`colormode-${context.globals.theme}`)

    return (
      <Provider store={store}>
        <Story {...context} />
      </Provider>
    )
  }
]
