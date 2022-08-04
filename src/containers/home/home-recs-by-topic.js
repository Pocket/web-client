import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HomeTopicMixHeader } from 'components/headers/home-header'
import { SectionWrapper } from 'components/section-wrapper/section-wrapper'
import { CardTopicRec } from 'connectors/item-card/home/card-topic-rec'
import { OffsetList } from 'components/items-layout/list-offset'
import { getRecsByTopic } from './home.state'
import { reSelectTopics } from 'containers/home/home-setup.state'

export const HomeRecsByTopic = ({ showReSelect }) => {
  const dispatch = useDispatch()

  const topicsSelectors = useSelector((state) => state.homeSetup.topicsSelectors)
  const recsByTopic = useSelector((state) => state.home.recsByTopic) || []
  const userTopics = useSelector((state) => state.homeSetup.userTopics)
  const isFinalized = useSelector((state) => state.homeSetup.finalizedTopics)

  const waitOnTopicEffect = !topicsSelectors.length || !userTopics.length
  // We memo the topics so we don't constantly re-render
  const topics = useMemo(() => {
    if (waitOnTopicEffect) return []
    return topicsSelectors.filter((topic) => userTopics.includes(topic.name))
  }, [userTopics, topicsSelectors, waitOnTopicEffect])

  // If we have finalized topic selectors lets get a topic mix
  useEffect(() => {
    if (!waitOnTopicEffect && isFinalized) dispatch(getRecsByTopic(topics))
  }, [dispatch, isFinalized, topics, waitOnTopicEffect])

  // Reset topic selections
  const resetTopics = () => {
    dispatch(reSelectTopics())
  }

  return isFinalized || recsByTopic.length ? (
    <SectionWrapper>
      <HomeTopicMixHeader
        sectionTitle="Recommended reads, just for you"
        sectionDescription="Stories to fuel your mind, curated for your interests"
        showReSelect={showReSelect}
        action={showReSelect ? resetTopics : false}
        actionCopy="Re-Select Topics"
      />

      <OffsetList
        items={recsByTopic}
        offset={0}
        count={6}
        showSkeleton={true}
        ItemCard={CardTopicRec}
        cardShape="block"
        showExcerpt={false}
        showTopicName={true}
        border={false}
      />
    </SectionWrapper>
  ) : null
}
