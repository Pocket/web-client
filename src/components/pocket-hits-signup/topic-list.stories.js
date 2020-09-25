import React from 'react'

import TopicList from './topic-list'

export default {
  title: 'Components/Pocket Hits Signup/TopicList',
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
