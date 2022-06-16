import { getUserInfo } from 'common/api/_legacy/user'
import { fetchUnleashData } from 'connectors/feature-flags/feature-flags.state'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'
import queryString from 'query-string'
import * as Sentry from '@sentry/nextjs'

export default function Waypoint() {}

export async function getServerSideProps({ req, locale, query, defaultLocale, locales }) {
  try {
    // returns first two letters of browser defined language settings
    const lang = req.headers['accept-language'].toString().substring(0, 2)
    const supportedLocale = locales.includes(lang)
    const langPrefix = lang !== defaultLocale && supportedLocale ? `/${lang}` : ''
    const isSignUp = query['type'] === 'signup'
    const nonEnglish = locale !== defaultLocale ||
      (lang !== defaultLocale && supportedLocale)

    // query parameters returned after auth that are currently not used.
    // remove from the list of query parameters
    const unusedQueryParams = ['access_token', 'id', 'guid', 'type']
    unusedQueryParams.forEach((param) => delete query[param])

    const myListLink = queryString.stringifyUrl({ url: `${langPrefix}/my-list`, query })
    const homeLink = queryString.stringifyUrl({ url: '/home', query })
    const getStartedLink = queryString.stringifyUrl({ url: '/get-started', query })

    if (isSignUp && nonEnglish) {
      return {
        redirect: {
          permanent: false,
          destination: getStartedLink
        }
      }
    }

    const { sess_guid } = req.cookies
    const response = await getUserInfo(true, req?.headers?.cookie)
    // Not logged in, or something else went awry?
    // NOTE: this will redirect to my list 100% of the time on localhost
    const { user_id, birth } = response?.user || {}

    if (
      !user_id ||
      !birth ||
      nonEnglish
    ) {
      return {
        redirect: {
          permanent: false,
          destination: myListLink
        }
      }
    }

    // EN users who signed up after 08-09-2021 will be assigned to 'home.release'
    // feature flag and therefore will be sent to Home after sign up
    const featureState = await fetchUnleashData(user_id, sess_guid, birth, lang)
    const homeRelease = featureFlagActive({ flag: 'home.release', featureState })
    const destination = homeRelease ? homeLink : myListLink

    return {
      redirect: {
        permanent: false,
        destination
      }
    }
  } catch (err) {
    // Something went wrong while trying to sort the user out (flags, valid user, etc)
    // so we are just gonna route them to `/my-list` to avoid poor user experience (seeing waypoint)
    Sentry.withScope((scope) => {
      scope.setTag('waypoint', 'fail over')
      scope.setFingerprint('Waypoint Error')
      Sentry.captureMessage(err)
    })
    return {
      redirect: {
        permanent: false,
        destination: '/my-list'
      }
    }
  }
}
