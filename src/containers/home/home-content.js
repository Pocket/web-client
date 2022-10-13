import { useEffect } from 'react'
import { Card } from 'components/item-card/card'
import { listStrata } from 'components/items-layout/list-strata'
import { SectionWrapper } from 'components/section-wrapper/section-wrapper'
import { getHomeContent } from './home.state'
import { saveHomeItem, unSaveHomeItem } from 'containers/home/home.state'
import { useDispatch, useSelector } from 'react-redux'
import { HomeHeader } from 'components/headers/home-header'
import { SaveToPocket } from 'components/item-actions/save-to-pocket'
import { itemActionStyle } from 'components/item-actions/base'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'
import TopicsPillbox from 'components/topics-pillbox/topics-pillbox'
import { reSelectTopics } from 'containers/home/home-setup.state'

export const HomeContent = () => {
  const dispatch = useDispatch()
  const slates = useSelector((state) => state.home.slates)

  useEffect(() => {
    dispatch(getHomeContent())
  }, [dispatch])

  return (
    <>
      {slates.map((slateId) => (
        <Slate key={slateId} slateId={slateId} />
      ))}
      <ExploreMoreTopics />
    </>
  )
}

function Slate({ slateId }) {
  const dispatch = useDispatch()
  const slates = useSelector((state) => state.home.slates)
  const slate = useSelector((state) => state.home.slatesById[slateId])

  if (!slate) return null

  const { headline, subheadline, moreLink, recommendations, recommendationReasonType } = slate

  const recCount = slates.indexOf(slateId) === 0 ? 6 : 3
  const recsToShow = recommendations.slice(0, recCount)

  const showTopicSelector = recommendationReasonType === 'PREFERRED_TOPICS'

  const slateLink = showTopicSelector ? { text: 'Update topics', url: false } : moreLink

  const urlTrack = () => {}
  const updateTopics = () => {
    dispatch(reSelectTopics())
    dispatch(sendSnowplowEvent('get-started.topic.reselect'))
  }
  const moreLinkClick = showTopicSelector ? updateTopics : urlTrack

  return (
    <SectionWrapper className="unifiedHome">
      <HomeHeader
        headline={headline}
        subheadline={subheadline}
        moreLinkText={slateLink?.text}
        moreLinkUrl={slateLink?.url}
        moreLinkClick={moreLinkClick}
      />

      <div className={listStrata}>
        {recsToShow.map((corpusId) => (
          <ItemCard key={corpusId} corpusId={corpusId} />
        ))}
      </div>
    </SectionWrapper>
  )
}

function ItemCard({ corpusId }) {
  const dispatch = useDispatch()
  const item = useSelector((state) => state.home.itemsById[corpusId])
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(corpusId))

  if (!item) return null

  const { title, imageUrl, url, excerpt, publisher, topic, authors } = item

  const analyticsData = {
    corpusRecommendationId: corpusId,
    url,
    destination: 'external',
    ...item?.analyticsData
  }

  const onImpression = () => dispatch(sendSnowplowEvent('home.corpus.impression', analyticsData))
  const onItemInView = (inView) => (!impressionFired && inView ? onImpression() : null)

  const onOpenOriginalUrl = () => {
    const data = { ...analyticsData, destination: 'external' }
    dispatch(sendSnowplowEvent('home.corpus.view-original', data))
  }
  const onOpen = () => dispatch(sendSnowplowEvent('home.corpus.open', analyticsData))

  return (
    <Card
      itemId={corpusId}
      externalUrl={url}
      title={title}
      itemImage={imageUrl}
      publisher={publisher}
      excerpt={excerpt}
      showExcerpt={true}
      authors={null}
      className="homeCard"
      // Open Actions
      openUrl={url}
      onOpen={onOpen}
      onOpenOriginalUrl={onOpenOriginalUrl}
      onItemInView={onItemInView}
      onImageFail={() => {}}
      topicName={topic}
      ActionMenu={CardActions}
    />
  )
}

function CardActions({ id }) {
  const featureState = useSelector((state) => state.features) || {}
  const hideCopy = featureFlagActive({ flag: 'home.next', featureState })

  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.home.itemsById[id])
  if (!item) return null

  const { corpusRecommendationId, url, saveStatus } = item
  const analyticsData = { corpusRecommendationId, url }

  // Prep save action
  const onSave = () => {
    dispatch(sendSnowplowEvent('home.corpus.save', analyticsData))
    dispatch(saveHomeItem(id, url))
  }

  const onUnSave = () => {
    dispatch(sendSnowplowEvent('home.corpus.unsave', analyticsData))
    dispatch(unSaveHomeItem(id, url))
  }

  const saveAction = saveStatus === 'saved' ? onUnSave : onSave

  return (
    <div className={`${itemActionStyle} actions`}>
      <SaveToPocket
        allowRead={false}
        url={url}
        hideCopy={hideCopy}
        onOpen={() => {}}
        saveAction={saveAction}
        isAuthenticated={isAuthenticated}
        saveStatus={saveStatus}
        id={id}
      />
    </div>
  )
}

function ExploreMoreTopics() {
  const dispatch = useDispatch()
  const topics = useSelector((state) => state.topicList?.topicsByName)

  const onTopicClick = (topic) => dispatch(sendSnowplowEvent('home.topic.click', { label: topic }))

  return (
    <SectionWrapper className="homeTopics">
      <TopicsPillbox
        omitPromoted={true}
        id={'page-topics'}
        topicsMap={topics}
        className="homeTopics"
        headingText="Discover More Topics"
        headingClassName="heading"
        onTopicClick={onTopicClick}
      />
    </SectionWrapper>
  )
}
