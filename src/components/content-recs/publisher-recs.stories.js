import React from 'react'
import { PublisherRecs } from './publisher-recs'
import { publisher, publisherRecommendations as publisherRecs } from 'mock/article'

export default {
  title: 'Recommendations/Publisher',
  component: PublisherRecs
}

export const normal = () => {
  return (
    <PublisherRecs
      publisher={publisher.theVerge}
      recommendations={publisherRecs.recommendations}
    />
  )
}

export const noPublisherLogo = () => {
  return (
    <PublisherRecs
      publisher={publisher.noLogoPublisher}
      recommendations={publisherRecs.recommendations}
    />
  )
}

export const noRecs = () => {
  return <PublisherRecs publisher={publisher.theVerge} />
}
