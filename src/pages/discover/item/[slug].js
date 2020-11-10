import SyndicatedArticle from 'containers/syndicated-article/syndicated-article'
import { fetchHydrationData } from 'containers/syndicated-article/syndicated-article.state'
import { hydrateArticle } from 'containers/syndicated-article/syndicated-article.state'
import { fetchTopicList } from 'connectors/topic-list/topic-list.state'
import { hydrateTopicList } from 'connectors/topic-list/topic-list.state'
import { wrapper } from 'store'
import { END } from 'redux-saga'

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, query, res, req }) => {
    const { dispatch, sagaTask } = store
    const { slug } = query

    // Hydrating initial state with an async request. This will block the
    // page from loading. Do this for SEO/crawler purposes
    const baseUrl = req.headers.host
    const response = await fetchHydrationData({ slug, baseUrl })
    const topicsByName = await fetchTopicList(true)

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

    // end the saga
    dispatch(END)
    await sagaTask.toPromise()

    return { props: {} }
  }
)

export default SyndicatedArticle
