import * as Sentry from '@sentry/node'
import { getUserInfo } from 'common/api/user'
import { fetchUnleashData } from 'connectors/feature-flags/feature-flags.state'

export default function Waypoint() {}

export async function getServerSideProps({ req, locale }) {
  // Sentry.withScope((scope) => {
  //   scope.setTag('ssr', 'WayPoint')
  //   Object.keys(req.cookies).forEach((key) => {
  //     scope.setExtra(key, req.cookies[key])
  //   })
  //   scope.setLevel('info')
  //   Sentry.captureMessage('Waypoint: Request Cookies')
  // })

  const { sess_guid } = req.cookies
  const response = await getUserInfo(true, req?.headers?.cookie)
  // Not logged in, or something else went awry?
  // NOTE: this will redirect to my list 100% of the time on localhost
  const { user_id, birth } = response?.user || {}

  // Sentry.withScope((scope) => {
  //   scope.setTag('ssr', 'WayPoint')
  //   scope.setExtra('user', response)
  //   scope.setExtra('sessGuid', sess_guid)
  //   scope.setLevel('info')
  //   Sentry.captureMessage('Waypoint: User Response')
  // })

  if (!user_id || !birth || locale !== 'en') {
    return {
      redirect: {
        permanent: false,
        destination: '/my-list'
      }
    }
  }

  const eligibleDate = new Date('2021-03-22 19:30:00')
  const birthDate = new Date(birth)
  const eligibleForTest = eligibleDate - birthDate < 0

  if (!eligibleForTest) {
    return {
      redirect: {
        permanent: false,
        destination: '/my-list'
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
    : '/my-list'

  return {
    redirect: {
      permanent: false,
      destination
    }
  }
}
