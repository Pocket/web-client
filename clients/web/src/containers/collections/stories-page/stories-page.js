/* Global freestar googletag*/
import Head from 'next/head'
import { BASE_URL } from 'common/constants'
import Layout from 'layouts/main'
import MobileLayout from 'layouts/mobile-web'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

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
import { ContentIntro } from 'components/content-intro/content-intro'
import { AuthorBio } from 'components/content-author/author-bio'
import { Partner } from 'components/content-partner/partner'
import { CallOutNewsroom } from 'components/call-out/newsroom'
import { ShareToMastodon } from 'components/share-modal/share-mastodon'

import { getImageCacheUrl } from 'common/utilities/urls/urls'
import { CardTopicsNav as TopicsBubbles } from 'connectors/topic-list/topic-list'
import { ItemCard } from './card'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import ErrorPage from 'pages/_error'

import { mutationUpsertTransitionalItem } from 'connectors/items/mutation-upsert.state'
import { mutationDeleteTransitionalItem } from 'connectors/items/mutation-delete.state'

const newsroomUrls = [
  'https://getpocket.com/collections/the-american-journalism-project',
  'https://getpocket.com/collections/ajp-systemic-injustice',
  'https://getpocket.com/collections/ajp-lgbtq-legislation',
  'https://getpocket.com/collections/ajp-community-heroes',
  'https://getpocket.com/collections/ajp-challenging-the-status-quo'
]

export function CollectionPage({ locale, queryParams = {}, slug, statusCode }) {
  const dispatch = useDispatch()
  const router = useRouter()

  const { mobile_web_view: isMobileWebView } = queryParams
  const ArticleLayout = isMobileWebView ? MobileLayout : Layout

  const isAuthenticated = useSelector((state) => state.user?.auth)
  const isPremium = useSelector((state) => state.user?.premium_status)

  const data = useSelector((state) => state.itemsDisplay[slug]) || {}
  const storyIds = useSelector((state) => state.pageCollectionStories[slug])
  const topics = useSelector((state) => state.topicList?.topicsByName)
  const userStatus = useSelector((state) => state.user.user_status)
  const showTopics = locale === 'en'
  const saveItemId = useSelector((state) => state.itemsTransitions[slug])

  const [isMastodonOpen, setIsMastodonOpen] = useState(false)

  // Show error page if things have gone awry
  if (statusCode) return <ErrorPage statusCode={statusCode} />

  const { title, intro, excerpt, authors, imageUrl, pageSaveStatus, partnership } = data
  const { showAds = true, IABParentCategory, IABChildCategory, externalId } = data
  const authorNames = authors?.map((author) => author.name)

  const allowAds = userStatus === 'pending' || isPremium ? false : showAds

  // Initialize Ads on the page
  const { asPath: urlPath } = router
  const targeting = {
    URL: urlPath,
    Category: IABParentCategory?.slug,
    SubCategory: IABChildCategory?.slug,
    ArticleID: externalId
  }

  const heroImage = getImageCacheUrl(imageUrl, { width: 648 }, 'png')

  // const count = urls?.length
  // const saveCollectionTop = () => dispatch(saveCollection(slug))
  // const saveCollectionBottom = () => dispatch(saveCollection(slug))
  const languagePrefix = locale === 'en' ? '' : `/${locale}`
  const canonical = `${BASE_URL}${languagePrefix}/collections/${slug}`
  const url = canonical

  const metaData = { description: excerpt, title, url, image: imageUrl }

  const saveStatus = saveItemId ? 'saved' : 'unsaved'

  // Prep save action
  const onSave = (url, value) => {
    dispatch(sendSnowplowEvent('collection.page.save', { url, value }))
    dispatch(mutationUpsertTransitionalItem(url, slug))
  }

  const onUnSave = (url, value) => {
    dispatch(sendSnowplowEvent('collection.page.unsave', { url, value }))
    dispatch(mutationDeleteTransitionalItem(saveItemId, slug))
  }

  const saveAction = saveItemId ? onUnSave : onSave

  const shareAction = (platform) => {
    dispatch(sendSnowplowEvent(`collection.share.${platform}`, { url }))
  }

  const topicClick = (topic) => {
    dispatch(sendSnowplowEvent('collection.topic.click', { label: topic }))
  }

  const toggleMastodon = () => {
    setIsMastodonOpen(!isMastodonOpen)
  }

  const confirmMastodon = (instance) => {
    dispatch(sendSnowplowEvent('share.mastodon.confirm', { value: instance }))
  }

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
        forceWebView={true}
        title={metaData.title}
        canonical={canonical}
        metaData={metaData}
        className={printLayout}>
        <main className={contentLayout}>
          <section>
            <AdAboveTheFold allowAds={allowAds} targeting={targeting} />
          </section>
          {/* Content header information */}
          <section className="content-section">
            <header>
              <PocketWorthy />
              <ParsedHeadline title={title} description={excerpt} useMarkdown={true} />
              {authors ? (
                <AuthorByline
                  url="/collections"
                  name="Pocket Collections"
                  showAuthors={true}
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
                excerpt={excerpt}
                onSave={saveAction}
                saveStatus={pageSaveStatus}
                isAuthenticated={isAuthenticated}
                onShare={shareAction}
                onShareMastodon={toggleMastodon}
                className="sticky"
                url={url}
              />
            </aside>

            {/* Right aside content such as ads and recs */}

            {newsroomUrls.includes(url) ? (
              <CallOutNewsroom />
            ) : (
              <aside className="right-aside">
                <AdRailTop allowAds={allowAds} targeting={targeting} />
                <AdRailBottom allowAds={allowAds} targeting={targeting} />
              </aside>
            )}

            <div className="content-body">
              <img src={heroImage} alt="" className="hero-image" />

              {partnership ? <Partner partnerInfo={partnership} /> : null}

              <ContentIntro intro={intro} />

              {/* Collection Stories */}
              {storyIds
                ? storyIds.map((id, index) => (
                    <ItemCard
                      id={id}
                      key={id}
                      position={index}
                      showExcerpt={true}
                      partnerType={partnership?.type}
                    />
                  ))
                : null}

              {authors
                ? authors?.map((author) => <AuthorBio key={author.name} {...author} />)
                : null}
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

              <AdBelowTheFold allowAds={allowAds} targeting={targeting} />

              {showTopics ? (
                <TopicsBubbles topics={topics} className="no-border" track={topicClick} />
              ) : null}
            </footer>
          </section>
        </main>
        <ShareToMastodon
          showModal={isMastodonOpen}
          cancelShare={toggleMastodon}
          shareAction={confirmMastodon}
          url={url}
        />
      </ArticleLayout>
    </>
  )
}
