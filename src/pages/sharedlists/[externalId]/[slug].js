import { PublicList } from 'containers/public-list/public-list'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'
import { wrapper } from 'store'
import { END } from 'redux-saga'
import { fetchPublicListHydrationData } from 'containers/public-list/public-list.state'
import { hydrateList } from 'containers/public-list/public-list.state'

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, locale }) => {
      const { dispatch, sagaTask } = store
      const { externalId, slug, ...queryParams } = query
      const defaultProps = {
        ...(await serverSideTranslations(locale, [...LOCALE_COMMON])),
        locale,
        slug,
        externalId,
        queryParams
      }

      // Hydrating initial state with an async request. This will block the
      // page from loading.
      const response = await fetchPublicListHydrationData({ slug, externalId })

      // No article found || Moderated and taken down
      if (!response || response?.moderationStatus === 'HIDDEN') {
        return { props: defaultProps, notFound: true }
      }

      // Since ssr will not wait for side effects to resolve this dispatch
      // needs to be pure as well.
      dispatch(hydrateList(response))

      // end the saga
      dispatch(END)
      await sagaTask.toPromise()

      return { props: defaultProps }
    }
)

export default PublicList
