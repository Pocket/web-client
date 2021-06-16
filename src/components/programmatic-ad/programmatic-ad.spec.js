import React from 'react'
import assert from 'assert'
import sinon from 'sinon'
import { initPageAdConfig, getAdDefaults, AD_TYPE_VERTICAL } from './programmatic-ad'
import { verticalSidebarAd } from './ad-sizes'
import { defineAdSlot, loadAd, createSizeMapping } from './ad-helpers'
import * as adHelpers from './ad-helpers'

describe('ProgrammaticAd', () => {
  describe('initPageAdConfig', () => {
    let setTargetingSpy = sinon.stub().returnsThis()
    let addEventListenerSpy = sinon.stub().returnsThis()
    let disableInitialLoadSpy = sinon.stub().returnsThis()
    let setRequestNonPersonalizedAdsSpy = sinon.stub().returnsThis()

    let pubadsSpy = sinon.fake.returns({
      setTargeting: setTargetingSpy, // allows for chaining
      addEventListener: addEventListenerSpy, // allows for chaining
      disableInitialLoad: disableInitialLoadSpy, // allows for chaining
      setRequestNonPersonalizedAds: setRequestNonPersonalizedAdsSpy // allows for chaining
    })
    let enableServicesSpy = sinon.spy()
    // let fetchBidsSpy = sinon.spy()

    const cachedGoogletag = global.googletag
    // const cachedApstag = global.apstag

    beforeEach(() => {
      global.googletag = {
        pubads: pubadsSpy,
        enableServices: enableServicesSpy,
        disableInitialLoad: disableInitialLoadSpy,
        setRequestNonPersonalizedAds: setRequestNonPersonalizedAdsSpy,
        cmd: []
      }
      // global.apstag = {
      //   fetchBids: fetchBidsSpy
      // }
    })
    afterAll(() => {
      global.googletag = cachedGoogletag
      // global.apstag = cachedApstag
    })
    it('initializes ad metadata', () => {
      const pageMetadata = {
        urlPath: '/my/excellent/syndicated-article-slug',
        iabTopCategory: 'Arts-and-Entertainment',
        iabSubCategory: 'Music',
        legacyId: '4444',
        nav: '/rock-and-roll',
        etpValue: 'etp-level-1'
      }
      initPageAdConfig(pageMetadata)

      assert(pubadsSpy.callCount === 4)
      assert(setTargetingSpy.callCount === Object.keys(pageMetadata).length)
      assert(enableServicesSpy.calledOnce)
      assert(disableInitialLoadSpy.calledOnce)
      assert(setRequestNonPersonalizedAdsSpy.calledOnce)
      // assert(fetchBidsSpy.calledOnce)
    })
  })
  describe('defineAdSlot', () => {
    let addServiceSpy = sinon.spy()
    let defineSlotSpy = sinon.fake.returns({
      setTargeting: sinon.fake.returns({
        defineSizeMapping: sinon.fake.returns({
          addService: addServiceSpy
        })
      })
    })
    let sizeMappingSpy = sinon.fake.returns({
      addSize: () => {},
      build: () => {}
    })

    const cachedGoogletag = global.googletag
    const cachedGptAdSlots = global.gptadslots

    beforeEach(() => {
      global.googletag = {
        defineSlot: defineSlotSpy,
        sizeMapping: sizeMappingSpy,
        pubads: () => {}
      }
      global.gptadslots = []
    })
    afterAll(() => {
      global.googletag = cachedGoogletag
      global.gptadslots = cachedGptAdSlots
    })
    it('creates a new ad slot, passing correct params to googletag', () => {
      const adSlotParams = {
        id: 'div-gpt-ad-1234567-1',
        adUnitPath: '/11223344556/LaBulsa',
        defaultAdSize: [[300, 250]],
        positionAlias: 'ROI',
        sizeMap: verticalSidebarAd
      }

      const adSlot = defineAdSlot(adSlotParams)

      assert.equal(global.gptadslots[`'${adSlotParams.id}'`], adSlot)
      assert(
        defineSlotSpy.calledWith(
          adSlotParams.adUnitPath,
          adSlotParams.defaultAdSize,
          adSlotParams.id
        )
      )
      assert(defineSlotSpy().setTargeting.calledWith('POS', [adSlotParams.positionAlias]))
      assert(addServiceSpy.calledOnce)
    })

    describe('getAdDefaults()', () => {
      it('returns correct defaults, given a type', () => {
        const adDefaults = getAdDefaults(AD_TYPE_VERTICAL)

        assert.deepEqual(adDefaults, {
          defaultAdSize: [[300, 250]],
          sizeMap: verticalSidebarAd
        })
      })
    })
  })
  describe('loadAd', () => {
    let displaySpy = sinon.spy()
    let refreshSpy = sinon.spy()
    let pubAdsSpy = sinon.fake.returns({
      refresh: refreshSpy
    })
    let pwRegisterLazyLoadSpy = sinon.spy()

    const cachedGoogletag = global.googletag
    const cachedGptAdSlots = global.gptadslots
    const cachedPwpbjs = global.pwpbjs
    const cachedPwRegisterLazyLoadSpy = global.pwRegisterLazyLoadSpy

    beforeEach(() => {
      global.googletag = {
        display: displaySpy,
        pubads: pubAdsSpy
      }
      global.gptadslots = []
      global.pwpbjs = {
        que: []
      }
      global.pwRegisterLazyLoad = pwRegisterLazyLoadSpy
    })
    afterAll(() => {
      global.googletag = cachedGoogletag
      global.gptadslots = cachedGptAdSlots
      global.pwpbjs = cachedPwpbjs
      global.pwRegisterLazyLoad = cachedPwRegisterLazyLoadSpy
    })
    describe('loads the ad to gptadslots with correct id', () => {
      let testId = 'div-gpt-ad-1234567-1'

      it('when pubwise is enabled', () => {
        loadAd(testId)

        assert(refreshSpy.calledWith([global.gptadslots[testId]]))
      })
      it('without pubwise', () => {
        const cachedPubwise = global.pubwise

        global.pubwise = {
          enabled: true
        }

        loadAd(testId)

        assert.equal(global.pwpbjs.que.length, 1)

        global.pwpbjs.que[0]() // execute the function now on the queue after loadAd()'s run

        const expectedFirstArg = global.gptadslots[testId]
        assert(pwRegisterLazyLoadSpy.calledWith(expectedFirstArg))

        global.pubwise = cachedPubwise
      })
    })
  })
})
