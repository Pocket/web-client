import '@pocket/web-ui/lib/pocket-web-ui.css'

import React from 'react'
import { Provider } from 'react-redux'
import { initializeStore } from 'store'
import { ColorModePicker } from '@pocket/web-ui'

const store = initializeStore()

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
}

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <ColorModePicker floating />
      <Story />
    </Provider>
  )
]
