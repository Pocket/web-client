import { useSelector } from 'react-redux'
import { SideNav } from 'connectors/side-nav/side-nav'
import Layout from 'layouts/with-sidebar'

import { HomeStandard } from 'containers/home/home-standard'
import { HomePersonalized } from 'containers/home/home-personalized'

import { TaggingModal } from 'connectors/confirm-tags/confirm-tags'
import { DeleteModal } from 'connectors/confirm-delete/confirm-delete'
import { ShareModal } from 'connectors/confirm-share/confirm-share'
import { ArchiveModal } from 'connectors/confirm-archive/confirm-archive'
import { FavoriteModal } from 'connectors/confirm-favorite/confirm-favorite'
import { Onboarding } from 'connectors/onboarding/onboarding'
import { Toasts } from 'connectors/toasts/toast-list'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'

export default function Home(props) {
  const { metaData = {} } = props

  const userStatus = useSelector((state) => state.user.user_status)
  const featureState = useSelector((state) => state.features)
  const flagsReady = featureState.flagsReady

  const shouldRender = userStatus !== 'pending' && flagsReady
  const showPersonalized = featureFlagActive({ flag: 'profiles.home', featureState })

  return (
    <Layout title={metaData.title} metaData={metaData}>
      <SideNav subset="home" />
      {shouldRender ? (
        <main className="main">{showPersonalized ? <HomePersonalized /> : <HomeStandard />}</main>
      ) : null}
      <DeleteModal />
      <TaggingModal />
      <ShareModal />
      <ArchiveModal />
      <FavoriteModal />
      <Onboarding type="home.modal" />
      <Onboarding type="home.flyaway.save" />
      <Toasts />
    </Layout>
  )
}
