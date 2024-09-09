import Topic from 'containers/discover/topic/topic'
import { TOPICS_BY_NAME } from 'common/constants'
import { setActiveTopic } from 'connectors/topic-list/topic-list.state'
import { fetchTopicData } from 'containers/discover/topic/topic.state'
import { hydrateTopic } from 'containers/discover/topic/topic.state'
import { hydrateItems } from 'connectors/items/items-display.state'
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
  const topicsByName = TOPICS_BY_NAME
  const paths = Object.values(topicsByName).map((data) => `/discover/${data.topic_slug}`)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps = wrapper.getStaticProps((store) => async ({ params, locale }) => {
  const defaultProps = { ...(await serverSideTranslations(locale, [...LOCALE_COMMON])), locale }

  const { slug } = params

  if (slug === 'null') return { props: { ...defaultProps } }

  const { dispatch } = store

  const activeTopic = TOPICS_BY_NAME[slug]

  // Invalid Topic
  // ?? NOTE: We may need to adjust the revalidation on these errored responses
  // ?? Set at 5 minutes now to avoid crawlers crushing our servers
  if (!activeTopic) return { props: { ...defaultProps, statusCode: 404 }, revalidate: 300 }

  // Get topic info
  const { topic } = activeTopic

  // Get topic items from the correct endpoint
  // ?? NOTE: We may need to adjust the revalidation on these errored responses
  // ?? Set at 5 minutes now to avoid crawlers crushing our servers
  const response = await fetchTopicData(topic)
  if (!response) return { props: { ...defaultProps, statusCode: 500 }, revalidate: 300 }
  const { itemIds, itemsById } = response

  // Hydrate the items array
  dispatch(hydrateItems(itemsById))

  // Set the active topic
  dispatch(setActiveTopic(slug))

  // Hydrate the topic page item arrays
  dispatch(hydrateTopic({ topic: slug, itemIds }))

  // Revalidate means this can be regenerated once every X seconds
  return { props: defaultProps, revalidate: 60 }
})

export default Topic
