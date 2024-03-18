import Collections from 'containers/collections/collections'

import { fetchCollectionPageCount } from 'containers/collections/collections.state'
import { fetchCollections } from 'containers/collections/collections.state'
import { hydrateCollections } from 'containers/collections/collections.state'
import { hydrateItems } from 'connectors/items/items-display.state'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'
import { END } from 'redux-saga'
import { wrapper } from 'store'

export const getStaticPaths = async () => {
  //We are only gonna paginate items with the label `collections-homepage`
  const totalPages = await fetchCollectionPageCount('en', ['collections-homepage'])

  // We don't want the first page to be part of the pagination
  const pagesToPaginate = totalPages - 1

  // Create an array for use to map through and build an array of URLs
  const paths = Array(pagesToPaginate)
    .fill(0)
    .map((content, pageNumber) => `/collections/page/${pageNumber}`)
    .slice(1, -1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps = wrapper.getStaticProps((store) => async ({ params, locale }) => {
  const { dispatch, sagaTask } = store
  const { pagenumber: passedNumber } = params
  const pageNumber = parseInt(passedNumber, 10)

  const defaultProps = {
    ...(await serverSideTranslations(locale, [...LOCALE_COMMON])),
    locale,
    noIndex: true
  }

  // Hydrating initial state with an async request. This will block the
  // page from loading. Do this for SEO/crawler purposes
  const { itemsBySlug, itemSlugs, pagination } = await fetchCollections(
    'en',
    ['collections-homepage'],
    pageNumber
  )
  const { totalResults, perPage, currentPage } = pagination || 0

  // No article found
  if (!itemSlugs.length) return { props: defaultProps, notFound: true, revalidate: 60 }

  // Since ssr will not wait for side effects to resolve this dispatch needs to be pure
  dispatch(hydrateCollections(itemSlugs))
  dispatch(hydrateItems(itemsBySlug))

  // end the saga
  dispatch(END)
  await sagaTask.toPromise()

  // Revalidate means this can be regenerated once every X seconds
  return {
    props: {
      ...defaultProps,
      totalResults,
      perPage,
      currentPage
    },
    revalidate: 60
  }
})

export default Collections
