import Layout from 'layouts/main'

import { useSelector } from 'react-redux'
import { HomeGreeting } from 'containers/home/home-greeting'
import { HomeRecentSaves } from 'containers/home/home-recent-saves'

import { LegacyHome } from './home-legacy'
import { HomeContent } from './home-baseline'

import { TaggingModal } from 'connectors/confirm-tags/confirm-tags'
import { DeleteModal } from 'connectors/confirm-delete/confirm-delete'
import { ShareModal } from 'connectors/confirm-share/confirm-share'
import { ArchiveModal } from 'connectors/confirm-archive/confirm-archive'
import { FavoriteModal } from 'connectors/confirm-favorite/confirm-favorite'
import { Toasts } from 'connectors/toasts/toast-list'
import { SuccessFXA } from 'connectors/fxa-migration-success/success-fxa'
import { Onboarding } from 'connectors/onboarding/onboarding'

import { SectionWrapper } from 'components/section-wrapper/section-wrapper'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'
import { HomeSetup } from './home-setup'

export const Home = ({ metaData }) => {
  const userStatus = useSelector((state) => state.user.user_status)
  const featureState = useSelector((state) => state.features) || {}
  const generalSlates = useSelector((state) => state.home.generalSlates) || []

  const renderOnboarding = generalSlates.length
  const shouldRender = userStatus !== 'pending' && featureState.flagsReady
  if (!shouldRender) return null

  // Temporary flag for building unified home baseline
  const baseLineHome = featureFlagActive({ flag: 'home.baseline', featureState })

  return (
    <Layout metaData={metaData} isFullWidthLayout={true} noContainer={true}>
      <SuccessFXA type="home" />
      {baseLineHome ? <HomeSetup /> : null}

      <SectionWrapper>
        <HomeGreeting />
        <HomeRecentSaves />
      </SectionWrapper>

      {baseLineHome ? <HomeContent /> : <LegacyHome />}

      <DeleteModal />
      <TaggingModal />
      <ShareModal />
      <ArchiveModal />
      <FavoriteModal />
      {renderOnboarding ? (
        <>
          <Onboarding type="home.flyaway.save" />
          <Onboarding type="home.flyaway.reader" />
        </>
      ) : null}
      <Toasts />
    </Layout>
  )
}

