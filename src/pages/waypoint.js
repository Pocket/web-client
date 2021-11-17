import { getUserInfo } from 'common/api/user'
import { fetchUnleashData } from 'connectors/feature-flags/feature-flags.state'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'
import queryString from 'query-string'

export default function Waypoint() {}

export async function getServerSideProps({ req, locale, query, defaultLocale }) {
  const myListLink = queryString.stringifyUrl({ url: '/my-list', query })
  const homeLink = queryString.stringifyUrl({ url: '/home', query })

  // returns first two letters of browser defined language settings
  const lang = req.headers['accept-language'].toString().substring(0, 2)

  const { sess_guid } = req.cookies
  const response = await getUserInfo(true, req?.headers?.cookie)
  // Not logged in, or something else went awry?
  // NOTE: this will redirect to my list 100% of the time on localhost
  const { user_id, birth } = response?.user || {}

  // If there is no user ID, account birth date or if the users language preference
  // that they signed up with is not EN, send them to My List.
  // NOTE: We are currently not updating the locale to match the users
  // language preference, so they land on My List in English
  // and will have to use the language picker in the footer to update
  if (!user_id || !birth || locale !== defaultLocale || lang !== defaultLocale) {
    return {
      redirect: {
        permanent: false,
        destination: myListLink
      }
    }
  }

  // EN users who signed up after 08-09-2021 will be assigned to 'home.release'
  // feature flag and therefore will be sent to Home after sign up
  const featureState = await fetchUnleashData(user_id, sess_guid, birth)
  const homeRelease = featureFlagActive({ flag: 'home.release', featureState})
  const destination = homeRelease ? homeLink : myListLink

  return {
    redirect: {
      permanent: false,
      destination
    }
  }
}
