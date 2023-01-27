import Layout from 'layouts/main'

import { useSelector } from 'react-redux'
import { HomeGreeting } from 'containers/home/home-greeting'
import { HomeRecentSaves } from 'containers/home/home-recent-saves'
import { HomeContent } from './home-content'

import { SuccessFXA } from 'components/snackbar/success-fxa'
import { SectionWrapper } from 'components/section-wrapper/section-wrapper'
import { HomeSetup } from './home-setup'

export const Home = ({ metaData }) => {
  const userStatus = useSelector((state) => state.user.user_status)
  const featureState = useSelector((state) => state.features) || {}

  const shouldRender = userStatus !== 'pending' && featureState.flagsReady
  if (!shouldRender) return null

  return (
    <Layout metaData={metaData} isFullWidthLayout={true} noContainer={true}>
      <SuccessFXA type="home" />
      <HomeSetup />

      <SectionWrapper>
        <HomeGreeting />
        <HomeRecentSaves />
      </SectionWrapper>

      <HomeContent />
    </Layout>
  )
}
