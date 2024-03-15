import i18n from './i18n' // This just needs to be present
import '../../../public/static/pocket-web-ui.css' // This is our base styles
import { I18nextProvider } from 'react-i18next'

import React, { Suspense } from 'react'
import type { Preview } from '@storybook/react'

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

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: customViewports
    },
    options: {
      enableShortcuts: true,
      storySort: {
        order: ['UI', 'Item']
      }
    }
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'photo',
        // array of plain string values or MenuItem shape
        items: ['light', 'dark', 'sepia'],
        // Property that specifies if the name of the item will be displayed
        showName: true,
        // Change title based on selected value
        dynamicTitle: true
      }
    }
  },
  decorators: [
    (Story, context) => {
      document.body.classList.remove('colormode-light')
      document.body.classList.remove('colormode-dark')
      document.body.classList.remove('colormode-sepia')
      document.body.classList.add(`colormode-${context.globals.theme}`)

      return (
        <Suspense fallback={<div>loading translations...</div>}>
          <I18nextProvider i18n={i18n}>
            <Story {...context} />
          </I18nextProvider>
        </Suspense>
      )
    }
  ]
}

export default preview
