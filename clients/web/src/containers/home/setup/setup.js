import { useEffect } from 'react'
import { css, cx } from '@emotion/css'
import { SectionWrapper } from 'components/section-wrapper/section-wrapper'
import RainbowReader from 'static/images/rainbow-reader-transparent.svg'
import { LogoMark } from 'components/logo/logo'
import { useDispatch, useSelector } from 'react-redux'
import { setSetupStatus } from 'containers/home/setup/setup.state'
import { selectTopic } from 'containers/home/setup/setup.state'
import { deSelectTopic } from 'containers/home/setup/setup.state'
import { cancelTopicSelection } from 'containers/home/setup/setup.state'
import { finalizeTopics } from 'containers/home/setup/setup.state'
import { reSelectTopics } from 'containers/home/setup/setup.state'
import { CloseButton } from 'components/close-button/close-button'
import { getTopicSelectors } from 'containers/home/setup/setup.state'
import { useRouter } from 'node_modules/next/router'

import { breakpointLargeTablet } from 'common/constants'
import { breakpointTinyTablet } from 'common/constants'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

const homeSetupStyles = css`
  position: sticky;
  top: 60px;
  z-index: var(--zIndexHeader);
  margin: 0 0 2rem;
  background-color: var(--color-apricotLightest);

  .colormode-dark & {
    background-color: var(--color-grey20);
  }

  .colormode-sepia & {
    background-color: var(--color-amberLight);
  }

  .body {
    padding: 2rem 0 0.75rem;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    border-bottom: 1px solid var(--color-dividerTertiary);
    background-position: right -2rem;
    background-repeat: no-repeat;

    ${breakpointLargeTablet} {
      background-image: none !important;
    }

    .colormode-dark &,
    .colormode-sepia & {
      border-bottom-color: var(--color-dividerSecondary);
    }
  }
  .copy {
    grid-column: 1 / span 8;

    ${breakpointTinyTablet} {
      grid-column: 1 / span 12;
    }
  }
  .logo {
    margin-bottom: 1rem;
  }
  h2,
  h3 {
    font-family: var(--fontSerifAlt);
    font-weight: 500;
    font-size: 40px;
    line-height: 48px;
    margin: 0;
    letter-spacing: -0.5px;

    ${breakpointTinyTablet} {
      font-size: 23px;
      line-height: 28px;
    }
  }
  p {
    max-width: 560px;
    font-weight: 400;
    font-size: 19px;
    line-height: 28px;
    margin: 20px 0 10px;
    strong {
      font-weight: 600;
    }

    ${breakpointTinyTablet} {
      font-size: 16px;
      line-height: 24px;
      margin: 16px 0;
    }
  }
  .actions {
    grid-column: 1 / span 8;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 1rem 0 2rem;
    button {
      margin: 0 0 0 1rem;
      &:disabled {
        opacity: 0.5;
        pointer-events: none;
      }
    }
    .text {
      color: var(--color-actionPrimary);
    }
  }
  .close {
    position: absolute;
    top: 24px;
    right: -8px; // to offset the padding on the right, makes it flush with the Continue button
    padding: 8px;
    width: 40px;
  }

  &.skipped {
    .body {
      position: relative;
      padding-bottom: 32px;
      border-bottom: none;
    }

    .actions {
      grid-column: 9 / span 4;
      margin-top: 3rem;

      ${breakpointTinyTablet} {
        grid-column: 1 / span 12;
        margin-top: 0;
        padding-bottom: 0;
      }
    }
  }
`

const topicSelectorStyle = css`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 2rem;
  grid-column: 1 / span 10;

  ${breakpointTinyTablet} {
    grid-column: 1 / span 12;
  }
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
  color: var(--color-checkboxLabel);
  border: 1px solid var(--color-checkboxBorder);
  background-color: var(--color-checkboxBackground);
  border-radius: 8px;
  user-select: none;

  ${breakpointTinyTablet} {
    font-size: 1rem;
    padding: 0.25rem 0.5rem;
    margin: 0.5rem 0.5rem 0 0;
  }
  input[type='checkbox'] {
    border-color: var(--color-checkboxInputBorder);
    background-color: var(--color-checkboxInputBackground);

    &:checked {
      border-color: var(--color-checkboxInputBorderSelected);
      background-color: var(--color-checkboxInputBackgroundSelected);
    }

    &:before {
      line-height: 1;
      ${breakpointTinyTablet} {
        line-height: 1.3;
      }
    }
  }

  &.selected {
    color: var(--color-checkboxLabelSelected);
    background-color: var(--color-checkboxBackgroundSelected);
    border-color: var(--color-checkboxBorderSelected);
  }

  &:hover {
    cursor: pointer;
    color: var(--color-checkboxHighlight);
    background-color: var(--color-checkboxBackground);
    border-color: var(--color-checkboxHighlight);
    input[type='checkbox'] {
      border-color: var(--color-checkboxHighlight);
    }
  }

  .colormode-dark & {
    input[type='checkbox']:before {
      content: var(--checkboxCheckMarkColor);
    }
  }
`

