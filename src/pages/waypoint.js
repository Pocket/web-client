import { getUserInfo } from 'common/api/user'
import { fetchUnleashData } from 'connectors/feature-flags/feature-flags.state'

export default function Waypoint() {}

export async function getServerSideProps({ res, req }) {
  const { sess_guid } = req.cookies
  const response = await getUserInfo(true)
  // Not logged in, or something else went awry?
  // NOTE: this will redirect to my list 100% of the time on localhost
  const { user_id } = response?.user_id || {}
  if (!user_id) {
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
