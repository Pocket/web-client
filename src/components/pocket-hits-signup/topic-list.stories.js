import React from 'react'

import TopicList from './topic-list'

export default {
  title: 'Pocket Hits/Topic List',
  component: TopicList
}

export const normal = () => (
  <TopicList
    topics={[
      'Science',
      'Technology',
      'Health',
      'Culture',
      'Self-improvement',
      'News',
      'Travel'
    ]}
  />
)

export const noBorder = () => (
  <TopicList
    topics={[
      'Science',
      'Technology',
      'Health',
      'Culture',
      'Self-improvement',
      'News',
      'Travel'
    ]}
    showTopBorder={false}
  />
)
