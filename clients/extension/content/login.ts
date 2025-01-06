import { EXT_ACTIONS } from '../actions'
import { sendMessage } from '../utilities/send-message'

import type { ExtCookieAuth, ExtAuth } from '../types'

// Check page has loaded and if not add listener for it
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setLoginLoaded)
} else {
  setLoginLoaded()
}

function setLoginLoaded() {
  try {
    const siteCookies = getCookies(document.cookie)

    console.log(siteCookies)
    if (!siteCookies.sess_user_id || !siteCookies.sess_exttok) {
      console.groupCollapsed('Auth Error')
      console.log({
        userId: siteCookies.sess_user_id,
        token: siteCookies.sess_exttok
      })
      console.groupEnd()
    }

    const auth: ExtAuth = {
      userId: siteCookies.sess_user_id,
      token: siteCookies.sess_exttok
    }

    // This time out is for user experience so they don't get a flash of
    // a page with no context, since we close this page after getting this data
    setTimeout(function () {
      sendMessage({ action: EXT_ACTIONS.AUTH_CODE_RECEIVED, auth })
    }, 1500)
  } catch (err) {
    console.log('Unexpected login error', err)
  }
}

/* UTILITIES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function getCookies(cookieString: string): ExtCookieAuth {
  if (!cookieString || cookieString === '') return {}
  return cookieString
    .split(';')
    .map((x) => x.trim().split(/(=)/))
    .reduce(
      (cookiesObject, currentArray) => ({
        ...cookiesObject,
        [currentArray[0]]: decodeURIComponent(currentArray[2])
      }),
      {}
    )
}
