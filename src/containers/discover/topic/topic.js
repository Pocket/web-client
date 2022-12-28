import Layout from 'layouts/main'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'

import ErrorPage from 'pages/_error'
import { ReportFeedbackModal } from 'connectors/confirm-report/confirm-report'
import { CallOutBuildHome } from 'components/call-out/call-out-build-home'

import { CollectionPageHeader } from 'components/headers/discover-header'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { ItemCard } from 'containers/discover/card'
import { Lockup } from 'components/items-layout/list-lockup'
import { OffsetList } from 'components/items-layout/list-offset'
import { CardTopicsNav } from 'connectors/topic-list/topic-list'
import { CardPageHeader } from 'components/headers/discover-header'
import { SectionHeader } from 'components/headers/section-header'

import { BASE_URL } from 'common/constants'

export default function Topic({ locale, statusCode = 500 }) {
  // Is user logged in?
  const isAuthenticated = useSelector((state) => state.user?.auth)
  const userStatus = useSelector((state) => state.user?.user_status)
  const shouldRender = userStatus !== 'pending'

  // Select state to use
  const topicList = useSelector((state) => state.topicList?.topicsByName)
  const activeTopic = useSelector((state) => state.topicList?.activeTopic)

  const searchItems = useSelector((state) => state.discoverTopic?.[activeTopic]?.searchItems) //prettier-ignore
  const curatedItems = useSelector((state) => state.discoverTopic?.[activeTopic]?.curatedItems) //prettier-ignore
  const algorithmicItems = useSelector((state) => state.discoverTopic?.[activeTopic]?.algorithmicItems) //prettier-ignore

  const topic = topicList[activeTopic] || activeTopic
  const title = topic?.display_name || topic
  const slug = topic?.topic_slug || topic

  // Error if no items are available
  if (!curatedItems?.length && !algorithmicItems?.length) {
    return <ErrorPage statusCode={statusCode} />
  }

  const RenderComponent = PageToRender(topic?.page_type)

  const languagePrefix = locale === 'en' ? '' : `/${locale}`
  const canonical = `${BASE_URL}${languagePrefix}/explore/${slug}`
  const url = canonical

  const topicMetaData = {
    url,
    description: topic?.social_description,
    image: topic?.social_image,
    title: topic?.social_title
  }

  return (
    <Layout title={`Pocket: ${title}`} metaData={topicMetaData} canonical={canonical}>
      {!isAuthenticated && shouldRender ? <CallOutBuildHome /> : null}

      <RenderComponent
        topic={topic}
        searchItems={searchItems}
        curatedItems={curatedItems}
        algorithmicItems={algorithmicItems}
      />
      <ReportFeedbackModal />
    </Layout>
  )
}

const PageToRender = (topicPage) => {
  switch (topicPage) {
    case 'editorial_collection': {
      return TopicCollection
    }
    case 'topic_page': {
      return TopicPage
    }
    default: {
      return ErrorPage
    }
  }
}

// STANDARD TOPIC PAGE
export function TopicPage({ curatedItems, algorithmicItems, topic }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  // Get topicList for sections that require it
  const topics = useSelector((state) => state.topicList?.topicsByName)

  const topicClickRail = (topic, index, id) => {
    dispatch(sendSnowplowEvent('topic-page.rail.topic.click', { label: topic }))
  }

  const topicClickBottom = (topic, index, id) => {
    dispatch(sendSnowplowEvent('topic-page.bottom.topic.click', { label: topic }))
  }

  return (
    <>
      <CardPageHeader title={topic.display_name} />

      <SectionHeader
        sectionTitle={t('discover:curated-by-our-editors', 'Curated by our editors')}
        sectionDescription={t('discover:stories-to-fuel-your-mind', 'Stories to fuel your mind')}
      />

      {/* Curated */}
      <Lockup items={curatedItems} offset={0} heroPosition="left" ItemCard={ItemCard} />

      <SectionHeader
        sectionTitle={t('discover:popular-with-readers', 'Popular with Pocket readers')}
        sectionDescription={t('discover:stories-from-the-web', 'Stories from across the web')}
        addPadding={true}
      />

      {/* Algorithmic */}
      <OffsetList items={algorithmicItems} offset={0} cardShape="wide" ItemCard={ItemCard}>
        <CardTopicsNav topics={topics} rail={true} track={topicClickRail} />
      </OffsetList>

      <OffsetList
        items={algorithmicItems}
        offset={5}
        count={15}
        cardShape="wide"
        ItemCard={ItemCard}
      />

      {/* Bottom TopicNav */}
      <CardTopicsNav topics={topics} className="no-border" track={topicClickBottom} />
    </>
  )
}

// SPECIAL TOPIC PAGE (NOT A REAL COLLECTION)
// This is an outdated concept of a `collection` and we should adjust it to be something less confusing
export function TopicCollection({ curatedItems, topic }) {
  const dispatch = useDispatch()
  // Get topicList for sections that require it
  const topics = useSelector((state) => state.topicList?.topicsByName)

  const topicClickRail = (topic, index, id) => {
    dispatch(sendSnowplowEvent('topic-collection.rail.topic.click', { label: topic }))
  }

  const topicClickBottom = (topic, index, id) => {
    dispatch(sendSnowplowEvent('topic-collection.bottom.topic.click', { label: topic }))
  }

  return (
    <>

      <CollectionPageHeader title={topic.display_name} note={topic.display_note} />

      <Lockup items={curatedItems} offset={0} heroPosition="left" ItemCard={ItemCard} />

      <OffsetList items={curatedItems} offset={5} cardShape="wide" ItemCard={ItemCard}>
        <CardTopicsNav topics={topics} rail={true} track={topicClickRail} />
      </OffsetList>

      <OffsetList items={curatedItems} offset={10} cardShape="wide" ItemCard={ItemCard} />
      <CardTopicsNav topics={topics} track={topicClickBottom} />
    </>
  )
}
