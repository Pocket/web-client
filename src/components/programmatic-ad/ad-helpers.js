/* global googletag */
import * as Sentry from '@sentry/nextjs'

export const POCKET_AD_UNIT_PATH = '/21741047832/Pocket'
export const REFRESH_KEY = 'refresh'
export const REFRESH_VALUE = 'true'
/**
 *
 * @param sizes(array): Array holding configuration of what ad sizes to use ad different browser sizes
 * @returns {object} a size mapping instance, to be used with the googletag library
 */
export const createSizeMapping = (sizes) => {
  try {
    const mapping = googletag.sizeMapping()

    sizes.forEach(({ browserSize, adSizes }) => mapping.addSize(browserSize, adSizes))

    return mapping.build()
  } catch (err) {
    Sentry.withScope((scope) => {
      scope.setTag('third party', 'google ads')
      scope.setExtra('ad error type', 'size mapping')
      scope.setFingerprint('Ad Error')
      Sentry.captureMessage(err)
    })
  }
}

/**
 *
 * @param id(string): Identifier used to map an ad config to a div on the page
 * @param adUnitPath(string): Path to ad unit on programmatic team backend
 * @param defaultAdSize(string|array): The default size(s) for the ad slots. mostly a fallback for `mapping` below
 * @param position(string): Metadata describing where the ad is on the page. used in measuring by programmatic team
 * @param mapping(object): Mapping of browser sizes to ad sizes. Found in /programmatic-ad/ad-sizes
 * @returns {object} A defined ad slot instance, to be used with googletag library
 *
 * `gptadslots` is defined globally when the third party ad code is loaded via  <LoadAdLibraries /> in ./load-third-party-scripts.js
 */
export const defineAdSlot = ({
  id,
  adUnitPath,
  defaultAdSize,
  positionAlias,
  sizeMap = {},
  refreshRate
}) => {
  try {
    const sizeMapping = createSizeMapping(sizeMap)

    if (refreshRate) {
      global.gptadslots[id] = global.googletag
        .defineSlot(adUnitPath, defaultAdSize, id)
        ?.setTargeting('POS', [positionAlias])
        ?.setTargeting(REFRESH_KEY, REFRESH_VALUE)
        .defineSizeMapping(sizeMapping)
        .addService(global.googletag.pubads())

      return
    }

    global.gptadslots[id] = global.googletag
      .defineSlot(adUnitPath, defaultAdSize, id)
      ?.setTargeting('POS', [positionAlias])
      .defineSizeMapping(sizeMapping)
      .addService(global.googletag.pubads())
  } catch (err) {
    Sentry.withScope((scope) => {
      scope.setTag('third party', 'google ads')
      scope.setExtra('ad error type', 'define ad slot')
      scope.setFingerprint('Ad Error')
      Sentry.captureMessage(err)
    })
  }
}

/**
 * @type {Promise} creates a new promise that resolves once the googletag library is loaded
 */
export const gtagPromise = () => {
  try {
    const DEFAULT_GOOGLETAG = { cmd: [] }

    global.gptadslots = global.gptadslots || []
    global.googletag = global.googletag || DEFAULT_GOOGLETAG

    return new Promise((resolve) => {
      googletag.cmd.push(resolve)
    })
  } catch (err) {
    Sentry.withScope((scope) => {
      scope.setTag('third party', 'google ads')
      scope.setExtra('ad error type', 'gtag promise')
      scope.setFingerprint('Ad Error')
      Sentry.captureMessage(err)
    })
  }
}

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
