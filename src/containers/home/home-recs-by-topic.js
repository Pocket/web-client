import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HomeLineupHeader } from 'components/headers/home-header'
import { SectionWrapper } from 'components/section-wrapper/section-wrapper'
import { CardTopicRec } from 'connectors/item-card/home/card-topic-rec'
import { OffsetList } from 'components/items-layout/list-offset'
import { getRecsByTopic } from './home.state'

export const HomeRecsByTopic = () => {
  const dispatch = useDispatch()

  const topicsSelectors = useSelector((state) => state.homeSetup.topicsSelectors)
  const recsByTopic = useSelector((state) => state.home.recsByTopic) || []
  const userTopics = useSelector((state) => state.homeSetup.userTopics)

  const hasTopicsSelectors = topicsSelectors.length

  // If we have topic selectors lets get a topic mix
  useEffect(() => {
    if (!hasTopicsSelectors) return
    const topics = topicsSelectors.filter((topic) => userTopics.includes(topic.name))
    dispatch(getRecsByTopic(topics))
  }, [dispatch, hasTopicsSelectors, topicsSelectors, userTopics])

  return recsByTopic.length ? (
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
