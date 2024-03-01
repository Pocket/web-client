import React from 'react'
import { css } from '@emotion/css'
import { PillCheckbox } from 'components/pill/pill-checkbox'
import { useDispatch, useSelector } from 'react-redux'
import { setTopicSection } from 'containers/home/home.state'
import { unsetTopicSection } from 'containers/home/home.state'
import { TopicHeadings, headingsEnglishPlainText } from './topic-headings'

export const pillboxStyle = css`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  label {
    white-space: nowrap;
    margin-right: 0.5rem;
  }
`

const TopicPill = ({ topic, handleTopicClick, active }) => {
  const name = <TopicHeadings topic={topic.topic} type="title" />
  const labelPlainText = headingsEnglishPlainText[topic.topic]
  const handleClick = () => handleTopicClick(topic, labelPlainText)

  return (
    <PillCheckbox
      isChecked={active}
      onClick={handleClick}
      data-testid={`topic-checkbox-${topic.topic}`}
      name={name}
    />
  )
}

export const TopicSelector = ({ toggleCallback = () => {} }) => {
  const dispatch = useDispatch()

  // Get topicList for sections that require it
  const topics = useSelector((state) => state.topicList?.topicsByName)
  const pinnedTopics = useSelector((state) => state.settings.pinnedTopics)
  const topicsKeys = Object.keys(topics)
  const topicsArray = topicsKeys.map((key) => topics[key])

  // Don't display promoted topics
  const sortedTopics = topicsArray.filter((topic) => !topic.is_promoted)

  const handleTopicClick = (topic, label) => {
    const topicAction = pinnedTopics.find((item) => item.topic_slug === topic.topic_slug)
      ? unsetTopicSection
      : setTopicSection

    dispatch(topicAction(topic))
    toggleCallback(label)
  }

  return (
    <div className={pillboxStyle}>
      {sortedTopics.map((topic) => (
        <TopicPill
          handleTopicClick={handleTopicClick}
          topic={topic}
          active={pinnedTopics.find((item) => item.topic_slug === topic.topic_slug) || false } //prettier-ignore
          key={`topics-pillbox-${topic.topic}`}
        />
      ))}
    </div>
  )
}
