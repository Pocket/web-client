/* Global freestar googletag*/
import Head from 'next/head'
import Layout from 'layouts/main'
import MobileLayout from 'layouts/mobile-web'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { BASE_URL } from 'common/constants'

import { contentLayout } from 'components/content-layout/content-layout'
import { printLayout } from 'components/content-layout/print-layout'
import { PocketWorthy } from 'components/content-headline/pocket-worthy'
import { ParsedHeadline } from 'components/content-headline/parsed-headline'
import { AuthorByline } from 'components/content-author/author-byline'
import { ArticleActions } from 'components/content-actions/article-actions'
import { SaveArticleTop } from 'components/content-saving/save-article'
import { SaveArticleBottom } from 'components/content-saving/save-article'

import { AdAboveTheFold } from 'components/content-ads/content-ads'
import { AdBelowTheFold } from 'components/content-ads/content-ads'
import { AdRailTop } from 'components/content-ads/content-ads'
import { AdRailBottom } from 'components/content-ads/content-ads'

import { ContentParsed } from 'components/content-parsed/content-parsed'
import { PublisherAttribution } from 'components/content-publisher/publisher-attribution'

import { saveArticleItem, unSaveArticleItem } from './syndicated-article.state'

import { PublisherRecs } from './publisher-recs'
import { PocketRecs } from './pocket-recs'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

import { CardTopicsNav as TopicsBubbles } from 'connectors/topic-list/topic-list'
import { Toasts } from 'connectors/toasts/toast-list'
import { ListenLogin as Listen } from 'connectors/listen/listen-login'
import { ShareToMastodon } from 'components/share-modal/share-mastodon'

// Possible query params passed via url
const validParams = {
  mobile_web_view: false, // hide unneeded elements when rendered by native apps
  premium_user: false // external state being managed by native apps
}