const TopicButton = ({ topic }) => {
  const dispatch = useDispatch()
  const userTopics = useSelector((state) => state.homeSetup.userTopics)
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

  const topicTestId = topic.name.toLowerCase()

  return (
    <label
      className={cx(topicStyle, isSelected && 'selected')}
      data-testid={`topic-pill-${topicTestId}`}>
      <input type="checkbox" checked={isSelected} onChange={toggleTopic} />
      {topic.name}
    </label>
  )
}

export const HomeSetup = () => {
  const dispatch = useDispatch()
  const { locale } = useRouter()
  const hideSetup = ['de', 'de-DE'].includes(locale)

  const setupStatus = useSelector((state) => state.homeSetup.setupStatus)
  const topicsSelectors = useSelector((state) => state.homeSetup.topicsSelectors)
  const userTopics = useSelector((state) => state.homeSetup.userTopics)
  const isFinalized = useSelector((state) => state.homeSetup.finalizedTopics)

  useEffect(() => {
    if (hideSetup) return () => {}
    dispatch(getTopicSelectors())
  }, [dispatch, hideSetup])

  if (hideSetup || !setupStatus) return null

  const isSkipped = setupStatus === 'skipped'
  const isDismissed = setupStatus === 'dismissed'
  const isReselect = setupStatus === 'reselect'

  const handleContinue = () => {
    dispatch(sendSnowplowEvent('get-started.topic.continue'))
    dispatch(finalizeTopics(locale))
  }

  const handleSkip = () => {
    dispatch(setSetupStatus('skipped'))
    dispatch(sendSnowplowEvent('get-started.topic.skip'))
  }

  const handleDismiss = () => {
    dispatch(setSetupStatus('dismissed'))
    dispatch(sendSnowplowEvent('get-started.topic.dismiss'))
  }

  const handleCancel = () => {
    dispatch(cancelTopicSelection())
    dispatch(sendSnowplowEvent('get-started.topic.cancel'))
  }

  const handleReselect = () => {
    dispatch(reSelectTopics())
    dispatch(sendSnowplowEvent('get-started.topic.reselect'))
  }

  const containerClass = cx(homeSetupStyles, isSkipped && 'skipped')

  const showSelectionSetup = !isFinalized || (isFinalized && !userTopics.length)
  const SectionToRender = isSkipped ? PersonalizeMessage : TopicSelector

  return !isDismissed && showSelectionSetup ? (
    <div className={containerClass}>
      <SectionWrapper data-testid="onboarding-section">
        <SectionToRender
          hasTopics={userTopics.length}
          isReselect={isReselect}
          topicSelectors={topicsSelectors}
          handleSkip={handleSkip}
          handleContinue={handleContinue}
          handleCancel={handleCancel}
          handleDismiss={handleDismiss}
          handleReselect={handleReselect}
        />
      </SectionWrapper>
    </div>
  ) : null
}

const TopicSelector = ({
  isReselect,
  handleSkip,
  topicSelectors,
  handleContinue,
  handleCancel,
  hasTopics
}) => {
  return (
    <>
      <div className="body" style={{ backgroundImage: `url(${RainbowReader.src})` }}>
        <div className="copy">
          <LogoMark className="logo" />
          {!isReselect ? <h2>Welcome to Pocket!</h2> : null}
          <h3>Tell us what interests you...</h3>
          <p>
            Pick the <strong>Topics</strong> you find interesting and we‘ll use these topics to find
            you more stories.
          </p>
        </div>
        <div className={topicSelectorStyle}>
          {topicSelectors.map((topic) => (
            <TopicButton key={topic.slug} topic={topic} />
          ))}
        </div>
      </div>
      <div className="actions">
        {hasTopics || isReselect ? null : (
          <button onClick={handleSkip} className="text" data-testid="onboarding-skip">
            Skip
          </button>
        )}
        {isReselect ? (
          <button onClick={handleCancel} className="text" data-testid="onboarding-cancel">
            Cancel
          </button>
        ) : null}
        <button
          onClick={handleContinue}
          data-testid="onboarding-continue"
          disabled={!hasTopics}
          className={cx(!hasTopics && 'disabled')}>
          Continue
        </button>
      </div>
    </>
  )
}

const PersonalizeMessage = ({ handleReselect, handleDismiss }) => {
  return (
    <div className="body">
      <div className="copy">
        <LogoMark className="logo" />
        <h2>Personalize your Home to find interesting reads</h2>
      </div>
      <div className="actions">
        <button onClick={handleReselect}>Continue</button>
      </div>

      <CloseButton handleClose={handleDismiss} dataCy="get-started-dismiss" />
    </div>
  )
}
