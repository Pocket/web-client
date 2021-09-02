import Collections from 'containers/collections/collections'

import { fetchTopicList } from 'connectors/topic-list/topic-list.state'
import { fetchCollections } from 'containers/collections/collections.state'
import { hydrateTopicList } from 'connectors/topic-list/topic-list.state'
import { hydrateCollections } from 'containers/collections/collections.state'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'
import { END } from 'redux-saga'
import { wrapper } from 'store'

export const getStaticProps = wrapper.getStaticProps((store) => async ({ locale }) => {
  const { dispatch, sagaTask } = store

  const defaultProps = {
    ...(await serverSideTranslations(locale, [...LOCALE_COMMON])),
    locale
  }

  // Hydrating initial state with an async request. This will block the
  // page from loading. Do this for SEO/crawler purposes
  const collections = await fetchCollections(locale)
  const topicsByName = await fetchTopicList(true)

  // No article found
  if (!collections) return { props: { ...defaultProps, statusCode: 404 }, revalidate: 60 }

  // Since ssr will not wait for side effects to resolve this dispatch needs to be pure
  dispatch(hydrateTopicList({ topicsByName }))
  dispatch(hydrateCollections(collections))

  // end the saga
  dispatch(END)
  await sagaTask.toPromise()

  // Revalidate means this can be regenerated once every X seconds
  return { props: defaultProps, revalidate: 60 }
})

export default Collections
