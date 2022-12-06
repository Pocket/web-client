import { getUserInfo } from 'common/api/_legacy/user'
import { eligibleUser } from 'common/utilities/account/eligible-user'
import { START_DATE_FOR_HOME } from 'common/constants'
import queryString from 'query-string'
import * as Sentry from '@sentry/nextjs'

export default function Waypoint() {}

export async function getServerSideProps({ req, locale, query, defaultLocale, locales }) {
  try {
    // returns first two letters of browser defined language settings
    const lang = req.headers['accept-language']?.toString().substring(0, 2)
    const supportedLocale = locales.includes(lang)
    const langPrefix = lang !== defaultLocale && supportedLocale ? `/${lang}` : ''
    // const isSignUp = query['type'] === 'signup'
    const nonEnglish = locale !== defaultLocale || (lang !== defaultLocale && supportedLocale)

    // query parameters returned after auth that are currently not used.
    // remove from the list of query parameters
    const unusedQueryParams = ['access_token', 'id', 'guid', 'type']
    unusedQueryParams.forEach((param) => delete query[param])

    const savesLink = queryString.stringifyUrl({ url: `${langPrefix}/saves`, query })
    const homeLink = queryString.stringifyUrl({ url: '/home', query })

    const response = await getUserInfo(true, req?.headers?.cookie)
    const { user_id, birth } = response?.user || {}
    if (!user_id) throw new WaypointNoUserIdError()

    // Not logged in, or something else went awry?
    // !! NOTE: this will redirect to Saves 100% of the time on localhost
    if (!birth || nonEnglish) {
      return {
        redirect: {
          permanent: false,
          destination: savesLink
        }
      }
    }

    // EN users who signed up after 08-09-2021 will be assigned to 'home.release'
    // feature flag and therefore will be sent to Home after sign up
    const eligible = eligibleUser(birth, START_DATE_FOR_HOME)
    const destination = eligible ? homeLink : savesLink

    return {
      redirect: {
        permanent: false,
        destination
      }
    }
  } catch (err) {
    // Something went wrong while trying to sort the user out (flags, valid user, etc)
    // so we are just gonna route them to `/saves` to avoid poor user experience (seeing waypoint)
    Sentry.withScope((scope) => {
      scope.setTag('waypoint', 'fail over')
      scope.setFingerprint('Waypoint Error')
      Sentry.captureMessage(err)
    })
    return {
      redirect: {
        permanent: false,
        destination: '/saves'
      }
    }
  }
}

class WaypointNoUserIdError extends Error {
  constructor(message) {
    super(message)
    this.name = 'WaypointNoUserIdError'
  }
}
