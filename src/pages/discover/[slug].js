import Topic from 'containers/topic/topic'
import { fetchTopicList } from 'connectors/topic-list/topic-list.state'
import { hydrateTopicList } from 'connectors/topic-list/topic-list.state'
import { fetchTopicData } from 'containers/topic/topic.state'
import { fetchSearchData } from 'containers/topic/topic.state'
import { hydrateTopic } from 'containers/topic/topic.state'
import { hydrateItems } from 'connectors/items/items.state'

/**
 * Server Side State Hydration
 * This is where we are defining initial state for this page.
 * Await on async calls here will block the page loading
 * until they are resolved, which is fine if we need the data for
 * SEO/Crawlers
  --------------------------------------------------------------- */
Topic.getInitialProps = async ({ store, query, res }) => {
  const { dispatch } = store
  const { slug } = query

  if (slug === 'null') return { namespacesRequired: ['common'] }

  // Hydrating initial state with an async request. This will block the
  // page from loading. Do this for SEO/crawler purposes
  const topicsByName = await fetchTopicList()

  // Invalid Topic
  const searchDefault = { topic: slug, page_type: 'search' }
  const activeTopic = topicsByName[slug] || searchDefault

  // Get topic info
  const { topic, page_type } = activeTopic
  const isCollection = page_type === 'editorial_collection'
  const allowedSearch = ['productivity', 'finance']
  const validSearchTopic = allowedSearch.includes(topic.toLowerCase())

  // We are not fully supporting search at the moment
  if (page_type === 'search' && !validSearchTopic) {
    res.append('X-Robots-Tag', 'none')
    res.statusCode = 404
    return { statusCode: 404 }
  }

  // Get topic items from the correct endpoint
  const response =
    page_type === 'search'
      ? await fetchSearchData(topic)
      : await fetchTopicData(topic, isCollection)

  if (!response) {
    res.statusCode = 500
    return { statusCode: 500 }
  }

  const {
    searchItems,
    curatedItems,
    algorithmicItems,
    searchItemsById,
    curatedItemsById,
    algorithmicItemsById
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
  dispatch(hydrateTopic({ searchItems, curatedItems, algorithmicItems }))

  return { namespacesRequired: ['common'] }
}

export default Topic
