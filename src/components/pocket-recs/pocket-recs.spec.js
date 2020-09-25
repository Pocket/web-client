import 'jsdom-global/register'
import React from 'react'
import assert from 'assert'
import { shallow, mount } from 'enzyme'
import { testIdSelector } from '@pocket/web-utilities/test-utils'
import PocketRecs, {
  Heading,
  Publisher,
  Recommendations,
  Recommendation
} from './pocket-recs'

import { pocketRecommendations as pocketRecs, publisher } from 'mock/article'

describe('PocketRecs', () => {
  const baseProps = {
    recommendations: pocketRecs.recommendations
  }
  it('does not render <Heading> or <Recommendations> when there are no recommendations', () => {
    const noRecsInstance = shallow(<PocketRecs recommendations={[]} />)
    const heading = noRecsInstance.find(testIdSelector('pocket-recs-heading'))
    const recommendations = noRecsInstance.find(
      testIdSelector('pocket-recommended-articles')
    )

    assert(!heading.exists())
    assert(!recommendations.exists())
  })
  describe('Publisher', () => {
    it('renders a Publisher with a logo image, when available', () => {
      const { name, logoWideBlack } = publisher.theVerge
      const publisherWithLogo = shallow(
        <Publisher name={name} logo={logoWideBlack} />
      )

      assert.equal(
        publisherWithLogo
          .find(testIdSelector('pocket-rec-publisher-logo'))
          .prop('src'),
        logoWideBlack
      )
    })
    it('renders the name of the Publisher when its logo url is not available', () => {
      const { name } = publisher.theVerge
      const publisherNoLogo = shallow(<Publisher name={name} logo={null} />)

      assert(
        !publisherNoLogo
          .find(testIdSelector('pocket-rec-publisher-logo'))
          .exists()
      )
      assert.equal(
        publisherNoLogo
          .find(testIdSelector('pocket-rec-publisher-name'))
          .text(),
        name
      )
    })
  })
  describe('Recommendations', () => {
    const maxRecs = 3

    it('limits the displayed articles to the max count if more than the max was passed in', () => {
      const moreRecommendationsThanNeeded = [
        ...baseProps.recommendations,
        ...baseProps.recommendations
      ] // total 6
      const publisherRecsOverloaded = mount(
        <PocketRecs
          recommendations={moreRecommendationsThanNeeded}
          maxRecommendations={maxRecs}
        />
      )
      assert.equal(moreRecommendationsThanNeeded.length > maxRecs, true)
      assert.equal(publisherRecsOverloaded.find(Recommendation).length, maxRecs)
      // VisibilitySensor needs to be manually unmounted
      publisherRecsOverloaded.unmount()
    })
    it('displays all articles passed in if less than the max number of articles', () => {
      const shortenedRecs = baseProps.recommendations.slice(0, 2)
      const publisherRecsLessThanMax = mount(
        <PocketRecs
          recommendations={shortenedRecs}
          maxRecommendations={maxRecs}
        />
      )
      assert.equal(
        publisherRecsLessThanMax.find(Recommendation).length,
        shortenedRecs.length
      )
      // VisibilitySensor needs to be manually unmounted
      publisherRecsLessThanMax.unmount()
    })
  })
})
