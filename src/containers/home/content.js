import { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { cx } from '@emotion/css'

import { ItemCard as ItemSignaled } from 'connectors/items/item-card-signaled'
import { ItemCard } from 'connectors/items/item-card-transitional'
import { standardGrid } from 'components/item/items-layout'
import { emptySlate } from 'components/item/items-layout'
import { basicSlide } from 'components/item/items-layout'
import { SectionWrapper } from 'components/section-wrapper/section-wrapper'
import { getHomeContent } from './home.state'

import { useDispatch, useSelector } from 'react-redux'
import { HomeHeader } from 'components/headers/home-header'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import TopicsPillbox from 'components/topics-pillbox/topics-pillbox'
import { reSelectTopics } from 'containers/home/setup/setup.state'
import { ChevronLeftIcon } from '@ui/icons/ChevronLeftIcon'
import { ChevronRightIcon } from '@ui/icons/ChevronRightIcon'
import { useRouter } from 'node_modules/next/router'

import { useViewport } from 'components/viewport-provider/viewport-provider'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'

export const HomeContent = () => {
  const { locale } = useRouter()
  const dispatch = useDispatch()
  const slates = useSelector((state) => state.pageHome.slates)
  const hideTopics = ['de', 'de-DE'].includes(locale)

  const featureState = useSelector((state) => state.features)
  const useSignaledCard = featureFlagActive({ flag: 'card.signals', featureState })

  const Card = useSignaledCard ? CardSignaled : CardTransitional

  useEffect(() => {
    dispatch(getHomeContent(locale))
  }, [dispatch, locale])

  return (
    <>
      {slates.map((slateId, index) => (
        <Slate key={slateId} slateId={slateId} position={index} Card={Card} />
      ))}
      {hideTopics ? null : <ExploreMoreTopics />}
    </>
  )
}

function Slate({ slateId, Card }) {
  const slates = useSelector((state) => state.pageHome.slates)
  const slate = useSelector((state) => state.pageHome.slatesById[slateId])
  if (!slate) return null

  const { recommendationReasonType } = slate
  const firstSlate = slates.indexOf(slateId) === 0
  const showHits = recommendationReasonType === 'POCKET_HITS'

  const SlateToRender = showHits ? SlideSlate : StaticSlate
  return <SlateToRender slateId={slateId} firstSlate={firstSlate} Card={Card} />
}

function StaticSlate({ slateId, firstSlate, Card }) {
  const viewport = useViewport()
  const dispatch = useDispatch()
  const slate = useSelector((state) => state.pageHome.slatesById[slateId])

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
    <SectionWrapper className="homeSection" data-testid={`home-section-${testId}`}>
      <HomeHeader
        headline={headline}
        subheadline={subheadline}
        moreLinkText={slateLink?.text}
        moreLinkUrl={slateLink?.url}
        moreLinkClick={moreLinkClick}
      />
      <div className={standardGrid}>
        {recsToShow.length ? (
          recsToShow.map((id) => <Card key={id} id={id} slateId={slateId} />)
        ) : (
          <SlateEmpty />
        )}
      </div>
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
      <SectionWrapper className="homeSection slideSection" data-testid={`home-section-${testId}`}>
        <HomeHeader
          headline={headline}
          subheadline={subheadline}
          moreLinkText={moreLink?.text}
          moreLinkUrl={moreLink?.url}
          moreLinkClick={moreLinkClick}
        />
        <div className={cx('controls', hideSlide && 'no-slide')}>
          <button
            className="text"
            onClick={slideOut}
            disabled={slideStart}
            data-testid="carousel-back">
            <ChevronLeftIcon />
          </button>
          <button
            className="text"
            onClick={slideIn}
            disabled={slideEnd}
            data-testid="carousel-forward">
            <ChevronRightIcon />
          </button>
        </div>
      </SectionWrapper>
      <div className={basicSlide} {...handlers}>
        <div className="outer-slide">
          <div className="inner-slide" style={transformStyle}>
            {recsToShow.map((id) => (
              <ItemCard key={id} id={id} slateId={slateId} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function ExploreMoreTopics() {
  const dispatch = useDispatch()
  const topics = useSelector((state) => state.topicList?.topicsByName)

  const onTopicClick = (topic) => dispatch(sendSnowplowEvent('home.topic.click', { label: topic }))

  return (
    <SectionWrapper className="homeSection" data-testid="topic-selector">
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

// This is just a convenience method so we can keep grid declarations simple
function CardTransitional({ id }) {
  return <ItemCard key={id} id={id} snowplowId="home.corpus" />
}

function CardSignaled({ slateId, id: recId }) {
  return <ItemSignaled key={recId} id={recId} slateId={slateId} snowplowId="home.corpus" />
}

function SlateEmpty() {
  return (
    <div className={emptySlate}>
      <div className="glyph">
        <EmptyGlyph />
      </div>
      <h4>You made it to the end of the internet!</h4>
      Just kidding. We’ll have some more great stories here for you soon.
    </div>
  )
}

function getItemsOnSceen(width) {
  if (width <= 599) return 1
  if (width <= 719) return 2
  if (width <= 1023) return 3
  return 4 // Everything
}

const EmptyGlyph = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 50 47">
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.865"
        clipPath="url(#a)">
        <path d="M45.007 2.505l2.22 8.19c2.22 8.188 2.5 21.514 0 21.794-2.5.276-5.413-2.361-9.856-9.162-4.444-6.802-6.387-21.515-6.387-21.515L1 13.474s4.622 15.5 11.054 22.115c4.813 4.947 6.872 7.447 10.58 9.495a.873.873 0 00.69.06l7.857-2.694c1.552-.72 6-3.216 7.42-4.17l8.622-5.787"></path>
        <path d="M37.514 5.419s3.055 7.655 4.857 11.74c1.806 4.086 2.5 10.61 2.5 10.61M7.807 16.598s1.25 5.205 6.525 11.174l7.495-4.234s-2.638-3.261-4.302-6.317c-1.667-3.055-2.22-4.301-2.22-4.301l-7.498 3.678zm13.05-4.929s3.332-1.111 5.97-2.499m-4.169 6.8l6.107-2.22m-4.302 6.965l5.693-2.152m-14.02 13.096s6.664-2.638 9.577-3.888c2.914-1.25 5.552-3.178 5.552-3.178m-11.66 12.34s3.888-1.25 7.704-3.47 7.704-4.163 7.704-4.163"></path>
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h50v47H0z"></path>
        </clipPath>
      </defs>
    </svg>
  )
}
