import React from 'react'

import topicsData from 'common/_mocks/topics'
import TopicsPillbox from './topics-pillbox'

export default {
  title: 'Components/TopicsPillbox',
  component: TopicsPillbox
}

export const normal = () => (
  <TopicsPillbox id="topics-pillbox-story" topicsMap={topicsData} />
)

export const centerAlign = () => (
  <TopicsPillbox
    id="topics-pillbox-story"
    topicsMap={topicsData}
    alignItems="center"
  />
)
