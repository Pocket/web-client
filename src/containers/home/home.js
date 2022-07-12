import Layout from 'layouts/main'
import { useEffect } from 'react'
import { parseCookies } from 'nookies'
import { useDispatch, useSelector } from 'react-redux'
import { HomeGreeting } from 'containers/home/home-greeting'
import { HomeRecentSaves } from 'containers/home/home-recent-saves'

import { getHomeLineup } from 'containers/home/home.state'

import { CardLineup } from 'connectors/item-card/home/card-lineup'
import { HomeCollectionHeader } from 'components/headers/home-header'
import { HomeLineupHeader } from 'components/headers/home-header'
import { HomeTopicHeader } from 'components/headers/home-header'

import { HomeRecsByTopic } from 'containers/home/home-recs-by-topic'
import { Lockup } from 'components/items-layout/list-lockup'
import { OffsetList } from 'components/items-layout/list-offset'

import { TaggingModal } from 'connectors/confirm-tags/confirm-tags'
import { DeleteModal } from 'connectors/confirm-delete/confirm-delete'
import { ShareModal } from 'connectors/confirm-share/confirm-share'
import { ArchiveModal } from 'connectors/confirm-archive/confirm-archive'
import { FavoriteModal } from 'connectors/confirm-favorite/confirm-favorite'
import { Toasts } from 'connectors/toasts/toast-list'
import { SuccessFXA } from 'connectors/fxa-migration-success/success-fxa'
import { Onboarding } from 'connectors/onboarding/onboarding'

import { SectionWrapper } from 'components/section-wrapper/section-wrapper'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'

export const Home = ({ metaData }) => {
  const dispatch = useDispatch()

  const userStatus = useSelector((state) => state.user.user_status)
  const featureState = useSelector((state) => state.features) || {}
  const generalSlates = useSelector((state) => state.home.generalSlates)
  const topicSlates = useSelector((state) => state.home.topicSlates)
  const recsByTopic = useSelector((state) => state.home.recsByTopic) || []

  const fallback = '249850f0-61c0-46f9-a16a-f0553c222800'

  const lineupFlag = featureState['home.lineup']
  const lineupId = lineupFlag?.payload?.slateLineupId || fallback

  const { getStartedUserTopics } = parseCookies()
  const userTopics = getStartedUserTopics ? JSON.parse(getStartedUserTopics) : []

  const getStartedV1 = featureFlagActive({ flag: 'getstarted', featureState })
  const getStartedV2 = featureFlagActive({ flag: 'getstarted-v2', featureState })
  const inGetStartedTest = getStartedV1 || getStartedV2
  const shouldRenderTopicMix = inGetStartedTest && userTopics.length
  const renderLineup = shouldRenderTopicMix ? recsByTopic.length : true

  useEffect(() => {
    if (userStatus !== 'valid' || !lineupFlag) return
    dispatch(getHomeLineup(lineupId))
  }, [lineupFlag, lineupId, userStatus, dispatch])

  const flagsReady = featureState.flagsReady
  const shouldRender = userStatus !== 'pending' && flagsReady
  if (!shouldRender) return null

  const offset = generalSlates?.length || 0

  return (
    <Layout metaData={metaData} isFullWidthLayout={true} noContainer={true}>
      <SuccessFXA type="home" />
      <SectionWrapper>
        <HomeGreeting />
        <HomeRecentSaves />
      </SectionWrapper>

      {shouldRenderTopicMix ? <HomeRecsByTopic /> : null}

      {renderLineup
        ? generalSlates?.map((slateId, index) => (
            <Slate key={slateId} slateId={slateId} pagePosition={index} offset={0} />
          ))
        : null}

      {renderLineup
        ? topicSlates?.map((slateId, index) => (
            <Slate key={slateId} slateId={slateId} pagePosition={index} offset={offset} />
          ))
        : null}

      <DeleteModal />
      <TaggingModal />
      <ShareModal />
      <ArchiveModal />
      <FavoriteModal />
      {generalSlates || topicSlates ? (
        <>
          <Onboarding type="home.flyaway.save" />
          <Onboarding type="home.flyaway.my-list" />
        </>
      ) : null}
      <Toasts />
    </Layout>
  )
}

export const Slate = ({ slateId, pagePosition, offset }) => {
  const dispatch = useDispatch()

  const slate = useSelector((state) => state.home.slatesById[slateId])
  const recs = slate?.recommendations

  if (!slate) return null

  const position = offset + pagePosition
  const { displayName, description, topicSlug, type } = slate

  const recCounts = [5, 5, 3]
  const recCount = recCounts[position] || 5
  const recSlice = recs.slice(0, recCount)

  const layoutTypes = [Lockup, OffsetList, OffsetList, Lockup]
  const LayoutType = layoutTypes[position] || OffsetList

  const heroPositions = ['left', '', 'left', 'left']
  const heroPosition = heroPositions[position]

  const cardShapes = [undefined, 'wide', 'block']
  const cardShape = cardShapes[position]

  const headerTypes = {
    collection: HomeCollectionHeader,
    topic: HomeTopicHeader
  }

  const HomeHeader = headerTypes[type] || HomeLineupHeader

  const topicClickEvent =  () => dispatch(sendSnowplowEvent('home.topic.view-more', { label: topicSlug })) //prettier-ignore
  const collectionClickEvent = () => dispatch(sendSnowplowEvent('home.collection.view-more'))
  const onClickEvent = type === 'collection' ? collectionClickEvent : topicClickEvent

  return (
    <SectionWrapper>
      <HomeHeader
        sectionTitle={displayName}
        sectionDescription={description}
        topicSlug={topicSlug}
        onClickEvent={onClickEvent}
      />

      <LayoutType
        items={recSlice}
        offset={0}
        heroPosition={heroPosition}
        ItemCard={CardLineup}
        cardShape={cardShape}
        border={false}
      />
    </SectionWrapper>
  )
}
