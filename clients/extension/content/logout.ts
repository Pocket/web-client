import { EXT_ACTIONS } from '../actions'
import { sendMessage } from '../utilities/send-message'

// Check page has loaded and if not add listener for it
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setLogoutLoaded)
} else {
  setLogoutLoaded()
}

function setLogoutLoaded() {
  setTimeout(function () {
    sendMessage({ action: EXT_ACTIONS.LOGGED_OUT_OF_POCKET })
  }, 500)
}
