import { getUser } from 'common/api/internal/user'
import { eligibleUser } from 'common/utilities/account/eligible-user'
import { START_DATE_FOR_HOME } from 'common/constants'
import { START_DATE_FOR_GERMAN_HOME } from 'common/constants'
import { graphErrorLog } from 'common/utilities/logging/log-graph-errors'
import queryString from 'query-string'
import * as Sentry from '@sentry/nextjs'

export default function Waypoint() {
  /**
   * Do nothing here, this always ends in a redirect.
   * The only reason for this file is to do some server side processing
   * to determine destination
   **/
}

export async function getServerSideProps({ req, locale, query, defaultLocale, locales }) {
  try {
    // returns first two letters of browser defined language settings
    const lang = req.headers['accept-language']?.toString().substring(0, 2)
    const supportedLocale = locales.includes(lang)
    const langPrefix = lang !== defaultLocale && supportedLocale ? `/${lang}` : ''
    // const isSignUp = query['type'] === 'signup'
    const nonEnglish = locale !== defaultLocale || (lang !== defaultLocale && supportedLocale)
    const isGerman = ['de', 'de-DE'].includes(locale) || ['de', 'de-DE'].includes(lang)
    const homeEligible = isGerman || !nonEnglish

    // This is passed in from login (the only time we really send people to waypoint)
    const { access_token } = query
    if (!access_token) throw new MissingTokenError()

    // query parameters returned after auth that are currently not used.
    // remove from the list of query parameters
    const unusedQueryParams = ['access_token', 'id', 'guid', 'type']
    unusedQueryParams.forEach((param) => delete query[param])

    // Define some links where the user may end up depending on conditions
    const savesLink = queryString.stringifyUrl({ url: `${langPrefix}/saves`, query })
    const homeLink = queryString.stringifyUrl({ url: `${langPrefix}/home`, query })

    // Get the user (this goes through the client api proxy)
    const { data, errors } = await getUser(access_token)

    // Did the graph return errors without any data? IE no partial response
    if (errors && !data) throw new GraphError(errors)

    // Finding out what the accountCreationDate
    const { accountCreationDate } = data?.user || {}
    if (!accountCreationDate) throw new WaypointNoAccountCreationDate()

    // Send to saves if user is not eligible for home as a starting locations (Not German/English)
    if (!homeEligible) {
      return {
        redirect: {
          permanent: false,
          destination: savesLink
        }
      }
    }

    // EN users who signed up after 08-09-2021 will be assigned to 'home.release'
    // feature flag and therefore will be sent to Home after sign up
    const eligible = eligibleUser(accountCreationDate, START_DATE_FOR_HOME)
    const eligibleGerman = eligibleUser(accountCreationDate, START_DATE_FOR_GERMAN_HOME) && isGerman
    const destination = eligible || eligibleGerman ? homeLink : savesLink

    return {
      redirect: {
        permanent: false,
        destination
      }
    }
  } catch (error) {
    // Something went wrong while trying to sort the user out (flags, valid user, etc)
    // so we are just gonna route them to `/saves` to avoid poor user experience (seeing waypoint)

    // Log it to sentry so we get some signal as to why this isn't firing
    Sentry.captureMessage(error)

    // Let's log something readable out to the server console
    if (error.name === 'GraphError') graphErrorLog(error)

    return {
      redirect: {
        permanent: false,
        destination: '/saves'
      }
    }
  }
}

class GraphError extends Error {
  constructor(message) {
    super(message)
    this.name = 'GraphError'
    this.message = message
  }
}

class MissingTokenError extends Error {
  constructor(message) {
    super(message)
    this.name = 'MissingTokenError'
    this.message = message
  }
}

class WaypointNoAccountCreationDate extends Error {
  constructor(message) {
    super(message)
    this.name = 'WaypointNoAccountCreationDate'
  }
}
