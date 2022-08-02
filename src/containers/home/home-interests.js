import { useState } from 'react'
import { css, cx } from 'linaria'
import { SectionWrapper } from 'components/section-wrapper/section-wrapper'
import RainbowReader from 'static/images/rainbow-reader-transparent.svg'
import { LogoMark } from 'components/logo/logo'
import { useDispatch, useSelector } from 'react-redux'
import { selectTopic } from 'containers/get-started/get-started.state'
import { deSelectTopic } from 'containers/get-started/get-started.state'
import { finalizeTopics } from 'containers/get-started/get-started.state'
import { reSelectTopics } from 'containers/get-started/get-started.state'

import { breakpointMediumHandset } from 'common/constants'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

const homeInterestStyles = css`
  margin: 0 0 2rem;
  background-color: var(--color-apricotLightest);

  .body {
    padding: 2rem 0 1rem;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    background-position: right top;
    background-repeat: no-repeat;
  }
  .copy {
    grid-column: 1 / span 8;
  }
  .illustration {
    grid-column: 9 / span 2;
  }
  h2 {
    font-family: var(--fontSerifAlt);
    font-weight: 500;
    font-size: 40px;
    line-height: 48px;
    margin: 1rem 0 0;
  }
  p {
    font-weight: 400;
    font-size: 19px;
    line-height: 28px;
    margin: 1rem 0;
  }
  .actions {
    grid-column: 1 / span 8;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 1rem 0 2rem;
    button {
      margin-left: 1rem;
    }

    &.left {
      justify-content: flex-start;
      button {
        margin-left: 0;
      }
    }
  }
`

const topicSelectorStyle = css`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 2rem;
  grid-column: 1 / span 9;
`

const topicStyle = css`
  display: flex;
  align-items: center;
  align-content: center;
  padding: 0.5rem 1rem;
  margin: 1rem 1rem 0 0;
  font-family: var(--fontSansSerif);
  font-style: normal;
  font-weight: 400;
  font-size: 1.188rem;
  line-height: 1.75;
  text-align: center;
  color: var(--color-textPrimary);
  border: var(--dividerStyle);
  border-radius: 8px;
  user-select: none;

  ${breakpointMediumHandset} {
    font-size: 1rem;
    padding: 0.25rem 0.5rem;
    margin: 0.5rem 0.5rem 0 0;
  }

  input {
    margin-right: 0.5rem;
    width: 18px;
    height: 18px;
    border: var(--borderStyle);
    border-radius: var(--borderRadius);
    &:before {
      margin-top: -5px;
      margin-left: -1px;

      ${breakpointMediumHandset} {
        margin-top: -2px;
      }
    }
    &:checked:before {
      transform: scale(0.8);
    }
  }
  &:hover,
  &.selected {
    cursor: pointer;
    color: var(--color-actionPrimary);
    background-color: rgba(0, 128, 120, 0.05);
    span {
      background-color: var(--color-canvas);
    }
  }
  .checkIcon {
    transform: translate(-1px, -9px);
  }
`

const TopicButton = ({ topic }) => {
  const dispatch = useDispatch()
  const userTopics = useSelector((state) => state.getStarted.userTopics)
  const isSelected = userTopics.includes(topic.name)

  const topicAction = isSelected ? deSelectTopic : selectTopic
  const toggleTopic = () => {
    const analyticsData = {
      label: topic.name,
      value: isSelected ? 'deselect' : 'select'
    }
    dispatch(topicAction(topic.name))
    dispatch(sendSnowplowEvent('get-started.topic.toggle', analyticsData))
  }

  return (
    <label className={cx(topicStyle, 'selected' && isSelected)}>
      <input type="checkbox" checked={isSelected} onChange={toggleTopic} />
      {topic.name}
    </label>
  )
}

export const HomeInterests = () => {
  const dispatch = useDispatch()
  const topicsSelectors = useSelector((state) => state.getStarted.topicsSelectors)
  const userTopics = useSelector((state) => state.getStarted.userTopics)
  const isFinalized = useSelector((state) => state.getStarted.finalizedTopics)
  const [isSkipped, setIsSkipped] = useState(false)

  const handleContinue = () => {
    dispatch(sendSnowplowEvent('get-started.topic.continue'))
    dispatch(finalizeTopics())
  }

  const toggleSkip = () => {
    setIsSkipped(!isSkipped)
    dispatch(sendSnowplowEvent('get-started.topic.skip'))
  }

  const resetTopics = () => {
    dispatch(reSelectTopics())
  }

  const containerClass = cx(homeInterestStyles, isSkipped && 'skipped')

  const SectionToRender =
    !isSkipped && !isFinalized ? TopicSelector : isFinalized ? FinalizeMessage : PersonalizeMessage

  return (
    <div className={containerClass}>
      <SectionWrapper>
        <SectionToRender
          noTopicSelected={!userTopics.length}
          toggleSkip={toggleSkip}
          resetTopics={resetTopics}
          topicSelectors={topicsSelectors}
          handleContinue={handleContinue}
        />
      </SectionWrapper>
    </div>
  )
}

const TopicSelector = ({ toggleSkip, topicSelectors, handleContinue, noTopicSelected }) => {
  return (
    <>
      <div className="body" style={{ backgroundImage: `url(${RainbowReader.src})` }}>
        <div className="copy">
          <LogoMark />
          <h2>
            Welcome to Pocket! <br /> Let's find the best content for <em>You</em>
          </h2>
          <p>Pick the Topics you find interesting and we'll use them to find you great stories.</p>
        </div>
        <div className={topicSelectorStyle}>
          {topicSelectors.map((topic) => (
            <TopicButton key={topic.slug} topic={topic} />
          ))}
        </div>
      </div>
      <div className="actions">
        <button onClick={toggleSkip} className="text">
          Skip
        </button>
        <button
          onClick={handleContinue}
          disabled={noTopicSelected}
          className={cx(noTopicSelected && 'disabled')}>
          Continue
        </button>
      </div>
    </>
  )
}

const PersonalizeMessage = ({ toggleSkip }) => {
  return (
    <>
      <div className="body" style={{ backgroundImage: `url(${RainbowReader.src})` }}>
        <div className="copy">
          <LogoMark />
          <h2>Personalize your Home to find interesting reads</h2>
        </div>
        <div className="actions left">
          <button onClick={toggleSkip}>Continue</button>
        </div>
      </div>
    </>
  )
}

const FinalizeMessage = ({ resetTopics }) => {
  return (
    <>
      <div className="body" style={{ backgroundImage: `url(${RainbowReader.src})` }}>
        <div className="copy">
          <LogoMark />
          <h2>Start saving the articles you find interesting.</h2>
        </div>
        <div className="actions left">
          <button onClick={resetTopics}>Re-Select Topics</button>
        </div>
      </div>
    </>
  )
}
