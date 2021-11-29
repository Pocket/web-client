import Collections from 'containers/collections/collections'

import { fetchCollections } from 'containers/collections/collections.state'
import { hydrateCollections } from 'containers/collections/collections.state'
import { fetchArrayOfCollectionSlugs } from 'containers/collections/collections.state'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'
import { END } from 'redux-saga'
import { wrapper } from 'store'

export const getStaticProps = wrapper.getStaticProps((store) => async ({ locale }) => {
  const { dispatch, sagaTask } = store

  const defaultProps = {
    ...(await serverSideTranslations(locale, [...LOCALE_COMMON])),
    locale
  }

  // Hydrating initial state with an async request. This will block the
  // page from loading. Do this for SEO/crawler purposes
  const collections = await fetchCollections(locale)

  // !! TEMPORARILY SUPERSEDE THE HERO WITH SPECIFIC COLLECTIONS
  const heroCollectionSlugs = [
    'pockets-best-of-2021',
    'mood-of-the-year-languishing',
    'what-we-learned-in-2021',
    '12-stories-that-defined-2021',
    'the-top-feel-good-stories-of-2021'
  ]
  const heroCollections = await fetchArrayOfCollectionSlugs(heroCollectionSlugs)

  //De-Duplicate the collections
  heroCollectionSlugs.forEach((key) => delete collections[key])

  // No article found
  if (!collections) return { props: { ...defaultProps, statusCode: 404 }, revalidate: 60 }

  // Since ssr will not wait for side effects to resolve this dispatch needs to be pure
  dispatch(hydrateCollections({ ...heroCollections, ...collections }))

  // end the saga
  dispatch(END)
  await sagaTask.toPromise()

  // Revalidate means this can be regenerated once every X seconds
  return { props: defaultProps, revalidate: 60 }
})

export default Collections
