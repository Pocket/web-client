import queryString from 'query-string'

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

    // query parameters returned after auth that are currently not used.
    // remove from the list of query parameters
    const unusedQueryParams = [
      'access_token',
      'id',
      'guid',
      'type',
      'skipUserCheck',
      'userStartDate'
    ]
    unusedQueryParams.forEach((param) => delete query[param])

    const savesLink = queryString.stringifyUrl({ url: `${langPrefix}/saves`, query })
    const homeLink = queryString.stringifyUrl({ url: `${langPrefix}/home`, query })
    const destination = homeEligible ? homeLink : savesLink

    return {
      redirect: {
        permanent: false,
        destination
      }
    }
  } catch {
    // Something went wrong while trying to sort the user out
    // so we are just gonna route them to `/saves` to avoid poor
    // user experience(seeing waypoint)
    return {
      redirect: {
        permanent: false,
        destination: '/saves'
      }
    }
  }
}
