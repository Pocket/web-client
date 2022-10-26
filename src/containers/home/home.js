import Layout from 'layouts/main'

import { useSelector } from 'react-redux'
import { HomeGreeting } from 'containers/home/home-greeting'
import { HomeRecentSaves } from 'containers/home/home-recent-saves'

import { HomeContent } from './home-content'

import { TaggingModal } from 'connectors/confirm-tags/confirm-tags'
import { DeleteModal } from 'connectors/confirm-delete/confirm-delete'
import { ShareModal } from 'connectors/confirm-share/confirm-share'
import { ArchiveModal } from 'connectors/confirm-archive/confirm-archive'
import { FavoriteModal } from 'connectors/confirm-favorite/confirm-favorite'
import { Toasts } from 'connectors/toasts/toast-list'
import { SuccessFXA } from 'connectors/fxa-migration-success/success-fxa'

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

      <DeleteModal />
      <TaggingModal />
      <ShareModal />
      <ArchiveModal />
      <FavoriteModal />

      <Toasts />
    </Layout>
  )
}

