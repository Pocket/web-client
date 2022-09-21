import Layout from 'layouts/main'

import { useSelector, useDispatch } from 'react-redux'
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
import { CardTopicsNav } from 'connectors/topic-list/topic-list'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const Home = ({ metaData }) => {
  const dispatch = useDispatch()

  const userStatus = useSelector((state) => state.user.user_status)
  const featureState = useSelector((state) => state.features) || {}
  const generalSlates = useSelector((state) => state.home.generalSlates) || []
  const topics = useSelector((state) => state.topicList?.topicsByName)

  const renderOnboarding = generalSlates.length
  const shouldRender = userStatus !== 'pending' && featureState.flagsReady
  if (!shouldRender) return null

  // Temporary flag for building unified home baseline
  const baseLineHome = featureFlagActive({ flag: 'home.baseline', featureState })

  const topicClick = (topic) => dispatch(sendSnowplowEvent('home.topic.click', { label: topic }))

  return (
    <Layout metaData={metaData} isFullWidthLayout={true} noContainer={true}>
      <SuccessFXA type="home" />

      <SectionWrapper>
        <HomeGreeting />
        <HomeRecentSaves />
      </SectionWrapper>

      {baseLineHome ? <HomeContent /> : <LegacyHome />}

      <CardTopicsNav topics={topics} className="no-border" track={topicClick} />

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

