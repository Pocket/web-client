import { PublicList } from 'containers/public-list/public-list'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'
import { wrapper } from 'store'
import { END } from 'redux-saga'
import { fetchPublicListHydrationData } from 'containers/lists/lists.state'
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
      const { itemsById, errors } = response || {}

      if (errors) {
        // Moderated and taken down
        if (errors?.[0].extensions?.code === 'FORBIDDEN') {
          return { props: { ...defaultProps, statusCode: 'moderatedList' } }
        }

        // No article found
        return { props: defaultProps, notFound: true }
      }

      // Since ssr will not wait for side effects to resolve this dispatch
      // needs to be pure as well.
      dispatch(hydrateListItems(itemsById))

      // end the saga
      dispatch(END)
      await sagaTask.toPromise()

      return { props: defaultProps }
    }
)

export default PublicList
