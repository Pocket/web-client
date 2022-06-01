import Layout from 'layouts/main'
import MobileLayout from 'layouts/mobile-web'
import { useRouter } from 'next/router'

import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from 'common/constants'

import { contentLayout } from 'components/content-layout/content-layout'
import { printLayout } from 'components/content-layout/print-layout'
import { PocketWorthy } from 'components/content-headline/pocket-worthy'
import { ParsedHeadline } from 'components/content-headline/parsed-headline'
import { AuthorByline } from 'components/content-author/author-byline'
import { ArticleActions } from 'components/content-actions/article-actions'
import { SaveArticleTop } from 'components/content-saving/save-article'
import { SaveArticleBottom } from 'components/content-saving/save-article'

import { useAdsOnPage } from 'components/programmatic-ad/ad-hook'
import { AdAboveTheFold } from 'components/content-ads/content-ads'
import { AdBelowTheFold } from 'components/content-ads/content-ads'
import { AdRailTop } from 'components/content-ads/content-ads'
import { AdRailBottom } from 'components/content-ads/content-ads'

import { ContentParsed } from 'components/content-parsed/content-parsed'
import { PublisherAttribution } from 'components/content-publisher/publisher-attribution'
import { trackPublisherCTAImpression } from './syndicated-article.analytics'
import { trackPublisherCTAClick } from './syndicated-article.analytics'

import { saveArticleItem, unSaveArticleItem } from './syndicated-article.state'

import { PublisherRecs } from './publisher-recs'
import { PocketRecs } from './pocket-recs'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { trackScrollDepth } from './syndicated-article.analytics'

import { CardTopicsNav as TopicsBubbles } from 'connectors/topic-list/topic-list'
import { Toasts } from 'connectors/toasts/toast-list'
import { SimilarRecs } from 'connectors/similar/similar'

// Possible query params passed via url
const validParams = {
  mobile_web_view: false, // hide unneeded elements when rendered by native apps
  premium_user: false // external state being managed by native apps
}

export function SyndicatedArticle({ queryParams = validParams, locale }) {
  const dispatch = useDispatch()
  const router = useRouter()

  const isDev = process.env.SHOW_DEV === 'included'

  const isAuthenticated = useSelector((state) => state.user?.auth)
  const isPremium = useSelector((state) => state.user?.premium_status)
  const userStatus = useSelector((state) => state.user.user_status)

  const topics = useSelector((state) => state.topicList?.topicsByName)
  const articleData = useSelector((state) => state.syndicatedArticle.articleData)
  const saveStatus = useSelector((state) => state.syndicatedArticle.saveStatus)

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
    curationCategory,
    legacyId,
    showAds
  } = articleData || {}

  // modify rendered elements when query params are passed in
  const { mobile_web_view, premium_user } = queryParams
  const isMobileWebView = mobile_web_view === 'true'
  const isPremiumUser = premium_user === 'true' || isPremium === '1'
  const allowAds = userStatus === 'pending' || isPremiumUser ? false : showAds

  // Initialize Ads on the page
  const { pathname: urlPath } = router
  const showLog = isDev
  const adsReady = useAdsOnPage({ allowAds, urlPath, iabTopCategory, iabSubCategory, legacyId, showLog }) //prettier-ignore

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
  const canonical = publisher?.attributeCanonicalToPublisher ? publisherUrl : url

  const ArticleLayout = isMobileWebView ? MobileLayout : Layout

  const saveAction = (savedUrl, value) => {
    if (saveStatus === 'saved') dispatch(unSaveArticleItem(itemId))
    if (saveStatus !== 'saved') {
      const analyticsData = { id: itemId, url: savedUrl, value }
      dispatch(sendSnowplowEvent('syndicated.article.save', analyticsData))
      dispatch(saveArticleItem(savedUrl, itemId))
    }
  }

  const shareAction = (platform) => {
    const analyticsData = { id: itemId, url }
    dispatch(sendSnowplowEvent(`syndicated.share.${platform}`, analyticsData))
  }

  return (
    <>
      <ArticleLayout
        title={title}
        metaData={articleMetaData}
        canonical={canonical}
        className={printLayout}>
        <main className={contentLayout}>
          <section>
            <AdAboveTheFold
              adsReady={adsReady}
              allowAds={allowAds}
              iabTopCategory={iabTopCategory}
              iabSubCategory={iabSubCategory}
              curationCategory={curationCategory}
              legacyId={legacyId}
            />
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
                  showAuthors={publisher?.showAuthors}
                  authorNames={authorNames}
                />
              ) : null}
              <SaveArticleTop
                isAuthenticated={isAuthenticated}
                saveAction={saveAction}
                saveStatus={saveStatus}
                url={url}
              />
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
                saveStatus={saveStatus}
                isAuthenticated={isAuthenticated}
                className="sticky"
                slug={slug}
              />
            </aside>

            {/* Right aside content such as ads and recs */}
            <aside className="right-aside">
              <AdRailTop
                allowAds={allowAds}
                adsReady={adsReady}
                iabTopCategory={iabTopCategory}
                iabSubCategory={iabSubCategory}
                curationCategory={curationCategory}
                legacyId={legacyId}
              />
              <PublisherRecs itemId={originalItemId} publisher={publisher} legacyId={legacyId} />
              <AdRailBottom allowAds={allowAds} adsReady={adsReady} />
            </aside>

            <div className="content-body">
              {/* Parsed Content */}
              <ContentParsed
                content={content?.content}
                trackScrollDepth={trackScrollDepth}
                isMobileWebView={isMobileWebView}
              />
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
                handlePublisherImpression={trackPublisherCTAImpression}
                handlePublisherClick={trackPublisherCTAClick}
              />
            </footer>
          </section>

          <section>
            <AdBelowTheFold
              allowAds={allowAds}
              adsReady={adsReady}
              iabTopCategory={iabTopCategory}
              iabSubCategory={iabSubCategory}
              curationCategory={curationCategory}
              legacyId={legacyId}
            />
          </section>

          {!isMobileWebView ? (
            <section className="content-section">
              <footer>
                <PocketRecs itemId={originalItemId} legacyId={legacyId} />
                <TopicsBubbles topics={topics} className="no-border" />
              </footer>
            </section>
          ) : null}
        </main>
        <Toasts />
      </ArticleLayout>
      <SimilarRecs />
    </>
  )
}
