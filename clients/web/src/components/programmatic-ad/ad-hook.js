/* global googletag, pwpbjs, pubwiseLazyLoad */
import { useEffect, useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { once } from 'common/utilities/once/once'
import { REFRESH_KEY } from './ad-constants'
import { REFRESH_VALUE } from './ad-constants'

/**
 * Ad page setup — This hook will allow us to load ad info for the page once and
 * return a ready state to the page.  That ready state can be used to display/refresh the ad
 * slots we have defined on the page. This helps us avoid all sorts of promise checking
 * and race conditions for loading page info.
 *
 * @param urlPath(string): relative path of the page url
 * @param iabCategory(string): the IAB top category of the article
 * @param iabSubCategory(string): the IAB sub category of the article
 * @param syndicatedArticleId(number): the legacy syndicated article id
 */
export const useAdsOnPage = ({
  allowAds,
  isDev = false,
  showLog = false,
  urlPath,
  iabTopCategory,
  iabSubCategory,
  originalItemId: syndicatedArticleId
}) => {
  const router = useRouter()
  const [adsReady, setAdsReady] = useState(false)
  const initalizeAds = useCallback(() => {
    if (showLog) {
      console.info('Initializing page settings for google ads on article:', {
        syndicatedArticleId,
        iabTopCategory,
        iabSubCategory
      })
    }

    googletag
      .pubads()
      .setTargeting('URL', [`${urlPath}`])
      .setTargeting('Category', `${iabTopCategory}`)
      .setTargeting('SubCategory', `${iabSubCategory}`)
      .setTargeting('ArticleID', [`${syndicatedArticleId}`])

    if (isDev) googletag.pubads().setTargeting('Environment', 'staging')
    googletag.pubads().addEventListener('impressionViewable', refreshFunction)
    googletag.enableServices()

    // Let the rest of the app know we are ready to refresh the ads
    setAdsReady(true)
  }, [isDev, urlPath, iabTopCategory, iabSubCategory, syndicatedArticleId, showLog])

  // When this first loads we want to do a check for the API by adding a command to the queue
  useEffect(() => {
    if (allowAds) googletag.cmd.push(initalizeAds)
  }, [initalizeAds, allowAds])

  // When we change routes, we need to destroy the existing slots in order to define new slots
  // and show those ads
  useEffect(() => {
    router.events.on('routeChangeComplete', destroyAllAdSlots)
    return () => {
      router.events.off('routeChangeComplete', destroyAllAdSlots)
    }
  }, [router.events])

  return adsReady
}

// adds a listener for ad slots that have a refresh attribute on them,
// so they don't fire a refresh until having been viewable on the page
// for at least N number of seconds
const refreshFunction = once((event) => {
  // Number of seconds to wait after the slot becomes viewable.
  const SECONDS_TO_WAIT_AFTER_VIEWABILITY = 8

  const slot = event.slot
  if (slot.getTargeting(REFRESH_KEY).indexOf(REFRESH_VALUE) > -1) {
    setTimeout(function () {
      pwpbjs.que.push(function () {
        pubwiseLazyLoad([slot], false)
      })
    }, SECONDS_TO_WAIT_AFTER_VIEWABILITY * 1000)
  }
})

const destroyAllAdSlots = function () {
  googletag.cmd.push(function () {
    googletag.destroySlots()
  })
}
