/* global googletag, gptadslots */
import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'next-i18next'
import { css, cx } from '@emotion/css'
import { REFRESH_KEY } from './ad-constants'
import { REFRESH_VALUE } from './ad-constants'
import { AD_SIZES } from './ad-constants'

const programmaticAdWrapperStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  .label {
    font-family: var(--fontSansSerif);
    font-size: 0.85rem;
    line-height: 100%;
    color: var(--color-textTertiary);
    text-align: center;
    margin: 0;
    padding-bottom: 0.5rem;
    width: 100%;
  }
`

/**
 * Ad Slot - Used for defining an ad slot and the markup to go with it when api is available
 * @param adsReady(bool): this lets us know the page targeting and pubwise stuff has been setup
 * @param id(string): Identifier used to map an ad config to a div on the page
 * @param type(string): Type of ad to render (used in size mapping)
 * @param position(string): Metadata describing where the ad is on the page. used in measuring by programmatic team
 * @param mapping(object): Mapping of browser sizes to ad sizes. Found in /programmatic-ad/ad-sizes
 * @returns
 */
export const AdSlot = (props) => {
  const { t } = useTranslation()
  const { adsReady, id, type, positionAlias, adUnitPath, refreshRate, instanceStyles } = props //prettier-ignore
  const adClassName = cx(programmaticAdWrapperStyles, 'syndication-ad', instanceStyles)
  const [googleTagsReady, setGoogleTagsReady] = useState(false)
  const [adLoaded, setAdLoaded] = useState(false)
  const adLabel = t('ad:label', 'Advertisement')

  // We set this up as a callback so we can safely call it inside a useEffect
  const setupAdSlot = useCallback(() => {
    defineAdSlot({ id, type, positionAlias, adUnitPath, adLabel, refreshRate })
  }, [id, type, positionAlias, adUnitPath, adLabel, refreshRate])

  // When this first loads we want to do a check for the API by adding a command to the queue
  useEffect(() => {
    googletag.cmd.push(() => setGoogleTagsReady(true))
  }, [])

  useEffect(() => {
    // We want to make sure the googleTags API is ready
    if (!googleTagsReady) return () => {}

    // console.info(`Defining ad slot —  ${id}`)
    setupAdSlot()
  }, [googleTagsReady, setupAdSlot])

  useEffect(() => {
    if (!adsReady || adLoaded) return () => {}
    setAdLoaded(true)
    loadAd(id)
    // console.info(`Loading ad for slot — ${id}`)
  }, [adsReady, adLoaded, id])

  return (
    <div className={adClassName}>
      {adLoaded ? <p className="label">{adLabel}</p> : null}
      <div id={id} data-refreshrate={refreshRate} />
    </div>
  )
}

const isDevBuild = process.env.SHOW_DEV === 'included'

// Define Ad Slot with Google API
const defineAdSlot = (params) => {
  const { id, type, adUnitPath, positionAlias, refreshRate } = params

  try {
    // Create size mapping for this ad
    const adSize = AD_SIZES[type] || {}
    const { defaultAdSize, sizeMap } = adSize
    const sizeMapping = createSizeMapping(sizeMap)

    //Sizes are importante
    if (!defaultAdSize || !sizeMap) throw new Error('Unspecified ad size')

    // Define ad slot
    gptadslots[id] = googletag
      .defineSlot(adUnitPath, defaultAdSize, id)
      .setTargeting('POS', [positionAlias])
      .defineSizeMapping(sizeMapping)

    // Make the service refreshable if a refresh rate is set
    if (refreshRate) gptadslots[id].setTargeting(REFRESH_KEY, REFRESH_VALUE)

    // Add pubAds service
    gptadslots[id].addService(googletag.pubads())
  } catch (err) {
    if (isDevBuild) console.warn('third party', 'google ads', 'define ad slot', err)
  }
}

// Create size mapping — A convenince function to create size options for the ad
const createSizeMapping = (sizes) => {
  try {
    const mapping = googletag.sizeMapping()
    sizes.forEach(({ browserSize, adSizes }) => mapping.addSize(browserSize, adSizes))
    return mapping.build()
  } catch (err) {
    if (isDevBuild) console.warn('third party', 'google ads', 'size mapping', err)
  }
}

// Load ad in specified slot
const loadAd = (slotId) => {
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
    if (isDevBuild) console.warn('third party', 'google ads', 'load ad', err)
  }
}
