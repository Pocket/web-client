import { useSelector } from 'react-redux'
import { HomePersonalized } from 'containers/home/personalized/home-personalized'

export default function Home(props) {
  const { metaData = {} } = props

  const userStatus = useSelector((state) => state.user.user_status)
  const featureState = useSelector((state) => state.features)
  const flagsReady = featureState.flagsReady

  const shouldRender = userStatus !== 'pending' && flagsReady

  if (!shouldRender) return null

  return <HomePersonalized metaData={metaData} />
}
