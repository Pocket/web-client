import { initPageAdConfig, getAdDefaults, AD_TYPE_VERTICAL } from './programmatic-ad'
import { verticalSidebarAd } from './ad-sizes'
import { defineAdSlot, loadAd } from './ad-helpers'

let pubadsSpy
let setTargetingSpy
let addEventListenerSpy
let disableInitialLoadSpy
let setRequestNonPersonalizedAdsSpy
let sizeMappingSpy
let refreshSpy
let defineSlotSpy
let displaySpy
let pwRegisterLazyLoadSpy

describe('ProgrammaticAd', () => {
  const cachedGoogletag = global.googletag
  const cachedGptAdSlots = global.gptadslots
  const cachedPwpbjs = global.pwpbjs
  const cachedPwRegisterLazyLoadSpy = global.pwRegisterLazyLoadSpy

  let enableServicesSpy = jest.fn()

  beforeAll(() => {
    setTargetingSpy = jest.fn().mockReturnThis()
    addEventListenerSpy = jest.fn().mockReturnThis()
    disableInitialLoadSpy = jest.fn().mockReturnThis()
    setRequestNonPersonalizedAdsSpy = jest.fn().mockReturnThis()
    pwRegisterLazyLoadSpy = jest.fn()
    refreshSpy = jest.fn()
    displaySpy = jest.fn()

    sizeMappingSpy = () => ({
      addSize: jest.fn(),
      build: jest.fn()
    })

    pubadsSpy = () => ({
      refresh: refreshSpy,
      setTargeting: setTargetingSpy,
      addEventListener: addEventListenerSpy,
      disableInitialLoad: disableInitialLoadSpy,
      setRequestNonPersonalizedAds: setRequestNonPersonalizedAdsSpy
    })

    defineSlotSpy = jest.fn()

    global.googletag = {
      display: displaySpy,
      pubads: pubadsSpy,
      defineSlot: defineSlotSpy,
      sizeMapping: sizeMappingSpy,
      enableServices: enableServicesSpy,
      disableInitialLoad: disableInitialLoadSpy,
      setRequestNonPersonalizedAds: setRequestNonPersonalizedAdsSpy,
      cmd: []
    }
    global.pwpbjs = { que: [] }
    global.pwRegisterLazyLoad = pwRegisterLazyLoadSpy
    global.gptadslots = []
  })

  afterAll(() => {
    global.gptadslots = cachedGptAdSlots
    global.googletag = cachedGoogletag
    global.pwpbjs = cachedPwpbjs
    global.pwRegisterLazyLoad = cachedPwRegisterLazyLoadSpy
  })

  describe('initPageAdConfig', () => {
    it('initializes ad metadata', () => {
      const pageMetadata = {
        urlPath: '/my/excellent/syndicated-article-slug',
        iabTopCategory: 'Arts-and-Entertainment',
        iabSubCategory: 'Music',
        legacyId: '4444',
        nav: '/rock-and-roll',
        etpValue: 'etp-level-1'
      }
      const metaDataCount = Object.keys(pageMetadata).length
      initPageAdConfig(pageMetadata)

      expect(setTargetingSpy).toHaveBeenCalledTimes(metaDataCount)
      expect(enableServicesSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('defineAdSlot', () => {
    it('creates a new ad slot, passing correct params to googletag', () => {
      const adSlotParams = {
        id: 'div-gpt-ad-1234567-1',
        adUnitPath: '/11223344556/LaBulsa',
        defaultAdSize: [[300, 250]],
        positionAlias: 'ROI',
        sizeMap: verticalSidebarAd
      }

      const adSlot = defineAdSlot(adSlotParams)

      expect(global.gptadslots[`'${adSlotParams.id}'`]).toBe(adSlot)
      expect(defineSlotSpy).toHaveBeenCalledWith(
        adSlotParams.adUnitPath,
        adSlotParams.defaultAdSize,
        adSlotParams.id
      )
    })

    describe('getAdDefaults()', () => {
      it('returns correct defaults, given a type', () => {
        const adDefaults = getAdDefaults(AD_TYPE_VERTICAL)

        expect(adDefaults).toStrictEqual({
          defaultAdSize: [[300, 250]],
          sizeMap: verticalSidebarAd
        })
      })
    })
  })

  describe('loadAd', () => {
    describe('loads the ad to gptadslots with correct id', () => {
      let testId = 'div-gpt-ad-1234567-1'

      it('when pubwise is enabled', () => {
        loadAd(testId)
        expect(refreshSpy).toBeCalledWith([global.gptadslots[testId]])
      })
    })
  })
})
