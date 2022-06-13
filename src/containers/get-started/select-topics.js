import { useEffect } from 'react'
import Layout from 'layouts/get-started'
import { Button } from 'components/buttons/button'
import { useDispatch, useSelector } from 'react-redux'
import { selectTopic } from './get-started.state'
import { deSelectTopic } from './get-started.state'
import { finalizeTopics } from './get-started.state'
import { hydrateGetStarted } from './get-started.state'
import { getTopicSelectors } from './get-started.state'
import { breakpointMediumHandset } from 'common/constants'

import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'

// import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { css, cx } from 'linaria'
import { getStartedContainerStyle } from './get-started'

const topicSelectorStyle = css`
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;
`

const topicStyle = css`
  display: flex;
  align-items: center;
  align-content: center;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0.5rem 0 0;
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
  }

  input {
    margin-right: 1rem;
    width: 18px;
    height: 18px;
    border: var(--borderStyle);
    border-radius: var(--borderRadius);
    &:before {
      content: url('data:image/svg+xml;charset=US-ASCII,<svg fill="%23008078" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.707 5.293a1 1 0 0 1 0 1.414l-12 12a1 1 0 0 1-1.414 0l-6-6a1 1 0 1 1 1.414-1.414L9 16.586 20.293 5.293a1 1 0 0 1 1.414 0Z"></path></svg>');
      margin-top: -3px;

      ${breakpointMediumHandset} {
        margin-top: 0;
      }
    }
    &:checked,
    &:checked:hover {
      border: var(--borderStyle);
      background-color: var(--color-canvas);
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

export const SelectTopics = ({ metaData }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const topicSelectors = useSelector((state) => state.getStarted.topicsSelectors)
  const userTopics = useSelector((state) => state.getStarted.userTopics)
  const topicsSelected = userTopics.length > 0

  // Dispatch for topic selectors
  useEffect(() => {
    if (topicSelectors.length) return

    dispatch(getTopicSelectors())
  }, [dispatch, topicSelectors])

  // Get any stored topics
  useEffect(() => {
    const { getStartedUserTopics } = parseCookies()
    const userTopics = getStartedUserTopics ? JSON.parse(getStartedUserTopics) : []
    dispatch(hydrateGetStarted({ userTopics }))
  }, [dispatch])

  const handleContinue = () => {
    dispatch(finalizeTopics())
    router.push('/get-started/select-article', null, { shallow: true })
  }
  const handleSkip = () => router.push('/get-started/select-article', null, { shallow: true })

  return (
    <Layout metaData={metaData} className={getStartedContainerStyle} noNav={true}>
      {topicSelectors.length ? (
        <>
          <header className="page-header">
            <h1 className="title">Hey, interesting person. What interests you?</h1>
            <h2 className="sub-head">
              Pick the <strong>Topics</strong> you find interesting and we’ll use these topics to
              find you stories.
            </h2>
          </header>
          <div className={topicSelectorStyle}>
            {topicSelectors.map((topic) => (
              <TopicButton key={topic.slug} topic={topic} />
            ))}
          </div>
          <footer className="page-footer">
            <Button className="button" variant="inline" onClick={handleSkip}>
              Skip
            </Button>
            <Button disabled={!topicsSelected} className="button" onClick={handleContinue}>
              Continue
            </Button>
          </footer>
        </>
      ) : null}
    </Layout>
  )
}

const TopicButton = ({ topic }) => {
  const dispatch = useDispatch()
  const userTopics = useSelector((state) => state.getStarted.userTopics)
  const isSelected = userTopics.includes(topic.name)

  const topicAction = isSelected ? deSelectTopic : selectTopic
  const toggleTopic = () => dispatch(topicAction(topic.name))

  return (
    <label className={cx(topicStyle, isSelected && 'selected')}>
      <input type="checkbox" checked={isSelected} onChange={toggleTopic} />
      {topic.name}
    </label>
  )
}
