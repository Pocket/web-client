import { useSelector } from 'react-redux'
import { HomeStandard } from 'containers/home/home-standard'
import { HomePersonalized } from 'containers/home/personalized/home-personalized'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'

export default function Home(props) {
  const { metaData = {} } = props

  const userStatus = useSelector((state) => state.user.user_status)
  const featureState = useSelector((state) => state.features)
  const flagsReady = featureState.flagsReady

  const shouldRender = userStatus !== 'pending' && flagsReady
  const showPersonalized = featureFlagActive({ flag: 'profiles.home', featureState })

  const showLanguages = featureFlagActive({ flag: 'app.language.selector', featureState })

  if (!shouldRender) return null

  return showPersonalized ? (
    <HomePersonalized metaData={metaData} showLanguages={showLanguages} />
  ) : (
    <HomeStandard metaData={metaData} showLanguages={showLanguages} />
  )
}
