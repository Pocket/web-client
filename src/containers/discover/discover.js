// Vendor
import { useSelector, useDispatch } from 'react-redux'

// Analytics
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

//Pages
import Layout from 'layouts/main'
import { BASE_URL } from 'common/constants'

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

import { Toasts } from 'connectors/toasts/toast-list'

import { useTranslation } from 'next-i18next'

export default function Discover({ locale }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  // Select items
  const items = useSelector((state) => state.pageDiscoverIds)
  const isAuthenticated = useSelector((state) => state.user.auth)
  const topics = useSelector((state) => state.topicList?.topicsByName)
  const userStatus = useSelector((state) => state.user.user_status)
  const shouldRender = userStatus !== 'pending'
  const showTopics = locale === 'en'

  const languagePrefix = locale === 'en' ? '' : `/${locale}`
  const canonical = `${BASE_URL}${languagePrefix}/explore`
  const url = canonical

  const metaData = {
    description: t(
      'discover:page-description',
      'Discover fascinating stories from all across the web with Pocket.'
    ),
    title: t('discover:page-title', 'Discover stories on Pocket'),
    url
  }

  const trackEvent = (id) => {
    dispatch(sendSnowplowEvent(id))
  }

  const topicClickMiddle = (topic, index, id) => {
    dispatch(sendSnowplowEvent('discover.middle.topic.click', { label: topic }))
  }

  const topicClickBottom = (topic, index, id) => {
    dispatch(sendSnowplowEvent('discover.bottom.topic.click', { label: topic }))
  }

  // Return error if no items are present !! TODO: FIX THIS - This is a horrid error
  return items?.length ? (
    <Layout title={metaData.title} metaData={metaData}>
      {!isAuthenticated && shouldRender ? <CallOutBuildHome /> : null}

      <CardPageHeader
        title={t('discover:best-of-the-web', 'Discover the best of the web')}
        subHeading={t('discover:essential-reads', 'Today’s essential reads')}
      />

      {/* Top Lockup (center)*/}
      <Lockup items={items} offset={0} heroPosition="left" ItemCard={ItemCard} />

      {showTopics ? <CardTopicsNav topics={topics} track={topicClickMiddle} /> : null}

      {/* Pocket Brand Messaging */}
      <CalloutTop locale={locale} shouldRender={shouldRender} isAuthenticated={isAuthenticated} />

      {/* Top List */}
      <CardListHeading>{t('discover:fascinating-stories', 'Fascinating stories')}</CardListHeading>

      <OffsetList items={items} offset={5} cardShape="wide" ItemCard={ItemCard} border={true} />

      <Lockup items={items} offset={10} heroPosition="left" ItemCard={ItemCard} />

      <CalloutBottom
        shouldRender={shouldRender}
        isAuthenticated={isAuthenticated}
        trackEvent={trackEvent}
      />

      <OffsetList
        items={items}
        offset={15}
        cardShape="wide"
        ItemCard={ItemCard}
        border={showTopics}
      />

      {showTopics ? (
        <CardTopicsNav topics={topics} className="no-border" track={topicClickBottom} />
      ) : null}

      <ReportFeedbackModal />
      <Toasts />
    </Layout>
  ) : (
    <Layout title={metaData.title} metaData={metaData}></Layout>
  )
}

function CalloutTop({ shouldRender, isAuthenticated, locale }) {
  return shouldRender ? (
    <div>
      {isAuthenticated ? (
        <CallOutBrand />
      ) : (
        <CallOutPocketHitsSignup locale={locale} utmCampaign="explore-inline" utmSource="explore" />
      )}
    </div>
  ) : null
}

function CalloutBottom({ shouldRender, isAuthenticated, trackEvent }) {
  const impressionEvent = () => trackEvent('discover.signup.impression')
  const dismissEvent = () => trackEvent('discover.signup.dismiss')
  const completeEvent = () => trackEvent('discover.signup.click')

  return shouldRender ? (
    <CallOutStartLibraryExplore
      handleImpression={impressionEvent}
      handleDismiss={dismissEvent}
      handleComplete={completeEvent}
      isAuthenticated={isAuthenticated}
    />
  ) : null
}
