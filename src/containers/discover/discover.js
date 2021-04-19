// Vendor
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

// State
import { saveDiscoverItem } from './discover.state'
import { unSaveDiscoverItem } from './discover.state'

// Analytics
import { trackPageView } from 'containers/discover/discover.analytics'
import { trackEmailImpression } from 'containers/discover/discover.analytics'
import { trackEmailInputFocus } from 'containers/discover/discover.analytics'
import { trackEmailSubmit } from 'containers/discover/discover.analytics'
import { trackEmailSubmitSuccess } from 'containers/discover/discover.analytics'
import { trackEmailSubmitFailure } from 'containers/discover/discover.analytics'
import { trackEmailValidationError } from 'containers/discover/discover.analytics'
import { trackSignupCalloutImpression } from 'containers/discover/discover.analytics'
import { trackSignupCalloutDismiss } from 'containers/discover/discover.analytics'
import { trackSignupCalloutComplete } from 'containers/discover/discover.analytics'
import { trackTopicClick } from 'containers/discover/discover.analytics'

//Pages
import Layout from 'layouts/main'
import ErrorPage from 'pages/_error'

// Components
import { CardPageHeader } from 'components/headers/discover-header'
import { CardListHeading } from 'components/headers/discover-header'
import { ItemCard } from 'connectors/item-card/discover/card'
import { Lockup } from 'components/items-layout/list-lockup'
import { OffsetList } from 'components/items-layout/list-offset'
import { CardTopicsNav } from 'connectors/topic-list/topic-list'

import { ReportFeedbackModal } from 'connectors/confirm-report/confirm-report'
import { CallOutBuildHome } from 'components/call-out/call-out-build-home'
import { CallOutBrand } from 'components/call-out/call-out-brand'
import { CallOutStartLibraryExplore } from 'components/call-out/call-out-start-library'
import { CallOutPocketHitsSignup } from 'components/call-out/call-out-pocket-hits'

export default function Discover({ url }) {
  useEffect(trackPageView, [])

  // Select items
  const items = useSelector((state) => state.discoverHome.items)
  const isAuthenticated = useSelector((state) => state.user.auth)
  const topics = useSelector((state) => state.topicList?.topicsByName)
  const userStatus = useSelector((state) => state.user.user_status)
  const shouldRender = userStatus !== 'pending'

  const metaData = {
    description: 'Discover fascinating stories from all across the web with Pocket.',
    title: 'Discover stories on Pocket',
    url
  }

  // Return error if no items are present !! TODO: FIX THIS - This is a horrid error
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

      <Lockup items={items} offset={0} heroPosition="center" ItemCard={ItemCard} />
      <CardTopicsNav topics={topics} track={trackTopicClick} />

        {/* Pocket Brand Messaging */}
      <CalloutTop shouldRender={shouldRender} isAuthenticated={isAuthenticated} />

        {/* Top List */}
      <CardListHeading>Fascinating stories</CardListHeading>

      <OffsetList items={items} offset={5} cardShape="wide" ItemCard={ItemCard} />
      <Lockup items={items} offset={10} heroPosition="left" ItemCard={ItemCard} />

      <CalloutBottom shouldRender={shouldRender} isAuthenticated={isAuthenticated} />

      <OffsetList items={items} offset={15} cardShape="wide" ItemCard={ItemCard} />

      <CardTopicsNav topics={topics} track={trackTopicClick} className="no-border" />

      <ReportFeedbackModal isOpen={true} />
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
