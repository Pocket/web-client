import Layout from 'layouts/main'

import { useDispatch, useSelector } from 'react-redux'
import { HomeGreeting } from 'containers/home/home-greeting'
import { HomeRecentSaves } from 'containers/home/home-recent-saves'
import { HomeSetup } from 'containers/home/home-setup'

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

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { CardTopicsNav } from 'connectors/topic-list/topic-list'

import { featureFlagActive } from 'connectors/feature-flags/feature-flags'

export const Home = ({ metaData }) => {
  const dispatch = useDispatch()

  const userStatus = useSelector((state) => state.user.user_status)
  const featureState = useSelector((state) => state.features) || {}
  const generalSlates = useSelector((state) => state.home.generalSlates) || []
  const topics = useSelector((state) => state.topicList?.topicsByName)

  const renderOnboarding = generalSlates.length
  const flagsReady = featureState.flagsReady
  const shouldRender = userStatus !== 'pending' && flagsReady
  if (!shouldRender) return null

  // Temporary flag for building unified home baseline
  const baseLineHome = featureFlagActive({ flag: 'home.baseline', featureState })

  // Tracking clicks on the topic selector
  const topicClick = (topic) => dispatch(sendSnowplowEvent('home.topic.click', { label: topic }))

  return (
    <Layout metaData={metaData} isFullWidthLayout={true} noContainer={true}>
      <SuccessFXA type="home" />

      {/* <HomeSetup /> This will soon become a part of the baseline. Omitting it until the endpoint supports it*/}

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

