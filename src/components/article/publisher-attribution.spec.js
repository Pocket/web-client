import 'jsdom-global/register'
import React from 'react'
import assert from 'assert'
import { mount } from 'enzyme'
import { testIdSelector } from '@pocket/web-utilities/test-utils'
import { PublisherAttribution } from './publisher-attribution'

import { publisher } from 'mock/article'

describe('PublisherAttribution', () => {
  const baseProps = {
    withCustomButton: publisher.theAtlantic,
    withNoLogo: publisher.noLogoPublisher,
    noArticleCta: publisher.theVerge
  }

  it('renders follow publisher section when including a articleCta', () => {
    const attribution = mount(
      <PublisherAttribution publisher={baseProps.withCustomButton} />
    )

    const section = attribution.find(testIdSelector('follow-publisher'))
    assert(section.exists())
    attribution.unmount()
  })

  it('doesn’t render a publisher image if logoWide is missing', () => {
    const attribution = mount(
      <PublisherAttribution publisher={baseProps.withNoLogo} />
    )

    const section = attribution.find(testIdSelector('publisher-img'))
    assert(!section.exists())
    attribution.unmount()
  })

  it('doesn’t render follow publisher section if articleCta is missing', () => {
    const attribution = mount(
      <PublisherAttribution publisher={baseProps.noArticleCta} />
    )

    const section = attribution.find(testIdSelector('follow-publisher'))
    assert(!section.exists())
    attribution.unmount()
  })
})
