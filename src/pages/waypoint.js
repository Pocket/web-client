import { getUserInfo } from 'common/api/user'
import { fetchUnleashData } from 'connectors/feature-flags/feature-flags.state'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'
import queryString from 'query-string'

export default function Waypoint() {}

export async function getServerSideProps({ req, locale, query }) {
  const myListLink = queryString.stringifyUrl({ url: '/my-list', query })
  const homeLink = queryString.stringifyUrl({ url: '/home', query })

  const { sess_guid } = req.cookies
  const response = await getUserInfo(true, req?.headers?.cookie)
  // Not logged in, or something else went awry?
  // NOTE: this will redirect to my list 100% of the time on localhost
  const { user_id, birth } = response?.user || {}

  if (!user_id || !birth || locale !== 'en') {
    return {
      redirect: {
        permanent: false,
        destination: myListLink
      }
    }
  }

  const featureState = await fetchUnleashData(user_id, sess_guid, birth)
  const onboardingDev = featureFlagActive({ flag: 'onboarding.dev', featureState })
  const onboardingRelease = featureFlagActive({ flag: 'onboarding.release', featureState })
  const showOnboarding = onboardingDev || onboardingRelease
  const destination = showOnboarding ? homeLink : myListLink

  return {
    redirect: {
      permanent: false,
      destination
    }
  }
}
