import React from 'react'
import { css, cx } from 'linaria'
import classNames from 'classnames'
import { Pill } from '@pocket/web-ui'
import { darkMode } from '@pocket/web-ui'

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

  button {
    font-weight: 400;
    color: var(--color-textSecondary);
  }

  .active button {
    border-color: var(--color-actionPrimaryHover);
    background: var(--color-actionPrimarySubdued);
    color: var(--color-actionPrimaryHover);
    text-decoration: none;

    ${darkMode} {
      border-color: var(--color-textLinkHover);
      color: var(--color-textLinkHover);
      background: none;
    }
  }
`

const TopicPill = ({ topic, handleTopicClick, active }) => {
  const handleClick = () => handleTopicClick(topic)

  return (
    <li className={classNames({ active })}>
      <Pill onClick={handleClick} data-cy="topic-pill">
        {topic.display_name}
      </Pill>
    </li>
  )
}

export const TopicSelector = ({ id, topics, topicSelections = [], handleTopicClick }) => {
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
            active={topicSelections.find(item => item.id === topic.id)}
            key={`topics-pillbox-${id}-${topic.topic}`}
          />
        ))}
      </ul>
    </div>
  )
}
