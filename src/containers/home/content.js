import { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
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

import { useViewport } from 'components/viewport-provider/viewport-provider'

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
  const slates = useSelector((state) => state.pageHome.slates)
  const slate = useSelector((state) => state.pageHome.slatesById[slateId])
  if (!slate) return null

  const { recommendationReasonType } = slate
  const firstSlate = slates.indexOf(slateId) === 0
  const showHits = recommendationReasonType === 'POCKET_HITS'

  const SlateToRender = showHits ? SlideSlate : StaticSlate
  return <SlateToRender slateId={slateId} firstSlate={firstSlate} />
}

function StaticSlate({ slateId, firstSlate }) {
  const viewport = useViewport()
  const dispatch = useDispatch()
  const slate = useSelector((state) => state.pageHome.slatesById[slateId])
  const featureState = useSelector((state) => state.features) || {}
  const recentsTest = featureFlagActive({ flag: 'home.recents', featureState })

  const { headline, subheadline, moreLink, recommendations, recommendationReasonType } = slate

  const recCount = firstSlate ? 6 : viewport.width <= 959 ? 4 : 3
  const recsToShow = recommendations.slice(0, recCount)

  const showTopicSelector = recommendationReasonType === 'PREFERRED_TOPICS'
  const slateLink = showTopicSelector ? { text: 'Update topics', url: false } : moreLink

  const urlTrack = (label) => {
    dispatch(sendSnowplowEvent('home.topic.view-more', { label }))
  }

  const updateTopics = () => {
    dispatch(reSelectTopics())
    dispatch(sendSnowplowEvent('get-started.topic.reselect'))
  }

  const moreLinkClick = showTopicSelector ? updateTopics : urlTrack

  const testId = headline.toLowerCase().replaceAll(' ', '-')

  return (
    <SectionWrapper
      className={cx('homeSection', firstSlate && recentsTest && 'first-section')}
      data-cy={`home-section-${testId}`}>
      <HomeHeader
        headline={headline}
        subheadline={subheadline}
        moreLinkText={slateLink?.text}
        moreLinkUrl={slateLink?.url}
        moreLinkClick={moreLinkClick}
      />
      <div className={standardGrid}>{recsToShow.map(Card)}</div>
    </SectionWrapper>
  )
}

function SlideSlate({ slateId }) {
  const dispatch = useDispatch()
  const [slidePage, setSlidePage] = useState(0)
  const slate = useSelector((state) => state.pageHome.slatesById[slateId])

  const { headline, subheadline, moreLink, recommendations } = slate

  const viewport = useViewport()
  const itemsOnScreen = getItemsOnSceen(viewport.width)
  const recCount = recommendations.length
  const recsToShow = recommendations.slice(0, recCount)
  const hideSlide = recCount <= itemsOnScreen
  const totalPages = Math.ceil(recCount / itemsOnScreen)
  const transformPercentage = (slidePage / totalPages) * 100

  const transformStyle = {
    width: `${totalPages * 100}%`,
    gridTemplateColumns: `repeat(${totalPages * 12}, 1fr)`,
    transform: `translateX(-${transformPercentage}%)`
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => slideIn(),
    onSwipedRight: () => slideOut(),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: false
  })

  const slideIn = () => {
    setSlidePage(Math.min(totalPages - 1, slidePage + 1))
    dispatch(sendSnowplowEvent('home.hits.carousel-forward'))
  }
  const slideOut = () => {
    setSlidePage(Math.max(0, slidePage - 1))
    dispatch(sendSnowplowEvent('home.hits.carousel-back'))
  }

  const moreLinkClick = (label) => {
    dispatch(sendSnowplowEvent('home.topic.view-more', { label }))
  }

  const slideEnd = slidePage === totalPages - 1
  const slideStart = slidePage === 0

  useEffect(() => {
    setSlidePage(0)
  }, [totalPages])

  const testId = headline.toLowerCase().replaceAll(' ', '-')

  return (
    <>
      <SectionWrapper className="homeSection slideSection" data-cy={`home-section-${testId}`}>
        <HomeHeader
          headline={headline}
          subheadline={subheadline}
          moreLinkText={moreLink?.text}
          moreLinkUrl={moreLink?.url}
          moreLinkClick={moreLinkClick}
        />
        <div className={cx('controls', hideSlide && 'no-slide')}>
          <button className="text" onClick={slideOut} disabled={slideStart} data-cy='carousel-back'>
            <ChevronLeftIcon />
          </button>
          <button className="text" onClick={slideIn} disabled={slideEnd} data-cy='carousel-forward'>
            <ChevronRightIcon />
          </button>
        </div>
      </SectionWrapper>
      <div className={basicSlide} {...handlers}>
        <div className="outer-slide">
          <div className="inner-slide" style={transformStyle}>
            {recsToShow.map(Card)}
          </div>
        </div>
      </div>
    </>
  )
}

function ExploreMoreTopics() {
  const dispatch = useDispatch()
  const topics = useSelector((state) => state.topicList?.topicsByName)
  const headingText = 'Discover More Topics'
  const testId = `home-section-${headingText.toLowerCase().replaceAll(' ', '-')}`

  const onTopicClick = (topic) => dispatch(sendSnowplowEvent('home.topic.click', { label: topic }))


  return (
    <SectionWrapper className="homeSection" data-cy={testId}>
      <TopicsPillbox
        omitPromoted={true}
        id={'page-topics'}
        topicsMap={topics}
        className="homeSection"
        headingText={headingText}
        headingClassName="heading"
        onTopicClick={onTopicClick}
      />
    </SectionWrapper>
  )
}

// This is just a convenience method so we can keep grid declarations simple
function Card(id) {
  return <ItemCard key={id} id={id} snowplowId="home.corpus" />
}

function getItemsOnSceen(width) {
  if (width <= 599) return 1
  if (width <= 719) return 2
  if (width <= 1023) return 3
  return 4 // Everything
}
