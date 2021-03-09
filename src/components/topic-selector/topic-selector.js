import React from 'react'
import { css } from 'linaria'
import { PillCheckbox } from '@pocket/web-ui'
import { darkMode } from '@pocket/web-ui'

export const pillboxStyle = css`
  padding: 0 3rem 1.5rem;
  border-bottom: var(--dividerStyle);

  .pillContainer {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  label {
    white-space: nowrap;
    margin-right: 0.5rem;
  }

  .active button,
  button:focus {
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
    <PillCheckbox
      isChecked={active}
      onClick={handleClick}
      data-cy="topic-pill"
      name={topic.display_name}
    />
  )
}

export const TopicSelector = ({
  id,
  topics,
  topicSections = [],
  handleTopicClick
}) => {
  const topicsKeys = Object.keys(topics)
  const topicsArray = topicsKeys.map((key) => topics[key])
  // don't display promoted topics
  const sortedTopics = topicsArray.filter((topic) => !topic.is_promoted)

  return (
    <div className={pillboxStyle}>
      <div className="pillContainer">
        {sortedTopics.map((topic) => (
          <TopicPill
            handleTopicClick={handleTopicClick}
            topic={topic}
            active={topicSections.find((item) => item.id === topic.id) || false}
            key={`topics-pillbox-${id}-${topic.topic}`}
          />
        ))}
      </div>
    </div>
  )
}
