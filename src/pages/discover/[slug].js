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
  const paths = Object.values(topicsByName).map(
    (data) => `/discover/${data.topic_slug}`
  )
  return { paths, fallback: false }
}

export const getStaticProps = wrapper.getStaticProps(
  async ({ store, params, locale }) => {
    const { slug } = params

    if (slug === 'null') return { props: { namespacesRequired: ['common'] } }

    const { dispatch } = store

    // Hydrating initial state with an async request. This will block the
    // page from loading. Do this for SEO/crawler purposes
    const topicsByName = await fetchTopicList(true)

    // Invalid Topic
    const searchDefault = { topic: slug, page_type: 'search' }
    const activeTopic = topicsByName[slug] || searchDefault

    // Get topic info
    const { topic, page_type } = activeTopic
    const isCollection = page_type === 'editorial_collection'

    // We are not fully supporting search at the moment
    if (page_type === 'search') {
      return { props: { statusCode: 404 } }
    }

    // Get topic items from the correct endpoint
    const response =
      page_type === 'search'
        ? await fetchSearchData(topic)
        : await fetchTopicData(topic, isCollection)

    if (!response) {
      return { props: { statusCode: 500 } }
    }

    const {
      searchItems = [],
      curatedItems = [],
      algorithmicItems = [],
      searchItemsById = {},
      curatedItemsById = {},
      algorithmicItemsById = {}
    } = response

    // Hydrate the items array
    dispatch(
      hydrateItems({
        ...searchItemsById,
        ...curatedItemsById,
        ...algorithmicItemsById
      })
    )

    // Hydrate the topic list state
    dispatch(hydrateTopicList({ activeTopic: slug, topicsByName }))

    // Hydrate the topic page item arrays
    dispatch(
      hydrateTopic({
        topic: slug,
        data: { searchItems, curatedItems, algorithmicItems }
      })
    )

    // Revalidate means this can be regenerated once every X seconds
    return {
      props: {
        ...(await serverSideTranslations(locale, [...LOCALE_COMMON])),
        revalidate: 60
      }
    }
  }
)

export default Topic
