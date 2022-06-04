import GetStarted from 'containers/get-started/get-started'

import { hydrateTopicSelectors } from 'containers/get-started/get-started.state'
import { fetchTopicSelectorList } from 'containers/get-started/get-started.state'

import { wrapper } from 'store'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'

/**
 * Server Side State Hydration
 * This is where we are defining initial state for this page.
 * Await on async calls here will block the page loading
 * until they are resolved, which is fine if we need the data for
 * SEO/Crawlers
  --------------------------------------------------------------- */
export const getStaticProps = wrapper.getStaticProps((store) => async ({ locale }) => {
  const { dispatch } = store

  // Hydrating initial state with an async request. This will block the
  // page from loading. Do this for SEO/crawler purposes
  const selectorResponse = await fetchTopicSelectorList({ locale })
  const { topicsSelectors } = selectorResponse

  // Since ssr will not wait for side effects to resolve this dispatch
  // needs to be pure as well.
  dispatch(hydrateTopicSelectors(topicsSelectors))

  // Revalidate means this can be regenerated once every X seconds
  return {
    props: { ...(await serverSideTranslations(locale, [...LOCALE_COMMON])), locale },
    revalidate: 60
  }
})

export default GetStarted