export function SyndicatedArticle({ queryParams = validParams, locale }) {
  const dispatch = useDispatch()
  const router = useRouter()

  const isAuthenticated = useSelector((state) => state.user?.auth)
  const isPremium = useSelector((state) => state.user?.premium_status)
  const userStatus = useSelector((state) => state.user.user_status)

  const topics = useSelector((state) => state.topicList?.topicsByName)
  const articleData = useSelector((state) => state.syndicatedArticle.articleData)
  const saveStatus = useSelector((state) => state.syndicatedArticle.saveStatus)

  const [isMastodonOpen, setIsMastodonOpen] = useState(false)

  const {
    itemId,
    originalItemId,
    title,
    excerpt,
    publisher,
    authorNames,
    content,
    publishedAt,
    publisherUrl,
    mainImage,
    slug,
    iabTopCategory,
    iabSubCategory,
    showAds
  } = articleData || {}

  // modify rendered elements when query params are passed in
  const { mobile_web_view, premium_user } = queryParams
  const isMobileWebView = mobile_web_view === 'true'
  const isPremiumUser = premium_user === 'true' || isPremium === '1'
  const allowAds = userStatus === 'pending' || isPremiumUser ? false : showAds

  // Initialize Ads on the page
  const { asPath: urlPath } = router
  const targeting = {
    URL: urlPath,
    Category: iabTopCategory,
    SubCategory: iabSubCategory,
    ArticleID: originalItemId
  }
  // If there is no article data, turn back until it's loaded
  if (!articleData) return

  const languagePrefix = locale === 'en' ? '' : `/${locale}`
  const url = `${BASE_URL}${languagePrefix}/explore/item/${slug}`

  const articleMetaData = {
    url,
    title,
    description: excerpt,
    image: mainImage,
    type: 'article'
  }
  const canonical = publisher?.attributeCanonicalToPublisher ? false : url
  const noIndex = publisher?.attributeCanonicalToPublisher

  const ArticleLayout = isMobileWebView ? MobileLayout : Layout

  const saveAction = (savedUrl, value) => {
    if (saveStatus === 'saved') dispatch(unSaveArticleItem(itemId))
    if (saveStatus !== 'saved') {
      const analyticsData = { url: savedUrl, value }
      dispatch(sendSnowplowEvent('syndicated.article.save', analyticsData))
      dispatch(saveArticleItem(savedUrl))
    }
  }

  const shareAction = (platform) => {
    const analyticsData = { url }
    dispatch(sendSnowplowEvent(`syndicated.share.${platform}`, analyticsData))
  }

  const toggleMastodon = () => {
    setIsMastodonOpen(!isMastodonOpen)
  }

  const topicClick = (topic) => {
    dispatch(sendSnowplowEvent('syndicated.topic.click', { label: topic }))
  }

  const publisherImpression = (label) => {
    dispatch(sendSnowplowEvent('syndicated.attribution.impression', { label }))
  }

  const publisherClick = (label) => {
    dispatch(sendSnowplowEvent('syndicated.attribution.click', { label }))
  }

  const showAuthors = authorNames?.length > 0

  return (
    <>
      <Head>
        {/* These preconnect are in place for Freestar Ads */}
        <link rel="preconnect" href="https://a.pub.network/" crossOrigin />
        <link rel="preconnect" href="https://b.pub.network/" crossOrigin />
        <link rel="preconnect" href="https://c.pub.network/" crossOrigin />
        <link rel="preconnect" href="https://d.pub.network/" crossOrigin />
        <link rel="preconnect" href="https://btloader.com/" crossOrigin />
        <link rel="preconnect" href="https://api.btloader.com/" crossOrigin />
        <link
          rel="preconnect"
          href="https://confiant-integrations.global.ssl.fastly.net"
          crossOrigin
        />
      </Head>
      <ArticleLayout
        title={title}
        metaData={articleMetaData}
        canonical={canonical}
        noIndex={noIndex}
        className={printLayout}>
        <main className={contentLayout}>
          <section>
            <AdAboveTheFold allowAds={allowAds} targeting={targeting} />
          </section>
          {/* Content header information */}
          <section className="content-section">
            <header>
              <PocketWorthy />
              <ParsedHeadline title={title} description={excerpt} />
              {authorNames ? (
                <AuthorByline
                  url={publisher?.url}
                  name={publisher?.name}
                  showAuthors={showAuthors}
                  authorNames={authorNames}
                />
              ) : null}
              <SaveArticleTop
                isAuthenticated={isAuthenticated}
                saveAction={saveAction}
                saveStatus={saveStatus}
                url={url}
              />
              <Listen itemId={itemId} path={url} />
            </header>
          </section>

          {/* Content body like a syndicated article or collection */}
          <section className="content-section">
            {/* Left side content actions */}
            <aside className="left-aside">
              <ArticleActions
                isMobileWebView={isMobileWebView}
                title={title}
                url={url}
                excerpt={excerpt}
                onSave={saveAction}
                onShare={shareAction}
                onShareMastodon={toggleMastodon}
                saveStatus={saveStatus}
                isAuthenticated={isAuthenticated}
                className="sticky"
                slug={slug}
              />
            </aside>

            {/* Right aside content such as ads and recs */}
            <aside className="right-aside">
              <AdRailTop allowAds={allowAds} targeting={targeting} />
              <PublisherRecs
                itemId={originalItemId}
                publisher={publisher}
                legacyId={originalItemId}
              />
              <AdRailBottom allowAds={allowAds} targeting={targeting} />
            </aside>

            <div className="content-body">
              {/* Parsed Content */}
              <ContentParsed content={content} />
            </div>
          </section>

          <section className="content-section">
            <footer>
              <SaveArticleBottom
                isAuthenticated={isAuthenticated}
                saveAction={saveAction}
                saveStatus={saveStatus}
                url={url}
              />
              <PublisherAttribution
                publisher={publisher}
                publishedAt={publishedAt}
                handlePublisherImpression={publisherImpression}
                handlePublisherClick={publisherClick}
              />
            </footer>
          </section>

          <section>
            <AdBelowTheFold allowAds={allowAds} targeting={targeting} />
          </section>

          {!isMobileWebView ? (
            <section className="content-section">
              <footer>
                <PocketRecs itemId={originalItemId} legacyId={originalItemId} />
                <TopicsBubbles topics={topics} className="no-border" track={topicClick} />
              </footer>
            </section>
          ) : null}
        </main>
        <ShareToMastodon
          showModal={isMastodonOpen}
          cancelShare={toggleMastodon}
          shareAction={shareAction}
          url={url}
        />
        <Toasts />
      </ArticleLayout>
    </>
  )
}
