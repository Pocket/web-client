import { BASE_URL } from 'common/constants'
import Layout from 'layouts/main'
import MobileLayout from 'layouts/mobile-web'

import { useDispatch, useSelector } from 'react-redux'

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

import { getImageCacheUrl } from 'common/utilities'
import { CardTopicsNav as TopicsBubbles } from 'connectors/topic-list/topic-list'
import { ItemCard } from 'connectors/item-card/collection/story-card'

import { unSaveCollectionPage } from 'containers/collections/collections.state'
import { saveCollectionPage } from 'containers/collections/collections.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

import { Toasts } from 'connectors/toasts/toast-list'
import ErrorPage from 'pages/_error'

import { css } from 'linaria'
import { breakpointMediumHandset } from 'common/constants' // 479

const itemStyles = css`
  ${breakpointMediumHandset} {
    &.wide .excerpt {
      display: block;
    }

    &.wide .media,
    &.wide .content,
    &.wide footer.footer .actions {
      grid-column: span 12;
    }
  }
`

export function CollectionPage({ locale, queryParams = {}, slug, statusCode }) {
  const dispatch = useDispatch()

  const { mobile_web_view: isMobileWebView } = queryParams
  const ArticleLayout = isMobileWebView ? MobileLayout : Layout

  const isAuthenticated = useSelector((state) => state.user?.auth)
  const isPremium = useSelector((state) => state.user?.premium_status)
  const oneTrustReady = useSelector((state) => state.oneTrust?.trustReady)
  const trackingEnabled = useSelector((state) => state.oneTrust?.tracking?.enabled)
  const data = useSelector((state) => state.collectionsBySlug[slug]) || {}
  const topics = useSelector((state) => state.topicList?.topicsByName)
  const userStatus = useSelector((state) => state.user.user_status)
  const shouldRender = userStatus !== 'pending'
  const showTopics = locale === 'en'

  // Show error page if things have gone awry
  if (statusCode) return <ErrorPage statusCode={statusCode} />

  const { title, intro, excerpt, authors, stories, imageUrl, pageSaveStatus, partnership } = data
  const { showAds = true, IABParentCategory, IABChildCategory, curationCategory, externalId } = data
  const authorNames = authors?.map((author) => author.name)
  const allowAds = isPremium ? false : showAds && shouldRender && oneTrustReady
  const usePersonalized = allowAds && trackingEnabled
  const heroImage = getImageCacheUrl(imageUrl, { width: 648 }, 'png')

  // const count = urls?.length
  // const saveCollectionTop = () => dispatch(saveCollection(slug))
  // const saveCollectionBottom = () => dispatch(saveCollection(slug))
  const languagePrefix = locale === 'en' ? '' : `/${locale}`
  const canonical = `${BASE_URL}${languagePrefix}/collections/${slug}`
  const url = canonical

  const metaData = { description: excerpt, title, url, image: imageUrl }
  const saveAction = (saveUrl, id) => {
    if (pageSaveStatus === 'saved') dispatch(unSaveCollectionPage(slug))
    if (pageSaveStatus !== 'saved') {
      dispatch(saveCollectionPage(slug))
      dispatch(sendSnowplowEvent('collection.page.save', { url: saveUrl, value: id }))
    }
  }

  const shareAction = (platform) => {
    dispatch(sendSnowplowEvent(`collection.share.${platform}`, { url }))
  }

  return (
    <ArticleLayout
      forceWebView={true}
      title={metaData.title}
      canonical={canonical}
      metaData={metaData}
      className={printLayout}>
      <main className={contentLayout}>
        <section>
          <AdAboveTheFold
            allowAds={allowAds}
            usePersonalized={usePersonalized}
            iabTopCategory={IABParentCategory?.slug}
            iabSubCategory={IABChildCategory?.slug}
            curationCategory={curationCategory?.slug}
            legacyId={externalId}
          />
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
              saveStatus={pageSaveStatus}
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
              className="sticky"
              url={url}
            />
          </aside>

          {/* Right aside content such as ads and recs */}
          <aside className="right-aside">
            <AdRailTop
              allowAds={allowAds}
              usePersonalized={usePersonalized}
              iabTopCategory={IABParentCategory?.slug}
              iabSubCategory={IABChildCategory?.slug}
              curationCategory={curationCategory?.slug}
              legacyId={externalId}
            />
            <AdRailBottom
              allowAds={allowAds}
              usePersonalized={usePersonalized}
              iabTopCategory={IABParentCategory?.slug}
              iabSubCategory={IABChildCategory?.slug}
              curationCategory={curationCategory?.slug}
              legacyId={externalId}
            />
          </aside>

          <div className="content-body">
            <img src={heroImage} alt="" className="hero-image" />

            {partnership ? <Partner partnerInfo={partnership} /> : null}

            <ContentIntro intro={intro} />

            {/* Collection Stories */}
            {stories
              ? stories.map((id, index) => (
                  <ItemCard
                    id={id}
                    key={id}
                    position={index}
                    cardShape="wide"
                    showExcerpt={true}
                    className={itemStyles}
                    partnerType={partnership?.type}
                  />
                ))
              : null}

            {authors ? authors?.map((author) => <AuthorBio key={author.name} {...author} />) : null}
          </div>
        </section>

        <section className="content-section">
          <footer>
            <SaveArticleBottom
              isAuthenticated={isAuthenticated}
              saveAction={saveAction}
              saveStatus={pageSaveStatus}
              url={url}
            />

            <AdBelowTheFold
              allowAds={allowAds}
              usePersonalized={usePersonalized}
              iabTopCategory={IABParentCategory?.slug}
              iabSubCategory={IABChildCategory?.slug}
              curationCategory={curationCategory?.slug}
              legacyId={externalId}
            />

            {showTopics ? (
              <TopicsBubbles topics={topics} className="no-border" surface="collection" />
            ) : null}
          </footer>
        </section>
      </main>
      <Toasts />
    </ArticleLayout>
  )
}
