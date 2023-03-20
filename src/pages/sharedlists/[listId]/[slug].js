import { PublicList } from 'containers/public-list/public-list'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'
import { wrapper } from 'store'
import { END } from 'redux-saga'
import { fetchPublicListHydrationData } from 'containers/public-list/public-list.state'
import { hydrateList } from 'containers/public-list/public-list.state'
import { hydrateListItems } from 'connectors/lists/lists-display.state'

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, locale }) => {
      const { dispatch, sagaTask } = store
      const { listId, slug, ...queryParams } = query
      const defaultProps = {
        ...(await serverSideTranslations(locale, [...LOCALE_COMMON])),
        locale,
        slug,
        listId,
        queryParams
      }

      // Hydrating initial state with an async request. This will block the
      // page from loading.
      const response = await fetchPublicListHydrationData({ slug, listId })
      const { itemsById, publicListInfo } = response || {}

      // No article found
      if (!publicListInfo) {
        return { props: defaultProps, notFound: true }
      }

      // Moderated and taken down
      if (publicListInfo?.moderationStatus === 'HIDDEN') {
        return { props: { ...defaultProps, statusCode: 403 } }
      }

      // Since ssr will not wait for side effects to resolve this dispatch
      // needs to be pure as well.
      dispatch(hydrateList(publicListInfo))
      dispatch(hydrateListItems(itemsById))

      // end the saga
      dispatch(END)
      await sagaTask.toPromise()

      return { props: defaultProps }
    }
)

export default PublicList
