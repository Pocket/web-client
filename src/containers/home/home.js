import Layout from 'layouts/main'

import { useSelector } from 'react-redux'
import { HomeRecentSaves } from 'containers/home/recent-saves/recent-saves'
import { HomeContent } from './content'

import { SuccessFXA } from 'components/snackbar/success-fxa'
import { HomeSetup } from './setup/setup'

export const Home = ({ metaData }) => {
  const userStatus = useSelector((state) => state.user.user_status)
  const featureState = useSelector((state) => state.features) || {}

  const shouldRender = userStatus !== 'pending' && featureState.flagsReady
  if (!shouldRender) return null

  return (
    <Layout metaData={metaData} isFullWidthLayout={true} noContainer={true}>
      <SuccessFXA type="home" />
      <HomeSetup />
      <HomeRecentSaves />
      <HomeContent />
    </Layout>
  )
}
