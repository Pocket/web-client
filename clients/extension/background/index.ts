import { EXT_ACTIONS } from '../actions'
import { setDefaultIcon, setToolbarIcon } from './interface'

import type { ExtPreviewItem } from '@common/types'

/* Initial Setup
–––––––––––––––––––––––––––––––––––––––––––––––––– */
chrome.runtime.onInstalled.addListener(function () {
  // Use SVG icons over the png for more control
  void setDefaultIcon()

  // handle.setContextMenus()
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
chrome.runtime.onMessage.addListener(messageHandler)

async function messageHandler(message: {
  action: EXT_ACTIONS
  item?: ExtPreviewItem
  error?: string
}) {
  const { action = 'Unknown Action' } = message || {}

  switch (action) {
    case EXT_ACTIONS.EXTENSION_ACTIVATED: {
      const activeTab = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
      const activeTabId = activeTab[0].id

      if (activeTabId) await setToolbarIcon(activeTabId, true)
      return true
    }

    default: {
      // Important! Return true to indicate you want to send a response asynchronously
      return true
    }
  }
}
