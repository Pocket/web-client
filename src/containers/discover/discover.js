// Vendor
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

// State
import { saveDiscoverItem } from './discover.state'
import { unSaveDiscoverItem } from './discover.state'

// Analytics
import { trackPageView } from './discover.analytics'
import { trackItemImpression } from './discover.analytics'
import { trackItemOpen } from './discover.analytics'
import { trackEmailImpression } from './discover.analytics'
import { trackEmailInputFocus } from './discover.analytics'
import { trackEmailSubmit } from './discover.analytics'
import { trackEmailSubmitSuccess } from './discover.analytics'
import { trackEmailSubmitFailure } from './discover.analytics'
import { trackEmailValidationError } from './discover.analytics'
import { trackSignupCalloutImpression } from './discover.analytics'
import { trackSignupCalloutDismiss } from './discover.analytics'
import { trackSignupCalloutComplete } from './discover.analytics'
import { trackTopicClick } from './discover.analytics'
import { trackUnAuthSave } from './discover.analytics'

//Pages
import Layout from 'layouts/main'
import ErrorPage from 'pages/_error'

// Components
import { CardPageHeader } from 'components/headers/discover-header'
import { CardListHeading } from 'components/headers/discover-header'

import { CardList } from 'components/items-layout/dynamic-blocks'
import { DynamicCardLayout } from 'components/items-layout/dynamic-blocks'

import { CardTopicsNav } from 'components/items-layout/topic-list'

import ReportFeedbackModal from 'components/report-feedback-modal/report-feedback-modal'
import { CallOutBuildHome } from 'components/call-out/call-out-build-home'
import { CallOutBrand } from 'components/call-out/call-out-brand'
import { CallOutStartLibraryExplore } from 'components/call-out/call-out-start-library'
import { CallOutPocketHitsSignup } from 'components/call-out/call-out-pocket-hits'

export default function Discover({ url }) {
  useEffect(trackPageView, [])

  // Select items
  const items = useSelector((state) => state.discoverHome.items)

  // Is user logged in?
  const isAuthenticated = useSelector((state) => state.user.auth)
  const userStatus = useSelector((state) => state.user.user_status)
  const shouldRender = userStatus !== 'pending'

  // Get topicList for sections that require it
  const topics = useSelector((state) => state.topicList?.topicsByName)

  // Set some modal state for this page
  const [isOpen, setModalOpen] = useState(false)
  const [itemToReport, setItemToReport] = useState(null)

  const reportFeedbackItem = (item) => {
    setItemToReport(item)
    setModalOpen(true)
  }

  const actions = {
    saveAction: saveDiscoverItem,
    unSaveAction: unSaveDiscoverItem,
    openAction: trackItemOpen,
    impressionAction: trackItemImpression,
    topicClick: trackTopicClick,
    unAuthSaveAction: trackUnAuthSave,
    reportFeedbackAction: reportFeedbackItem
  }

  const metaData = {
    description: 'Discover fascinating stories from all across the web with Pocket.',
    title: 'Discover stories on Pocket',
    url
  }

  // Return error if no items are present
  // !! TODO: FIX THIS - This is a horrid error
  return !items?.length ? (
    <ErrorPage statusCode={503} />
  ) : (
    <Layout title={metaData.title} metaData={metaData}>
      {!isAuthenticated && shouldRender ? <CallOutBuildHome /> : null}

      <CardPageHeader
        title="Discover the best of the&nbsp;web"
        subHeading="Today’s essential reads"
      />
      <DynamicCardLayout {...actions}>
        {/* Top Lockup (center)*/}
        <CardList type="lockupCenter" count={5} items={items} classNames={['no-border']} />

        {/* Top TopicNav */}
        <CardTopicsNav topics={topics} track={trackTopicClick} />

        {/* Pocket Brand Messaging */}
        <CalloutTop shouldRender={shouldRender} isAuthenticated={isAuthenticated} />

        {/* Top List */}
        <CardListHeading>Fascinating stories</CardListHeading>
        <CardList type="list" classNames={['no-border']} count={5} items={items} />

        {/* Mid Lockup (left) */}
        <CardList type="lockupLeft" count={5} items={items} />

        <CalloutBottom shouldRender={shouldRender} isAuthenticated={isAuthenticated} />

        {/* Bottom List */}
        <CardList type="list" items={items} classNames={['no-border']} />

        {/* Bottom TopicNav */}
        <CardTopicsNav topics={topics} track={trackTopicClick} />
      </DynamicCardLayout>

      <ReportFeedbackModal
        isOpen={isOpen}
        setModalOpen={setModalOpen}
        itemToReport={itemToReport}
        resetItem={() => setItemToReport(null)}
      />
    </Layout>
  )
}

function CalloutTop({ shouldRender, isAuthenticated }) {
  return shouldRender ? (
    <div>
      {isAuthenticated ? (
        <CallOutBrand />
      ) : (
        <CallOutPocketHitsSignup
          onVisible={trackEmailImpression}
          handleEmailInputFocus={trackEmailInputFocus}
          handleSubmit={trackEmailSubmit}
          handleSubmitSuccess={trackEmailSubmitSuccess}
          handleSubmitFailure={trackEmailSubmitFailure}
          handleValidationError={trackEmailValidationError}
          utmCampaign="explore-inline"
          utmSource="explore"
        />
      )}
    </div>
  ) : null
}

function CalloutBottom({ shouldRender, isAuthenticated }) {
  return shouldRender ? (
    <CallOutStartLibraryExplore
      handleImpression={trackSignupCalloutImpression}
      handleDismiss={trackSignupCalloutDismiss}
      handleComplete={trackSignupCalloutComplete}
      isAuthenticated={isAuthenticated}
    />
  ) : null
}
