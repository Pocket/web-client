import { useEffect, useState } from 'react'
import { cx } from 'linaria'

import { ItemCard } from 'connectors/items/item-card-transitional'
import { standardGrid } from 'components/item/items-layout'
import { basicSlide } from 'components/item/items-layout'
import { SectionWrapper } from 'components/section-wrapper/section-wrapper'
import { getHomeContent } from './home.state'

import { useDispatch, useSelector } from 'react-redux'
import { HomeHeader } from 'components/headers/home-header'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'
import TopicsPillbox from 'components/topics-pillbox/topics-pillbox'
import { reSelectTopics } from 'containers/home/setup/setup.state'
import { ChevronLeftIcon } from 'components/icons/ChevronLeftIcon'
import { ChevronRightIcon } from 'components/icons/ChevronRightIcon'
import { useRouter } from 'node_modules/next/router'

export const HomeContent = () => {
  const { locale } = useRouter()
  const dispatch = useDispatch()
  const slates = useSelector((state) => state.pageHome.slates)

  const featureState = useSelector((state) => state.features) || {}
  const flagsReady = useSelector((state) => state.features.flagsReady)
  const localizedHome = featureFlagActive({ flag: 'home.locale', featureState })
  const localeToUse = localizedHome ? locale : 'en'
  const hideTopics = ['de', 'de-DE'].includes(locale)

  useEffect(() => {
    if (!flagsReady) return
    dispatch(getHomeContent(localeToUse))
  }, [dispatch, localeToUse, flagsReady])

  return (
    <>
      {slates.map((slateId, index) => (
        <Slate key={slateId} slateId={slateId} position={index} />
      ))}
      {hideTopics ? null : <ExploreMoreTopics />}
    </>
  )
}

function Slate({ slateId }) {
  const dispatch = useDispatch()
  const slates = useSelector((state) => state.pageHome.slates)
  const slate = useSelector((state) => state.pageHome.slatesById[slateId])
  const [slide, setSlide] = useState(false)

  if (!slate) return null

  const { headline, subheadline, moreLink, recommendations, recommendationReasonType } = slate

  const showTopicSelector = recommendationReasonType === 'PREFERRED_TOPICS'
  const showHits = recommendationReasonType === 'POCKET_HITS'
  const firstSlate = slates.indexOf(slateId) === 0
  const hitsCount = recommendations.length //>= 8 ? 8 : 4
  const recCount = showHits ? hitsCount : firstSlate ? 6 : 3
  const recsToShow = recommendations.slice(0, recCount)

  const slateLink = showTopicSelector ? { text: 'Update topics', url: false } : moreLink

  const urlTrack = (label) => {
    dispatch(sendSnowplowEvent('home.topic.view-more', { label }))
  }
  const updateTopics = () => {
    dispatch(reSelectTopics())
    dispatch(sendSnowplowEvent('get-started.topic.reselect'))
  }
  const moreLinkClick = showTopicSelector ? updateTopics : urlTrack

  const slideIn = () => {
    setSlide(true)
  }
  const slideOut = () => {
    setSlide(false)
  }

  return (
    <SectionWrapper className="homeSection">
      <HomeHeader
        headline={headline}
        subheadline={subheadline}
        moreLinkText={slateLink?.text}
        moreLinkUrl={slateLink?.url}
        moreLinkClick={moreLinkClick}
      />

      {showHits ? (
        <div className={cx(basicSlide, recCount <= 4 && 'no-slide')}>
          <div className="outer-slide">
            <div className={cx('inner-slide', slide && 'slide-active')}>{recsToShow.map(Card)}</div>
          </div>
          <div className="controls">
            <button className="text" onClick={slideOut}>
              <ChevronLeftIcon />
            </button>
            <button className="text" onClick={slideIn}>
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      ) : (
        <div className={standardGrid}>{recsToShow.map(Card)}</div>
      )}
    </SectionWrapper>
  )
}

function ExploreMoreTopics() {
  const dispatch = useDispatch()
  const topics = useSelector((state) => state.topicList?.topicsByName)

  const onTopicClick = (topic) => dispatch(sendSnowplowEvent('home.topic.click', { label: topic }))

  return (
    <SectionWrapper className="homeSection">
      <TopicsPillbox
        omitPromoted={true}
        id={'page-topics'}
        topicsMap={topics}
        className="homeSection"
        headingText="Discover More Topics"
        headingClassName="heading"
        onTopicClick={onTopicClick}
      />
    </SectionWrapper>
  )
}

// This is just a concenience method so we can keep grid declarations simple
function Card(id) {
  return <ItemCard key={id} id={id} />
}