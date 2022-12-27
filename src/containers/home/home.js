import Layout from 'layouts/main'

import { useSelector } from 'react-redux'
import { HomeGreeting } from 'containers/home/home-greeting'
import { HomeRecentSaves } from 'containers/home/home-recent-saves'

import { HomeContent } from './home-content'
import { Toasts } from 'connectors/toasts/toast-list'
import { SuccessFXA } from 'components/snackbar/success-fxa'

import { SectionWrapper } from 'components/section-wrapper/section-wrapper'
import { HomeSetup } from './home-setup'
import { HomeOnboarding } from './home-onboarding'

import { featureFlagActive } from 'connectors/feature-flags/feature-flags'

export const Home = ({ metaData }) => {
  const userStatus = useSelector((state) => state.user.user_status)
  const featureState = useSelector((state) => state.features) || {}
  const setupV4 = featureFlagActive({ flag: 'setup.moment.v4', featureState })

  const shouldRender = userStatus !== 'pending' && featureState.flagsReady
  if (!shouldRender) return null

  return (
    <Layout metaData={metaData} isFullWidthLayout={true} noContainer={true}>
      <SuccessFXA type="home" />
      <HomeSetup />
      {setupV4 ? <HomeOnboarding /> : null}

      <SectionWrapper>
        <HomeGreeting />
        <HomeRecentSaves />
      </SectionWrapper>

      <HomeContent />

      <Toasts />
    </Layout>
  )
}
