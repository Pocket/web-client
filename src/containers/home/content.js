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

import { demoteHomeRec, promoteHomeRec } from './home.state'

import { useDispatch, useSelector } from 'react-redux'
import { HomeHeader } from 'components/headers/home-header'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import TopicsPillbox from 'components/topics-pillbox/topics-pillbox'
import { reSelectTopics } from 'containers/home/setup/setup.state'
import { ChevronLeftIcon } from 'components/icons/ChevronLeftIcon'
import { ChevronRightIcon } from 'components/icons/ChevronRightIcon'
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
    <SectionWrapper className="homeSection" data-cy={`home-section-${testId}`}>
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
      <SectionWrapper className="homeSection slideSection" data-cy={`home-section-${testId}`}>
        <HomeHeader
          headline={headline}
          subheadline={subheadline}
          moreLinkText={moreLink?.text}
          moreLinkUrl={moreLink?.url}
          moreLinkClick={moreLinkClick}
        />
        <div className={cx('controls', hideSlide && 'no-slide')}>
          <button className="text" onClick={slideOut} disabled={slideStart} data-cy="carousel-back">
            <ChevronLeftIcon />
          </button>
          <button className="text" onClick={slideIn} disabled={slideEnd} data-cy="carousel-forward">
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
    <SectionWrapper className="homeSection" data-cy="topic-selector">
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
  const dispatch = useDispatch()

  const onDemote = () => dispatch(demoteHomeRec(slateId, recId))
  const onPromote = () => dispatch(promoteHomeRec(slateId, recId))

  return (
    <ItemSignaled
      onDemote={onDemote}
      onPromote={onPromote}
      key={recId}
      id={recId}
      slateId={slateId}
      snowplowId="home.corpus"
    />
  )
}

function SlateEmpty() {
  return (
    <div className={emptySlate}>
      <div className="glyph">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 50 47">
          <g
            stroke="#000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="1.86535"
            clip-path="url(#a)">
            <path d="m45.0073 2.50543 2.2198 8.18887c2.2197 8.1889 2.4995 21.515 0 21.7948-2.4996.276-5.4132-2.3616-9.8565-9.1626-4.4433-6.8011-6.387-21.51498-6.387-21.51498L1 13.4737s4.62234 15.501 11.0541 22.1156c4.8126 4.9469 6.8719 7.4464 10.5802 9.4946.209.1156.4626.1343.6902.0597l7.8568-2.6936c1.552-.72 5.999-3.2158 7.4204-4.1709l8.6216-5.7863" />
            <path d="M37.5137 5.41895s3.0554 7.65535 4.8573 11.74055c1.8057 4.0851 2.4996 10.6101 2.4996 10.6101M7.80664 16.5974s1.2498 5.2043 6.52496 11.1735l7.495-4.2344s-2.6376-3.2606-4.3015-6.3161c-1.6676-3.0554-2.2197-4.3015-2.2197-4.3015l-7.49876 3.6785Zm13.05076-4.9289s3.3315-1.1117 5.9691-2.49955m-4.1683 6.79985 6.1072-2.2198m-4.3025 6.9651 5.693-2.1526M16.1367 31.6577s6.6631-2.6376 9.5767-3.8874c2.9137-1.2497 5.5513-3.1785 5.5513-3.1785m-11.6592 12.34s3.8873-1.2497 7.7038-3.4695 7.7039-4.1635 7.7039-4.1635" />
          </g>
          <defs>
            <clipPath id="a">
              <path fill="#fff" d="M0 0h50v47H0z" />
            </clipPath>
          </defs>
        </svg>
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
