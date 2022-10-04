import { useEffect } from 'react'
import { Card } from 'components/item-card/card'
import { CardNext } from 'components/item-card/card-next'
import { NextActions as NextActionsComponent } from 'components/item-actions/next'
import { listStrata, listStrataNext } from 'components/items-layout/list-strata'
import { SectionWrapper } from 'components/section-wrapper/section-wrapper'
import { getHomeContent } from './home-baseline.state'
import { useDispatch, useSelector } from 'react-redux'
import { HomeUnifiedHeader } from 'components/headers/home-header'
import { SaveToPocket } from 'components/item-actions/save-to-pocket'
import { itemActionStyle } from 'components/item-actions/base'
import { saveHomeItem, unSaveHomeItem } from 'containers/home/home-baseline.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'
import TopicsPillbox from 'components/topics-pillbox/topics-pillbox'
import { reSelectTopics } from 'containers/home/home-setup.state'

export const HomeContent = () => {
  const dispatch = useDispatch()
  const slates = useSelector((state) => state.homeUnified.slates)

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
  const slates = useSelector((state) => state.homeUnified.slates)
  const slate = useSelector((state) => state.homeUnified.slatesById[slateId])
  const featureState = useSelector((state) => state.features) || {}

  if (!slate) return null

  const { headline, subheadline, moreLink, recommendations, recommendationReasonType } = slate

  const recCount = slates.indexOf(slateId) === 0 ? 6 : 3
  const recsToShow = recommendations.slice(0, recCount)

  const showTopicSelector = recommendationReasonType === 'PREFERRED_TOPICS'

  const slateLink = showTopicSelector ? { text: 'Update your topics', url: false } : moreLink
  const cardNext = featureFlagActive({ flag: 'home.next', featureState })

  const urlTrack = () => {}
  const updateTopics = () => {
    dispatch(reSelectTopics())
    dispatch(sendSnowplowEvent('get-started.topic.reselect'))
  }
  const moreLinkClick = showTopicSelector ? updateTopics : urlTrack

  const cardGridStyle = cardNext ? listStrataNext : listStrata

  return (
    <SectionWrapper className="unifiedHome">
      <HomeUnifiedHeader
        headline={headline}
        subheadline={subheadline}
        moreLinkText={slateLink?.text}
        moreLinkUrl={slateLink?.url}
        moreLinkClick={moreLinkClick}
      />

      <div className={cardGridStyle}>
        {recsToShow.map((corpusId) => (
          <ItemCard key={corpusId} corpusId={corpusId} />
        ))}
      </div>
    </SectionWrapper>
  )
}

function ItemCard({ corpusId }) {
  const dispatch = useDispatch()
  const item = useSelector((state) => state.homeUnified.itemsById[corpusId])
  const featureState = useSelector((state) => state.features) || {}
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(corpusId))

  const cardNext = featureFlagActive({ flag: 'home.next', featureState })

  const CardToRender = cardNext ? CardNext : Card
  const ActionsToRender = cardNext ? NextActions : CardActions

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
    <CardToRender
      itemId={corpusId}
      externalUrl={url}
      title={title}
      itemImage={imageUrl}
      publisher={publisher}
      excerpt={excerpt}
      showExcerpt={true}
      authors={authors}
      // Open Actions
      openUrl={url}
      onOpen={onOpen}
      onOpenOriginalUrl={onOpenOriginalUrl}
      onItemInView={onItemInView}
      onImageFail={() => {}}
      topicName={topic}
      ActionMenu={ActionsToRender}
    />
  )
}

function CardActions({ id }) {
  const featureState = useSelector((state) => state.features) || {}
  const hideCopy = featureFlagActive({ flag: 'home.next', featureState })

  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.homeUnified.itemsById[id])
  if (!item) return null

  const { corpusItemId, url, saveStatus } = item
  const analyticsData = { corpusRecommendationId: corpusItemId, url }

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
    <SectionWrapper className="unifiedHome">
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

function NextActions({ id }) {
  const dispatch = useDispatch()

  const item = useSelector((state) => state.homeUnified.itemsById[id])
  if (!item) return null

  const { corpusItemId, url, saveStatus } = item
  const analyticsData = { corpusRecommendationId: corpusItemId, url }

  // Prep save action
  const onSave = () => {
    dispatch(sendSnowplowEvent('home.corpus.save', analyticsData))
    dispatch(saveHomeItem(id, url))
  }

  const onUnSave = () => {
    dispatch(sendSnowplowEvent('home.corpus.unsave', analyticsData))
    dispatch(unSaveHomeItem(id, url))
  }

  return <NextActionsComponent onSave={onSave} onUnsave={onUnSave} saveStatus={saveStatus} />
}