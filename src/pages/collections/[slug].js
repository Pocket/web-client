import { CollectionPage } from 'containers/collections/stories-page/stories-page'
import { getCollectionsSlugs } from 'common/api/queries/get-collections'
import { fetchCollectionBySlug } from 'containers/collections/stories-page/stories.state'
import { hydrateStoryPage } from 'containers/collections/stories-page/stories.state'
import { hydrateItems } from 'connectors/items/items-display.state'
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
  const { slugs = [] } = await getCollectionsSlugs()
  const paths = slugs.map((slug) => `/collections/${slug}`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps = wrapper.getStaticProps((store) => async ({ params, locale }) => {
  const { dispatch, sagaTask } = store
  const { slug } = params

  const defaultProps = {
    ...(await serverSideTranslations(locale, [...LOCALE_COMMON])),
    slug,
    locale
  }

  // Hydrating initial state with an async request. This will block the
  // page from loading. Do this for SEO/crawler purposes
  const response = await fetchCollectionBySlug({ slug })
  const { itemsById, storyIdsBySlug } = response || {}

  // No article found
  if (!itemsById) {
    return { props: { ...defaultProps, statusCode: 404 }, revalidate: 60 }
  }

  // Since ssr will not wait for side effects to resolve this dispatch needs to be pure
  dispatch(hydrateItems(itemsById))
  dispatch(hydrateStoryPage(storyIdsBySlug))

  // end the saga
  dispatch(END)
  await sagaTask.toPromise()

  // Revalidate means this can be regenerated once every X seconds
  return { props: defaultProps, revalidate: 60 }
})

export default CollectionPage
