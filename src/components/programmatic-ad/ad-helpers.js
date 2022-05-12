/* global googletag */
import * as Sentry from '@sentry/nextjs'

/**
 *
 * @param slotId(string): Identifier that ties an ad config with the div in which to load it. This is attached to that
 * div as its `id` attribute
 *
 * Tip: To verify an ad attempting to load in browser, filter the network traffic by `gdfp` and reload the tab
 */
export const loadAd = (slotId) => {
  try {
    global.googletag.display(slotId)
    if (typeof global.pubwise !== 'undefined' && global.pubwise.enabled === true) {
      global.pwpbjs.que.push(function () {
        global.pwRegisterLazyLoad(global.gptadslots[slotId], 2, [50, 0, 50, 0], 0, 768, 2)
      })
    } else {
      global.googletag.pubads().refresh([global.gptadslots[slotId]])
    }
  } catch (err) {
    Sentry.withScope((scope) => {
      scope.setTag('third party', 'google ads')
      scope.setExtra('ad error type', 'load ad')
      scope.setFingerprint('Ad Error')
      Sentry.captureMessage(err)
    })
  }
}

export const destroyAllAdSlots = function () {
  googletag.cmd.push(function () {
    googletag.destroySlots()
  })
}
