import { SyndicatedArticle } from 'containers/syndicated-article/syndicated-article'
import { fetchHydrationData } from 'containers/syndicated-article/syndicated-article.state'
import { hydrateArticle } from 'containers/syndicated-article/syndicated-article.state'
import { wrapper } from 'store'
import { END } from 'redux-saga'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, res, req, locale }) => {
      const { dispatch, sagaTask } = store
      const { slug, ...queryParams } = query
      const defaultProps = {
        ...(await serverSideTranslations(locale, [...LOCALE_COMMON])),
        locale,
        queryParams
      }

      // Hydrating initial state with an async request. This will block the
      // page from loading. Do this for SEO/crawler purposes
      const baseUrl = req.headers.host
      const response = await fetchHydrationData({ slug, baseUrl })

      // No article found
      if (!response || !response?.content) {
        return { props: defaultProps, notFound: true }
      }

      if (response?.status === 'EXPIRED') {
        res.writeHead(302, { Location: response.publisherUrl })
        res.end()
      }

      // Since ssr will not wait for side effects to resolve this dispatch
      // needs to be pure as well.
      dispatch(hydrateArticle({ articleData: response }))

      // end the saga
      dispatch(END)
      await sagaTask.toPromise()

      return { props: defaultProps }
    }
)

export default SyndicatedArticle
