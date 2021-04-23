import React from 'react'
import { css } from 'linaria'
import { PillCheckbox } from '@pocket/web-ui'
import { darkMode } from '@pocket/web-ui'
import { HomeJourneyHeader } from 'components/headers/home-header'
import { useDispatch, useSelector } from 'react-redux'
import { setTopicSection } from 'containers/home/home.state'
import { unsetTopicSection } from 'containers/home/home.state'
import { topicToggleEvent } from 'containers/home/home.analytics'
import { topicHeadings } from './listTopics'

const selectionStyles = css`
  padding: 2rem 0;
`

export const pillboxStyle = css`
  padding: 0 3rem 1.5rem;

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
      data-cy={`topic-checkbox-${topic.topic}`}
      name={topicHeadings[topic.topic]?.title}
    />
  )
}

export const TopicSelector = () => {
  const dispatch = useDispatch()

  // Get topicList for sections that require it
  const topics = useSelector((state) => state.topicList?.topicsByName)
  const topicSections = useSelector((state) => state.home.topicSections)
  const topicsKeys = Object.keys(topics)
  const topicsArray = topicsKeys.map((key) => topics[key])

  // Don't display promoted topics
  const sortedTopics = topicsArray.filter((topic) => !topic.is_promoted)

  const journeyTitles = ['Start your Pocket journey', 'Discover more topics']

  const journeySubTitles = [
    'Select a topic to find fascinating stories from all across the web',
    'Save today’s essential reads and find them later in My List'
  ]

  const journeyTitle = journeyTitles[Math.min(topicSections?.length, Math.max(0, 1))]

  const journeySubTitle = journeySubTitles[Math.min(topicSections?.length, Math.max(0, 1))]

  const handleTopicClick = (topic) => {
    const topicAction = topicSections.find((item) => item.id === topic.id)
      ? unsetTopicSection
      : setTopicSection

    dispatch(topicAction(topic))
    dispatch(topicToggleEvent(topic.topic))
  }

  return (
    <div className={selectionStyles}>
      <HomeJourneyHeader sectionTitle={journeyTitle} sectionDescription={journeySubTitle} />
      <div className={pillboxStyle}>
        <div className="pillContainer">
          {sortedTopics.map((topic) => (
            <TopicPill
              handleTopicClick={handleTopicClick}
              topic={topic}
              active={topicSections.find((item) => item.id === topic.id) || false } //prettier-ignore
              key={`topics-pillbox-${topic.topic}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
