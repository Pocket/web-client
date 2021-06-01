import '@pocket/web-ui/lib/pocket-web-ui.css'
import { withNextRouter } from 'storybook-addon-next-router'

import React from 'react'
import { Provider } from 'react-redux'
import { initializeStore } from 'store'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'

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
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })
  },
  viewport: {
    viewports: customViewports,
    defaultViewport: 'responsive'
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
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <Story />
        </Provider>
      </I18nextProvider>
    )
  },
  withNextRouter
]
