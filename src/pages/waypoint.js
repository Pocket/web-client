import { getUserInfo } from 'common/api/user'
import { fetchUnleashData } from 'connectors/feature-flags/feature-flags.state'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'
import queryString from 'query-string'

export default function Waypoint() {}

export async function getServerSideProps({ req, locale, query, defaultLocale, locales }) {
  // returns first two letters of browser defined language settings
  const lang = req.headers['accept-language'].toString().substring(0, 2)
  const supportedLocale = locales.includes(lang)
  const langPrefix = lang !== defaultLocale && supportedLocale ? `/${lang}` : ''
  const authToken = query?.access_token || false
  delete query.access_token

  const myListLink = queryString.stringifyUrl({ url: `${langPrefix}/my-list`, query })
  const homeLink = queryString.stringifyUrl({ url: '/home', query })

  const { sess_guid } = req.cookies
  const response = await getUserInfo(true, req?.headers?.cookie)
  // Not logged in, or something else went awry?
  // NOTE: this will redirect to my list 100% of the time on localhost
  const { user_id, birth } = response?.user || {}

  if (!user_id || !birth || locale !== defaultLocale || lang !== defaultLocale && supportedLocale) {
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
}
