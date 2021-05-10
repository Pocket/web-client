import { CollectionPage } from 'containers/collections/collection-page'
import { fetchCollectionBySlug } from 'containers/collections/collections.state'
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
export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, query, res, req, locale }) => {
    const { dispatch, sagaTask } = store
    const { slug } = query

    // Hydrating initial state with an async request. This will block the
    // page from loading. Do this for SEO/crawler purposes
    const baseUrl = req.headers.host
    const { itemsById, collection } = await fetchCollectionBySlug({ slug, baseUrl })

    // No article found
    if (!collection || !itemsById) res.statusCode = 404

    // Since ssr will not wait for side effects to resolve this dispatch needs to be pure
    dispatch(hydrateCollections(collection))
    dispatch(hydrateItems(itemsById))

    // end the saga
    dispatch(END)
    await sagaTask.toPromise()

    return {
      props: { ...(await serverSideTranslations(locale, [...LOCALE_COMMON])), slug }
    }
  }
)

export default CollectionPage
