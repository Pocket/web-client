import SyndicatedArticle from 'containers/syndicated-article/syndicated-article'
import { fetchHydrationData } from 'containers/syndicated-article/syndicated-article.state'
import { hydrateArticle } from 'containers/syndicated-article/syndicated-article.state'
import { fetchTopicList } from 'connectors/topic-list/topic-list.state'
import { hydrateTopicList } from 'connectors/topic-list/topic-list.state'

SyndicatedArticle.getInitialProps = async ({ store, query, res, req }) => {
  const { dispatch } = store
  const { slug } = query

  // Hydrating initial state with an async request. This will block the
  // page from loading. Do this for SEO/crawler purposes
  const baseUrl = req.headers.host
  const response = await fetchHydrationData({ slug, baseUrl })
  const topicsByName = await fetchTopicList()

  // No article found
  if (response.items?.length === 0) {
    res.statusCode = 404
  }

  if (response.items?.[0]?.status === 'EXPIRED') {
    res.writeHead(301, { Location: response.items[0].publisherUrl })
    res.end()
  }

  // Since ssr will not wait for side effects to resolve this dispatch
  // needs to be pure as well.
  dispatch(hydrateArticle({ articleData: response.items[0] }))
  dispatch(hydrateTopicList({ topicsByName }))

  return { queryParams: req.query, namespacesRequired: ['common'] }
}

export default SyndicatedArticle
