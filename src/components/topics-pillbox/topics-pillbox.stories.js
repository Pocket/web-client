import React from 'react'

import { topics } from 'mock/article'
import TopicsPillbox from './topics-pillbox'

export default {
  title: 'Components/TopicsPillbox',
  component: TopicsPillbox
}

export const normal = () => (
  <TopicsPillbox id="topics-pillbox-story" topicsMap={topics} />
)

export const centerAlign = () => (
  <TopicsPillbox
    id="topics-pillbox-story"
    topicsMap={topics}
    alignItems="center"
  />
)
