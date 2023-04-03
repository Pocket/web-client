import Layout from 'layouts/main'

import { useSelector } from 'react-redux'
import { HomeRecentSaves } from 'containers/home/recent-saves/recent-saves'
import { HomeContent } from './content'

import { SuccessFXA } from 'components/snackbar/success-fxa'
import { HomeSetup } from './setup/setup'

import { useRouter } from 'node_modules/next/router'
import { BannerGermanHome } from 'components/banner/german-home'
import { HomeGreeting } from './recent-saves/greeting'

export const Home = ({ metaData }) => {
  const { locale } = useRouter()
  const bannerLanguages = ['de', 'de-DE']
  const showBanner = bannerLanguages.includes(locale)

  const userStatus = useSelector((state) => state.user.user_status)
  const featureState = useSelector((state) => state.features) || {}

  const shouldRender = userStatus !== 'pending' && featureState.flagsReady
  if (!shouldRender) return null

  return (
    <Layout metaData={metaData} isFullWidthLayout={true} noContainer={true}>
      {showBanner ? <BannerGermanHome /> : null}
      <SuccessFXA type="home" />

      <HomeSetup />
      <HomeGreeting />
      <HomeRecentSaves />
      <HomeContent />
    </Layout>
  )
}
