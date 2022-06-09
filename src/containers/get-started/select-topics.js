import { useEffect } from 'react'
import Layout from 'layouts/get-started'
import { Button } from 'components/buttons/button'
import { useDispatch, useSelector } from 'react-redux'
import { selectTopic } from './get-started.state'
import { deSelectTopic } from './get-started.state'
import { finalizeTopics } from './get-started.state'
import { hydrateGetStarted } from './get-started.state'
import { getTopicSelectors } from './get-started.state'

import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'

import { CheckIcon } from 'components/icons/CheckIcon'
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
  padding: 1rem;
  margin: 0.5rem 0.5rem 0 0;
  font-family: var(--fontSansSerif);
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 28px;
  text-align: center;
  color: var(--color-actionPrimary);
  border: var(--borderStyle);
  border-radius: 8px;
  user-select: none;
  span {
    margin-right: 1rem;
    width: 18px;
    height: 18px;
    border: var(--borderStyle);
    border-radius: var(--borderRadius);
  }
  &:hover,
  &.selected {
    cursor: pointer;
    background-color: rgba(0, 128, 120, 0.1);
    span {
      background-color: var(--color-canvas);
    }
  }
  .checkIcon {
    transform: translate(-1px, -6px);
  }
`

export const SelectTopics = ({ metaData }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const topicSelectors = useSelector((state) => state.getStarted.topicsSelectors)

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
  const handleSkip = () => router.push('/home?get-started=skip')

  return (
    <Layout metaData={metaData} className={getStartedContainerStyle} noNav={true}>
      {topicSelectors.length ? (
        <>
          <header className="page-header">
            <h1 className="title">Hey, interesting person. What interests you?</h1>
            <h2 className="sub-head">
              Pick the Topics you find interesting and we'll use these topics to find you stories.
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
            <Button className="button" size="small" onClick={handleContinue}>
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
    <div className={cx(topicStyle, isSelected && 'selected')} onClick={toggleTopic}>
      <span>{isSelected ? <CheckIcon className="checkIcon" /> : null}</span>
      {topic.name}
    </div>
  )
}
