import Discover from 'containers/discover/discover'
import { hydrateDiscover } from 'containers/discover/discover.state'
import { fetchDiscoverData } from 'containers/discover/discover.state'
import { fetchTopicList } from 'connectors/topic-list/topic-list.state'
import { hydrateTopicList } from 'connectors/topic-list/topic-list.state'
import { hydrateItems } from 'connectors/items-by-id/discover/items.state'
import { wrapper } from 'store'

/**
 * Server Side State Hydration
 * This is where we are defining initial state for this page.
 * Await on async calls here will block the page loading
 * until they are resolved, which is fine if we need the data for
 * SEO/Crawlers
  --------------------------------------------------------------- */
export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  const { dispatch } = store

  // Hydrating initial state with an async request. This will block the
  // page from loading. Do this for SEO/crawler purposes
  const { items, itemsById } = await fetchDiscoverData()
  const topicsByName = await fetchTopicList()

  // Since ssr will not wait for side effects to resolve this dispatch
  // needs to be pure as well.
  dispatch(hydrateDiscover({ items }))
  dispatch(hydrateItems(itemsById))
  dispatch(hydrateTopicList({ topicsByName }))

  // Revalidate means this can be regenerated once every X seconds
  return { props: {}, revalidate: 60 }
})

export default Discover
