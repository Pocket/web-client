import { SyndicatedArticle } from 'containers/syndicated-article/syndicated-article'
import { fetchHydrationData } from 'containers/syndicated-article/syndicated-article.state'
import { hydrateArticle } from 'containers/syndicated-article/syndicated-article.state'
import { END } from 'redux-saga'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'

import { wrapper } from 'store'

/**
 * Server Side State Hydration
 * This is where we are defining initial state for this page.
 * Await on async calls here will block the page loading
 * until they are resolved, which is fine if we need the data for
 * SEO/Crawlers
  --------------------------------------------------------------- */
export const getStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' }
}
export const getStaticProps = wrapper.getStaticProps((store) => async ({ params, locale }) => {
  const { dispatch, sagaTask } = store
  const { slug, ...queryParams } = params
  const defaultProps = {
    ...(await serverSideTranslations(locale, [...LOCALE_COMMON])),
    locale,
    queryParams
  }

  // Hydrating initial state with an async request. This will block the
  // page from loading. Do this for SEO/crawler purposes
  const response = await fetchHydrationData({ slug })

  // No article found — Check again in 12 hours minimum
  if (!response || !response?.content) {
    return { props: defaultProps, notFound: true, revalidate: 43200 }
  }

  if (response?.status === 'EXPIRED') {
    return {
      redirect: {
        destination: response.publisherUrl,
        statusCode: 302
      }
    }
  }

  // Since ssr will not wait for side effects to resolve this dispatch
  // needs to be pure as well.
  dispatch(hydrateArticle({ articleData: response }))

  // end the saga
  dispatch(END)
  await sagaTask.toPromise()

  // Return page, but revalidate at most, once a day
  return { props: defaultProps, revalidate: 86400 }
})

export default SyndicatedArticle
