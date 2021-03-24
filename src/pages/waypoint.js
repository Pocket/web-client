import * as Sentry from '@sentry/node'
import { getUserInfo } from 'common/api/user'
import { fetchUnleashData } from 'connectors/feature-flags/feature-flags.state'
import { HOME_TEST_START } from 'common/constants'
import queryString from 'query-string'

export default function Waypoint() {}

export async function getServerSideProps({ req, locale, query }) {
  const myListLink = queryString.stringifyUrl({ url: '/my-list', query })

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

  const eligibleDate = new Date(HOME_TEST_START)
  const birthDate = new Date(birth)
  const eligibleForTest = eligibleDate - birthDate < 0

  if (!eligibleForTest) {
    return {
      redirect: {
        permanent: false,
        destination: myListLink
      }
    }
  }

  // This sets up the home test. If a user is assigned to the test we send them
  // from waypoint to home.  Otherwise they get sent to my-list
  const features = await fetchUnleashData(user_id, sess_guid)
  Sentry.withScope((scope) => {
    scope.setTag('ssr', 'WayPoint')
    scope.setExtra('features', features)
    scope.setLevel('info')
    Sentry.captureMessage('Waypoint: Feature Response')
  })

  const destination = features['temp.web.client.home.new_user'].assigned
    ? '/home'
    : myListLink

  return {
    redirect: {
      permanent: false,
      destination
    }
  }
}
