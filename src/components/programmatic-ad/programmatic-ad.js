/* eslint-disable */

/** Using this component on a page requires that you also load ./load-third-party-scripts.js on the same page. This
 * loads the 3rd party ad libraries required.
 */
import React, { useState, useEffect } from 'react'
import { css, cx } from 'linaria'
import PropTypes from 'prop-types'

import { horizontalLargeAd } from './ad-sizes'
import { horizontalMediumAd } from './ad-sizes'
import { horizontalSmallAd } from './ad-sizes'
import { verticalSidebarAd } from './ad-sizes'

import { POCKET_AD_UNIT_PATH } from './ad-helpers'
import { REFRESH_KEY } from './ad-helpers'
import { REFRESH_VALUE } from './ad-helpers'
import { gtagPromise } from './ad-helpers'
import { defineAdSlot } from './ad-helpers'
import { loadAd } from './ad-helpers'
import { createSizeMapping } from './ad-helpers'

import loadAdLibraries from './load-third-party-scripts'
import { getEtpValue } from 'common/utilities/third-party/etp-checker'
import { fontSansSerif, fontSize085, spacing050 } from '@pocket/web-ui'
import { once } from 'common/utilities/once/once'

export const AD_TYPE_VERTICAL = 'vertical'
export const AD_TYPE_HORIZONTAL_LG = 'horizontal-large'
export const AD_TYPE_HORIZONTAL_M = 'horizontal-medium'

/**
 *
 * @param urlPath(string): relative path of the page url
 * @param iabCategory(string): the IAB top category of the article
 * @param iabSubCategory(string): the IAB sub category of the article
 * @param syndicatedArticleId(number): the legacy syndicated article id
 * @param nav(string): currently a placeholder, will eventually hold a piece of the url if the url pattern ever looks like /[NAV]/[ARTICLE SLUG]
 * @param etpValue(string; not-in-study|etp-level-1|etp-level-2): used for privacy level experiments
 */
export const initPageAdConfig = ({
  urlPath,
  iabTopCategory,
  iabSubCategory,
  legacyId: syndicatedArticleId,
  nav,
  etpValue
}) => {
  // values here have character length max of 20 for keys, 40 for values
  global.googletag
    .pubads()
    .setTargeting('URL', [`${urlPath}`])
    .setTargeting('Category', `${iabTopCategory}`)
    .setTargeting('SubCategory', `${iabSubCategory}`)
    .setTargeting('ArticleID', [`${syndicatedArticleId}`])
    .setTargeting('Nav', [])
    .setTargeting('ETPType', [`${etpValue}`])

  // Number of seconds to wait after the slot becomes viewable.
  const SECONDS_TO_WAIT_AFTER_VIEWABILITY = 8

  // adds a listener for ad slots that have a refresh attribute on them,
  // so they don't fire a refresh until having been viewable on the page
  // for at least N number of seconds
  const refreshFunction = once((event) => {
    let slot = event.slot
    if (slot.getTargeting(REFRESH_KEY).indexOf(REFRESH_VALUE) > -1) {
      setTimeout(function () {
        pwpbjs.que.push(function () {
          pubwiseLazyLoad([slot], false)
        })
      }, SECONDS_TO_WAIT_AFTER_VIEWABILITY * 1000)
    }
  })

  global.googletag.pubads().addEventListener('impressionViewable', refreshFunction)

  global.googletag.enableServices()
}

export const getAdDefaults = (type) => {
  switch (type) {
    case AD_TYPE_VERTICAL:
      return {
        defaultAdSize: [[300, 250]],
        sizeMap: verticalSidebarAd
      }
    case AD_TYPE_HORIZONTAL_LG:
      return {
        defaultAdSize: [[300, 250]],
        sizeMap: horizontalLargeAd
      }
    case AD_TYPE_HORIZONTAL_M:
      return {
        defaultAdSize: [[728, 90]],
        sizeMap: horizontalMediumAd
      }
  }
}

const initAdMetadata = (targetingMetadata) => {
  const maxWaitTilAdsLoad = 4 * 1000 // 4 seconds

  // load third-party ad scripts
  loadAdLibraries()

  return Promise.all([getEtpValue(maxWaitTilAdsLoad), gtagPromise()]).then(([etpValue]) => {
    initPageAdConfig({
      ...targetingMetadata,
      etpValue
    })
  })
}

const initAdMetadataOnce = once(initAdMetadata)

const programmaticAdWrapperStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  .label {
    font-family: ${fontSansSerif};
    font-size: ${fontSize085};
    line-height: 100%;
    color: var(--color-textTertiary);
    text-align: center;
    margin: 0;
    padding-bottom: ${spacing050};
    width: 100%;
  }
`

const ProgrammaticAd = ({
  id,
  type,
  positionAlias,
  adUnitPath,
  adTargetingMetadata,
  usePersonalized,
  showAd,
  adLabel,
  instanceStyles,
  refreshRate
}) => {
  if (!showAd) return null

  const [isLoaded, setLoaded] = useState(false)

  useEffect(() => {
    // register this adslot with googletag
    gtagPromise().then(() => {
      defineAdSlot({
        ...getAdDefaults(type),
        id,
        positionAlias,
        adUnitPath,
        refreshRate
      })
    })

    // attempt to init ad code here if it hasn't run already
    initAdMetadataOnce({
      ...adTargetingMetadata,
      usePersonalized,
      urlPath: window?.location?.pathname
    })
      .then(() => {
        global.googletag.pubads()
        setLoaded(true)
        loadAd(id)
      })
      .catch(() => console.log('ads were unable to load')) // TODO: candidate for Sentry reporting
  }, [])

  return showAd && isLoaded ? (
    <React.Fragment>
      {/*'syndication-ad' here helps ad team target an ad's label and hide if the ad is an in-house ad*/}
      <div className={cx(programmaticAdWrapperStyles, 'syndication-ad', instanceStyles)}>
        <p className="label">{adLabel}</p>
        <div id={id} data-refreshrate={refreshRate} />
      </div>
    </React.Fragment>
  ) : null
}

ProgrammaticAd.propTypes = {
  /**
   * The ID attached to the div where the ad will be loaded. Also referenced in its respective config
   */
  id: PropTypes.string.isRequired,
  /**
   * A string describing which ad sizes to map to this ad slot
   */
  type: PropTypes.oneOf([AD_TYPE_VERTICAL, AD_TYPE_HORIZONTAL_M, AD_TYPE_HORIZONTAL_LG]).isRequired,
  /**
   * A name given to the ad, able to be tracked by the programmatic team for their forecasting and analytics
   */
  positionAlias: PropTypes.string,
  /**
   * A string full path of the ad unit with the network code and unit code
   */
  adUnitPath: PropTypes.string,
  /**
   * A string to be used for the ad label
   */
  adLabel: PropTypes.string,
  /**
   * A Linaria css`` ruleset to be used as additional styling for the ad instance
   */
  instanceStyles: PropTypes.string,
  /**
   * Refresh rate of an ad slot in seconds. If provided, this ad is
   * permitted to refresh at the given interval
   */
  refreshRate: PropTypes.number
}

ProgrammaticAd.defaultProps = {
  positionAlias: 'NO-POSITION-GIVEN',
  adUnitPath: POCKET_AD_UNIT_PATH,
  adLabel: 'Advertisement',
  instanceStyles: null,
  refreshRate: null
}

export default ProgrammaticAd
