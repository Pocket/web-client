import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTopicSelectors } from 'containers/get-started/get-started.state'
import { HomeLineupHeader } from 'components/headers/home-header'
import { SectionWrapper } from 'components/section-wrapper/section-wrapper'
import { CardTopicRec } from 'connectors/item-card/home/card-topic-rec'
import { OffsetList } from 'components/items-layout/list-offset'
import { getRecsByTopic } from './home.state'
import { parseCookies } from 'nookies'
import { setUserTopics } from 'containers/get-started/get-started.state'

export const HomeRecsByTopic = ({ isPersonalized }) => {
  const dispatch = useDispatch()

  const topicsSelectors = useSelector((state) => state.getStarted.topicsSelectors)
  const isFinalized = useSelector((state) => state.getStarted.finalizedTopics)
  const recsByTopic = useSelector((state) => state.home.recsByTopic) || []
  const userTopics = useSelector((state) => state.getStarted.userTopics)

  const selectedTopics = userTopics

  // When we first render — get any stored topics
  useEffect(() => {
    const { getStartedUserTopics } = parseCookies()
    const userTopics = getStartedUserTopics ? JSON.parse(getStartedUserTopics) : []
    const finalized = userTopics.length
    dispatch(setUserTopics(userTopics, finalized))
  }, [dispatch])

  // Set up topic selectors so we can properly filter topics
  useEffect(() => {
    dispatch(getTopicSelectors())
  }, [dispatch])

  // We memo the topics so we don't constantly re-render
  const topics = useMemo(() => {
    if (!topicsSelectors.length || !selectedTopics.length) return []
    return topicsSelectors.filter((topic) => selectedTopics.includes(topic.name))
  }, [selectedTopics, topicsSelectors])

  // If we have topic selectors lets get a topic mix
  useEffect(() => {
    if (!topics.length || !isFinalized) return
    dispatch(getRecsByTopic(topics))
  }, [dispatch, topics, isFinalized])

  return recsByTopic.length && !isPersonalized ? (
    <SectionWrapper>
      <HomeLineupHeader
        sectionTitle="Recommended reads, just for you"
        sectionDescription="Stories to fuel your mind, curated for your interests"
        onClickEvent={() => {}}
      />

      <OffsetList
        items={recsByTopic}
        offset={0}
        count={6}
        ItemCard={CardTopicRec}
        cardShape="block"
        showExcerpt={false}
        showTopicName={true}
        border={false}
      />
    </SectionWrapper>
  ) : null
}
