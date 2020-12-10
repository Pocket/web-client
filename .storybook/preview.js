import '@pocket/web-ui/lib/pocket-web-ui.css'
import { withNextRouter } from 'storybook-addon-next-router'

import React from 'react'
import { Provider } from 'react-redux'
import { initializeStore } from 'store'

const store = initializeStore()

export const parameters = {
  backgrounds: { disable: true },
  actions: { argTypesRegex: '^on[A-Z].*' }
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
        <Story />
      </Provider>
    )
  },
  withNextRouter
]
