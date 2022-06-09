import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTopicSelectors } from 'containers/get-started//get-started.state'
import { HomeLineupHeader } from 'components/headers/home-header'
import { SectionWrapper } from 'components/section-wrapper/section-wrapper'
import { CardTopicRec } from 'connectors/item-card/home/card-topic-rec'
import { OffsetList } from 'components/items-layout/list-offset'
import { getRecsByTopic } from './home.state'
import { parseCookies } from 'nookies'

export const HomeRecsByTopic = () => {
  const dispatch = useDispatch()

  const topicsSelectors = useSelector((state) => state.getStarted.topicsSelectors)
  const recsByTopic = useSelector((state) => state.home.recsByTopic) || []
  const { getStartedUserTopics = [] } = parseCookies()

  const hasSelectedTopics = getStartedUserTopics.length
  const hasRecsByTopic = recsByTopic.length
  const hasTopicsSelectors = topicsSelectors.length

  // Set up topic selectors if we are in getStartedActive and don't have them
  useEffect(() => {
    if (hasTopicsSelectors || !hasSelectedTopics) return
    dispatch(getTopicSelectors())
  }, [dispatch, hasTopicsSelectors, hasSelectedTopics])

  // If we have topic selectors lets get a topic mix
  useEffect(() => {
    if (hasRecsByTopic || !hasTopicsSelectors) return
    const topics = topicsSelectors.filter((topic) => getStartedUserTopics.includes(topic.name))
    dispatch(getRecsByTopic(topics))
  }, [dispatch, hasRecsByTopic, hasTopicsSelectors, topicsSelectors, getStartedUserTopics])

  return recsByTopic.length ? (
    <SectionWrapper>
      <HomeLineupHeader
        sectionTitle="Recommended For You"
        sectionDescription="Articles based on your topics"
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
