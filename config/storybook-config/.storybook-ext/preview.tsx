import '../../../clients/extension/public/styles/global.css'
import '../../../clients/extension/public/styles/fonts.css'

import React from 'react'
import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
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
      defaultValue: 'system',
      toolbar: {
        icon: 'photo',
        // array of plain string values or MenuItem shape
        items: ['system', 'light', 'dark'],
        // Property that specifies if the name of the item will be displayed
        showName: true,
        // Change title based on selected value
        dynamicTitle: true
      }
    }
  },
  decorators: [
    (Story, context) => {
      document.body.classList.remove('colormode-system')
      document.body.classList.remove('colormode-light')
      document.body.classList.remove('colormode-dark')
      document.body.classList.add(`colormode-${context.globals.theme}`)

      return (
        <div
          style={{
            margin: '0px !important',
            width: '400px',
            height: '100%',
            padding: '1rem',
            boxShadow: '0 0 8px rgba(0,0,0,0.8)',
            marginBottom: '30vh'
          }}>
          <Story {...context} />
        </div>
      )
    }
  ]
}

export default preview
