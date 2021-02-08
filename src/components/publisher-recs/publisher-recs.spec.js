import 'jsdom-global/register'
import React from 'react'
import assert from 'assert'
import { shallow, mount } from 'enzyme'
import PublisherRecs, { Publisher, RecommendedArticle } from './publisher-recs'

import {
  publisher,
  publisherRecommendations as publisherRecs
} from 'mock/article'

describe('PublisherRecs', () => {
  const baseProps = {
    publisher: publisher.theVerge,
    recommendations: publisherRecs.recommendations
  }
  it('does not render <Publisher> or <RecommendedArticles> when there are no recommendations', () => {
    const noRecsInstance = shallow(
      <PublisherRecs publisher={baseProps.publisher} />
    )
    const publisherHeader = noRecsInstance.find(
      "[data-cy='publisher-header']"
    )
    const recommendations = noRecsInstance.find(
      "[data-cy='recommended-articles']"
    )

    assert(!publisherHeader.exists())
    assert(!recommendations.exists())
  })
  describe('Publisher', () => {
    it('renders a Publisher with a logo image, when available', () => {
      const { recommendationName, logo } = publisher.theVerge
      const publisherWithLogo = shallow(
        <Publisher recommendationName={recommendationName} logo={logo} />
      )

      assert.equal(
        publisherWithLogo.find("[data-cy='publisher-logo']").prop('src'),
        logo.url
      )
    })
    it('renders a Publisher with no logo when its logo url is not available', () => {
      const { recommendationName } = publisher.theVerge
      const publisherNoLogo = shallow(
        <Publisher recommendationName={recommendationName} logo={null} />
      )

      assert(!publisherNoLogo.find("[data-cy='publisher-logo']").exists())
    })
    it('renders a Publisher recommendationName, when available', () => {
      const { recommendationName, logo } = publisher.theVerge
      const publisherWithRecommendationName = shallow(
        <Publisher
          recommendationName={recommendationName}
          name="This will not be used"
          logo={logo}
        />
      )

      assert.equal(
        publisherWithRecommendationName
          .find("[data-cy='publisher-recs-publisher-name']")
          .text(),
        `More from ${recommendationName}`
      )
    })
    it('renders a Publisher name when a publisher has no recommendationName', () => {
      const { name, logo } = publisher.theVerge
      const publisherWithNoRecommendationName = shallow(
        <Publisher recommendationName={null} name={name} logo={logo} />
      )

      assert.equal(
        publisherWithNoRecommendationName
          .find("[data-cy='publisher-recs-publisher-name']")
          .text(),
        `More from ${name}`
      )
    })
  })
  describe.skip('RecommendedArticles', () => {
    const maxRecs = 3

    it('limits the displayed articles to the max count if more than the max was passed in', () => {
      const moreRecommendationsThanNeeded = baseProps.recommendations.slice(
        0,
        8
      )
      const publisherRecsOverloaded = mount(
        <PublisherRecs
          publisher={baseProps.publisher}
          recommendations={moreRecommendationsThanNeeded}
          maxRecommendations={maxRecs}
        />
      )
      assert.equal(moreRecommendationsThanNeeded.length > maxRecs, true)
      assert.equal(
        publisherRecsOverloaded.find(RecommendedArticle).length,
        maxRecs
      )
      // VisibilitySensor needs to be manually unmounted
      publisherRecsOverloaded.unmount()
    })
    it('displays all articles passed in if less than the max number of articles', () => {
      const shortenedRecs = baseProps.recommendations.slice(0, 2)
      const publisherRecsLessThanMax = mount(
        <PublisherRecs
          publisher={baseProps.publisher}
          recommendations={shortenedRecs}
          maxRecommendations={maxRecs}
        />
      )
      assert.equal(
        publisherRecsLessThanMax.find(RecommendedArticle).length,
        shortenedRecs.length
      )
      // VisibilitySensor needs to be manually unmounted
      publisherRecsLessThanMax.unmount()
    })
  })
})
