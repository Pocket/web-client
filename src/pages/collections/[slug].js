import { CollectionPage } from 'containers/collections/collection-page'
import { fetchCollections } from 'containers/collections/collections.state'
import { fetchCollectionBySlug } from 'containers/collections/collections.state'
import { fetchTopicList } from 'connectors/topic-list/topic-list.state'
import { hydrateTopicList } from 'connectors/topic-list/topic-list.state'

import { hydrateCollections } from 'containers/collections/collections.state'
import { hydrateItems } from 'connectors/items-by-id/collection/items.state'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'
import { END } from 'redux-saga'
import { wrapper } from 'store'

/**
 * Server Side State Hydration
 * This is where we are defining initial state for this page.
 * Await on async calls here will block the page loading
 * until they are resolved, which is fine if we need the data for
 * SEO/Crawlers
  --------------------------------------------------------------- */
export const getStaticPaths = async () => {
  const collections = await fetchCollections()
  const paths = Object.keys(collections).map((collection) => `/collections/${collection.slug}`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps = wrapper.getStaticProps(async ({ store, params, locale }) => {
  const { dispatch, sagaTask } = store
  const { slug } = params

  const defaultProps = {
    ...(await serverSideTranslations(locale, [...LOCALE_COMMON])),
    slug,
    revalidate: 60 // Revalidate means this can be regenerated once every X seconds
  }

  // Hydrating initial state with an async request. This will block the
  // page from loading. Do this for SEO/crawler purposes
  const { stories, collection } = await fetchCollectionBySlug({ slug })
  const topicsByName = await fetchTopicList(true)

  // No article found
  if (!collection || !stories) return { props: { ...defaultProps, statusCode: 404 } }

  // Since ssr will not wait for side effects to resolve this dispatch needs to be pure
  dispatch(hydrateTopicList({ topicsByName }))
  dispatch(hydrateCollections(collection))
  dispatch(hydrateItems(stories))

  // end the saga
  dispatch(END)
  await sagaTask.toPromise()

  return {
    props: defaultProps
  }
})

export default CollectionPage
