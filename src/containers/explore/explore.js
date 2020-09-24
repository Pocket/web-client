import { useEffect, useState } from 'react'
import Layout from 'layouts/main'
import { saveExploreItem, unSaveExploreItem } from './explore.state'
import { useSelector } from 'react-redux'
import { trackPageView, trackItemImpression } from './explore.analytics'
import { trackItemOpen } from './explore.analytics'
import {
  trackEmailImpression,
  trackEmailInputFocus,
  trackEmailSubmit,
  trackEmailSubmitSuccess,
  trackEmailSubmitFailure,
  trackEmailValidationError
} from './explore.analytics'
import {
  trackSignupCalloutImpression,
  trackSignupCalloutDismiss,
  trackSignupCalloutComplete
} from './explore.analytics'
import ErrorPage from 'pages/_error'
import {
  CardPageHeader,
  CardListHeading
} from 'components/card-layouts/card-page-header'
import { CardList, CardLayout } from 'components/card-layouts/card-layout'
import { trackTopicClick, trackUnAuthSave } from './explore.analytics'
import { CardTopicsNav } from 'components/card-layouts/card-topics-nav'
import ReportFeedbackModal from 'components/report-feedback-modal/report-feedback-modal'
import { CallOutBrand } from 'components/call-out/call-out-brand'
import { CallOutStartLibraryExplore } from 'components/call-out/call-out-start-library'
import { CallOutPocketHitsSignup } from 'components/call-out/call-out-pocket-hits'

export default function ExploreHomePage({ url }) {
  useEffect(trackPageView, [])

  // Select state to use
  const items = useSelector((state) => state.explore.items)

  // Is user logged in?
  const isAuthenticated = useSelector((state) => state.user.auth)

  // Get topicList for sections that require it
  const topics = useSelector((state) => state.topicList?.topicsByName)

  const [isOpen, setModalOpen] = useState(false)
  const [itemToReport, setItemToReport] = useState(null)

  // Return error if no items are present
  if (!items?.length) return <ErrorPage statusCode={503} />

  const reportFeedbackItem = (item) => {
    setItemToReport(item)
    setModalOpen(true)
  }

  const actions = {
    saveAction: saveExploreItem,
    unSaveAction: unSaveExploreItem,
    openAction: trackItemOpen,
    impressionAction: trackItemImpression,
    topicClick: trackTopicClick,
    unAuthSaveAction: trackUnAuthSave,
    reportFeedbackAction: reportFeedbackItem
  }

  const metaData = {
    description:
      'Discover fascinating stories from all across the web with Pocket.',
    title: 'Discover stories on Pocket',
    url
  }

  return (
    <Layout title={metaData.title} metaData={metaData}>
      <CardPageHeader
        title="Discover the best of the&nbsp;web"
        subHeading="Today’s essential reads"
      />
      <CardLayout {...actions}>
        {/* Top Lockup (center)*/}
        <CardList
          type="lockupCenter"
          count={5}
          items={items}
          classNames={['no-border']}
        />

        {/* Top TopicNav */}
        <CardTopicsNav topics={topics} track={trackTopicClick} />

        {/* Pocket Brand Messaging */}
        { isAuthenticated ? (
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

        {/* Top List */}
        <CardListHeading>Fascinating stories</CardListHeading>
        <CardList
          type="list"
          classNames={['no-border']}
          count={5}
          items={items}
        />

        {/* Mid Lockup (left) */}
        <CardList type="lockupLeft" count={5} items={items} />

        <CallOutStartLibraryExplore
          handleImpression={trackSignupCalloutImpression}
          handleDismiss={trackSignupCalloutDismiss}
          handleComplete={trackSignupCalloutComplete}
        />

        {/* Bottom List */}
        <CardList type="list" items={items} classNames={['no-border']} />

        {/* Bottom TopicNav */}
        <CardTopicsNav topics={topics} track={trackTopicClick} />
      </CardLayout>
      <ReportFeedbackModal
        isOpen={isOpen}
        setModalOpen={setModalOpen}
        itemToReport={itemToReport}
        resetItem={() => setItemToReport(null)}
      />
    </Layout>
  )
}
