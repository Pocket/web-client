// Libraries
// import queryString from 'query-string'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import * as Sentry from '@sentry/nextjs'
import Head from 'next/head'

// API
import { getUserInfo } from 'common/api/_legacy/user'
import { getUser } from 'common/api/internal/user'

// Dependencies
import ErrorPage from 'containers/_error/error'
import { graphErrorLog } from 'common/utilities/logging/log-graph-errors'
import { LOCALE_COMMON } from 'common/constants'

export default function Trailhead({ statusCode, ...props }) {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <ErrorPage statusCode={statusCode} {...props} />
    </>
  )
  /**
   * Do nothing here, this always ends in a redirect.
   * The only reason for this file is to do some server side processing
   * to determine destination
   **/
}

export async function getServerSideProps(ctx) {
  const { req, locale, query } = ctx //defaultLocale, locales
  try {
    /**
     * There is no guarantee that the referring source will include language pre-fix
     * If the first accrpt language header is non-english (default) and supported
     * We want to be able to prefix the destination with an explicit language code
     */
    // const lang = req.headers['accept-language']?.toString().substring(0, 2)
    // const supportedLocale = locales.includes(lang)
    // const langPrefix = lang !== defaultLocale && supportedLocale ? `/${lang}` : ''

    /**
     * Strip our unused query params that may contain sensitive data
     * IMPORTANT: These params are unreliable, and may or may not be present
     * depending on the referring source
     */
    const unusedQueryParams = ['access_token', 'id', 'guid', 'type', 'isSignUp']
    unusedQueryParams.forEach((param) => delete query[param])

    /**
     * There are two possible destinations from waypoint: Home / Saves
     * We create them this way to preserve non-sensitive query strings (like utm)
     * And make sure we are sending them to the proper langage
     */
    // const savesLink = queryString.stringifyUrl({ url: `${langPrefix}/saves`, query })
    // const homeLink = queryString.stringifyUrl({ url: `${langPrefix}/home`, query })

    /**
     * Legacy User
     * Based on the assumptions that http-only cookies will be present.
     * This method is inaccesible from localhost due to security conflicts
     */
    const response = await getUserInfo(true, req?.headers?.cookie)
    if (response.xError) throw new UserLegacyRequestError(response)
    const { birth } = response?.user || {}
    console.log(`Legacy: ${birth}`)

    /**
     * Graph User
     * This will require undetermined auth.  At present we could use an access_token
     * But we will need a reliable way to get one. This will all run through a client
     * API specific endpoint so we can manage auth either through auth_token upgrade, or
     * passed auth_token, or some other dark magic that has yet to be determined
     * Our current auth is multi-faceted and a bit of a quagmire
     */

    // Finding out what the accountCreationDate
    const { data, errors } = await getUser(req?.headers?.cookie)
    if (errors) throw new GraphError(errors)

    // Finding out what the accountCreationDate
    const { accountCreationDate } = data?.user || {}
    if (!accountCreationDate) throw new NoAccountCreationDateError()

    return {
      props: {
        ...(await serverSideTranslations(locale, [...LOCALE_COMMON])),
        statusCode: 'user',
        birth,
        accountCreationDate
      }
    }
  } catch (err) {
    if (err instanceof UserLegacyRequestError) {
      console.table([err.logMessage], ['xErrorCode', 'xError'])
    }

    if (err instanceof GraphError) {
      graphErrorLog(err.logMessage)
    }

    Sentry.captureMessage(err)

    return {
      props: {
        ...(await serverSideTranslations(locale, [...LOCALE_COMMON])),
        statusCode: 'impossible'
      }
    }
  }
}

/**
 * Errors 
 ----------------------------------------------------------------------------*/

class GraphError extends Error {
  constructor(message) {
    super(message)
    this.name = 'GraphError'
    this.logMessage = message
  }
}

class UserLegacyRequestError extends Error {
  constructor(message) {
    super(message)
    this.name = 'UserLegacyRequestError'
    this.logMessage = message
  }
}

class NoAccountCreationDateError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NoAccountCreationDateError'
  }
}
