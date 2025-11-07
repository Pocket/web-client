import Discover from 'containers/discover/discover'
import { hydrateDiscover } from 'containers/discover/discover.state'
import { fetchDiscoverData } from 'containers/discover/discover.state'
import { hydrateItems } from 'connectors/items/items-display.state'
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
  const response = await fetchDiscoverData({ locale })

  const { itemIds, itemsById } = response

  // Since ssr will not wait for side effects to resolve this dispatch
  // needs to be pure as well.
  dispatch(hydrateDiscover(itemIds))
  dispatch(hydrateItems(itemsById))

  // Revalidate means this can be regenerated once every X seconds
  return {
    props: { ...(await serverSideTranslations(locale, [...LOCALE_COMMON])), locale },
    revalidate: 60
  }
})

export default Discover
