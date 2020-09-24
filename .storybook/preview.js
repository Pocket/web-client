import '@pocket/web-ui/lib/pocket-web-ui.css'

import React from 'react'
import { Provider } from 'react-redux'
import { initializeStore } from 'store'

const store = initializeStore()

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
}

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <div style={{ margin: '4em' }}>
        <Story />
      </div>
    </Provider>
  )
]
