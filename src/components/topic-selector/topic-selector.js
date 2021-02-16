import React from 'react'
import { css, cx } from 'linaria'
import { Pill } from '@pocket/web-ui'

export const pillboxStyle = css`
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    text-align: center;

    li {
      display: inline-block;
      margin: 0 var(--spacing025) var(--spacing075);
    }
  }
`

const TopicPill = ({ topic, handleTopicClick }) => {
  const handleClick = () => handleTopicClick(topic)

  return (
    <li>
      <Pill onClick={handleClick} data-cy="topic-pill">
        {topic.display_name}
      </Pill>
    </li>
  )
}

export const TopicSelector = ({ id, topics, handleTopicClick }) => {
  const topicsKeys = Object.keys(topics)
  const topicsArray = topicsKeys.map((key) => topics[key])
  // don't display promoted topics
  const sortedTopics = topicsArray.filter((topic) => !topic.is_promoted)

  return (
    <div className={pillboxStyle}>
      <ul>
        {sortedTopics.map((topic) => (
          <TopicPill
            handleTopicClick={handleTopicClick}
            topic={topic}
            key={`topics-pillbox-${id}-${topic.topic}`}
          />
        ))}
      </ul>
    </div>
  )
}
