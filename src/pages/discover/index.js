import Discover from 'containers/discover/discover'
import { hydrateDiscover } from 'containers/discover/discover.state'
import { fetchDiscoverData } from 'containers/discover/discover.state'
import { fetchTopicList } from 'connectors/topic-list/topic-list.state'
import { hydrateTopicList } from 'connectors/topic-list/topic-list.state'
import { hydrateItems } from 'connectors/discover-items/items.state'

/**
 * Server Side State Hydration
 * This is where we are defining initial state for this page.
 * Await on async calls here will block the page loading
 * until they are resolved, which is fine if we need the data for
 * SEO/Crawlers
  --------------------------------------------------------------- */
Discover.getInitialProps = async ({ store }) => {
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

  return { namespacesRequired: ['common'] }
}

export default Discover
