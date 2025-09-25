import Layout from 'layouts/main'
import MobileLayout from 'layouts/mobile-web'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from 'common/constants'

import { contentLayout } from 'components/content-layout/content-layout'
import { printLayout } from 'components/content-layout/print-layout'
import { PocketWorthy } from 'components/content-headline/pocket-worthy'
import { ParsedHeadline } from 'components/content-headline/parsed-headline'
import { AuthorByline } from 'components/content-author/author-byline'

import { ContentParsed } from 'components/content-parsed/content-parsed'
import { PublisherAttribution } from 'components/content-publisher/publisher-attribution'
import { PublisherRecs } from './publisher-recs'
import { PocketRecs } from './pocket-recs'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { Toasts } from 'connectors/toasts/toast-list'

// Possible query params passed via url
const validParams = {
  mobile_web_view: false, // hide unneeded elements when rendered by native apps
  premium_user: false // external state being managed by native apps
}

export function SyndicatedArticle({ queryParams = validParams, locale }) {
  const dispatch = useDispatch()
  const articleData = useSelector((state) => state.syndicatedArticle.articleData)

  const {
    originalItemId,
    title,
    excerpt,
    publisher,
    publisherUrl,
    authorNames,
    content,
    publishedAt,
    mainImage,
    slug
  } = articleData || {}

  // modify rendered elements when query params are passed in
  const { mobile_web_view } = queryParams
  const isMobileWebView = mobile_web_view === 'true'

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

  // We don't provide canonical, we simply noIndex our syndicated articles
  // This means we don't inadvertently clobber or steal publisher SEO
  const canonical = false
  const noIndex = publisher?.attributeCanonicalToPublisher
  const syndicatedFrom = publisherUrl ? publisherUrl : false
  const ArticleLayout = isMobileWebView ? MobileLayout : Layout

  // Prep save action
  const publisherImpression = (label) => {
    dispatch(sendSnowplowEvent('syndicated.attribution.impression', { label }))
  }

  const publisherClick = (label) => {
    dispatch(sendSnowplowEvent('syndicated.attribution.click', { label }))
  }

  const showAuthors = authorNames?.length > 0

  return (
    <>
      <ArticleLayout
        shutdown={true}
        title={title}
        metaData={articleMetaData}
        syndicatedFrom={syndicatedFrom}
        canonical={canonical}
        noIndex={noIndex}
        bannerCampaign={false}
        className={printLayout}>
        <main className={contentLayout}>
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
            </header>
          </section>

          {/* Content body like a syndicated article or collection */}
          <section className="content-section">
            {/* Left side content actions */}
            <aside className="left-aside"></aside>

            {/* Right aside content such as ads and recs */}
            <aside className="right-aside">
              <PublisherRecs
                itemId={originalItemId}
                publisher={publisher}
                legacyId={originalItemId}
              />
            </aside>

            <div className="content-body">
              {/* Parsed Content */}
              <ContentParsed content={content} />
            </div>
          </section>

          <section className="content-section">
            <footer>
              <PublisherAttribution
                publisher={publisher}
                publishedAt={publishedAt}
                handlePublisherImpression={publisherImpression}
                handlePublisherClick={publisherClick}
              />
            </footer>
          </section>

          {!isMobileWebView ? (
            <section className="content-section">
              <footer>
                <PocketRecs itemId={originalItemId} legacyId={originalItemId} />
              </footer>
            </section>
          ) : null}
        </main>
        <Toasts />
      </ArticleLayout>
    </>
  )
}
