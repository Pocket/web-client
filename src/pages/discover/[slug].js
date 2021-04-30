import Topic from 'containers/topic/topic'
import { fetchTopicList } from 'connectors/topic-list/topic-list.state'
import { hydrateTopicList } from 'connectors/topic-list/topic-list.state'
import { fetchTopicData } from 'containers/topic/topic.state'
import { fetchSearchData } from 'containers/topic/topic.state'
import { hydrateTopic } from 'containers/topic/topic.state'
import { hydrateItems } from 'connectors/items-by-id/discover/items.state'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'

import { wrapper } from 'store'
/**
 * Server Side State Hydration
 * This is where we are defining initial state for this page.
 * Await on async calls here will block the page loading
 * until they are resolved, which is fine if we need the data for
 * SEO/Crawlers
  --------------------------------------------------------------- */
export const getStaticPaths = async () => {
  const topicsByName = await fetchTopicList(true)
  const paths = Object.values(topicsByName).map((data) => `/discover/${data.topic_slug}`)
  return { paths, fallback: false }
}

export const getStaticProps = wrapper.getStaticProps(async ({ store, params, locale }) => {
  const defaultProps = {
    ...(await serverSideTranslations(locale, [...LOCALE_COMMON])),
    revalidate: 60 // Revalidate means this can be regenerated once every X seconds
  }

  const { slug } = params

  if (slug === 'null') return { props: { ...defaultProps } }

  const { dispatch } = store

  // Hydrating initial state with an async request. This will block the
  // page from loading. Do this for SEO/crawler purposes
  const topicsByName = await fetchTopicList(true)
  const activeTopic = topicsByName[slug]

  // Invalid Topic
  if (!activeTopic) return { props: { ...defaultProps, statusCode: 404 } }

  // Get topic info
  const { topic } = activeTopic

  // Get topic items from the correct endpoint
  const response = await fetchTopicData(topic)
  if (!response) return { props: { ...defaultProps, statusCode: 500 } }

  const {
    curatedItems = [],
    algorithmicItems = [],
    curatedItemsById = {},
    algorithmicItemsById = {}
  } = response

  // Hydrate the items array
  dispatch(hydrateItems({ ...curatedItemsById, ...algorithmicItemsById }))

  // Hydrate the topic list state
  dispatch(hydrateTopicList({ activeTopic: slug, topicsByName }))

  // Hydrate the topic page item arrays
  dispatch(hydrateTopic({ topic: slug, data: { curatedItems, algorithmicItems } }))

  return { props: { ...defaultProps } }
})

export default Topic
