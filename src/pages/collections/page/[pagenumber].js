import Collections from 'containers/collections/collections'

import { fetchCollections } from 'containers/collections/collections.state'
import { fetchCollectionsMeta } from 'containers/collections/collections.state'
import { hydrateCollections } from 'containers/collections/collections.state'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'
import { END } from 'redux-saga'
import { wrapper } from 'store'

export const getStaticPaths = async ({ locale }) => {
  const { pagination } = await fetchCollections({ locale })
  const { totalPages } = pagination || 0
  const paths = Array(totalPages)
    .fill(0)
    .map((content, pageNumber) => `/collections/page/${pageNumber}`)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps = wrapper.getStaticProps((store) => async ({ params, locale }) => {
  const { dispatch, sagaTask } = store
  const { pagenumber } = params

  const defaultProps = {
    ...(await serverSideTranslations(locale, [...LOCALE_COMMON])),
    pagenumber,
    locale
  }

  // Hydrating initial state with an async request. This will block the
  // page from loading. Do this for SEO/crawler purposes
  const { collections, pagination } = await fetchCollections({ pagenumber, locale })
  const { totalPages } = pagination || 0
  const collectionsMeta = await fetchCollectionsMeta({ totalPages, locale })

  // No article found
  if (!collections) return { props: { ...defaultProps, statusCode: 404 }, revalidate: 60 }

  // Since ssr will not wait for side effects to resolve this dispatch needs to be pure
  dispatch(hydrateCollections({ collections, pagination, collectionsMeta }))

  // end the saga
  dispatch(END)
  await sagaTask.toPromise()

  // Revalidate means this can be regenerated once every X seconds
  return { props: defaultProps, revalidate: 60 }
})

export default Collections
