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

import { getImageCacheUrl } from 'common/utilities'
import { CardTopicsNav as TopicsBubbles } from 'connectors/topic-list/topic-list'
import { ItemCard } from 'connectors/item-card/collection/story-card'
import { saveCollection } from 'containers/collections/collections.state'

import { unSaveCollectionPage } from 'containers/collections/collections.state'
import { saveCollectionPage } from 'containers/collections/collections.state'
import { trackItemSave } from 'connectors/snowplow/snowplow.state'

import { Toasts } from 'connectors/toasts/toast-list'
import ErrorPage from 'pages/_error'

export function CollectionPage({ queryParams = {}, slug, statusCode }) {
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

  // Show error page if things have gone awry
  if (statusCode) return <ErrorPage statusCode={statusCode} />

  const { title, intro, excerpt, authors, stories, imageUrl, pageSaveStatus } = data
  const { showAds = true } = data
  const authorNames = authors?.map((author) => author.name)
  const allowAds = isPremium ? false : showAds && shouldRender && oneTrustReady
  const usePersonalized = allowAds && trackingEnabled
  const heroImage = getImageCacheUrl(imageUrl, { width: 648 })

  // const count = urls?.length
  // const saveCollectionTop = () => dispatch(saveCollection(slug))
  // const saveCollectionBottom = () => dispatch(saveCollection(slug))
  const url = `${BASE_URL}/collections/${slug}`
  const metaData = { description: excerpt, title, url, image: imageUrl }

  const saveAction = (saveUrl, id) => {
    if (pageSaveStatus === 'saved') dispatch(unSaveCollectionPage(slug))
    if (pageSaveStatus !== 'saved') {
      dispatch(saveCollectionPage(slug))
      dispatch(trackItemSave(0, { url }, id))
    }
  }

  return (
    <ArticleLayout title={metaData.title} metaData={metaData} className={printLayout}>
      <main className={contentLayout}>
        <section>
          <AdAboveTheFold allowAds={allowAds} usePersonalized={usePersonalized} />
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
              handleShareClick={() => {}}
              className="sticky"
              slug={slug}
            />
          </aside>

          {/* Right aside content such as ads and recs */}
          <aside className="right-aside">
            <AdRailTop allowAds={allowAds} usePersonalized={usePersonalized} />
            <AdRailBottom allowAds={allowAds} usePersonalized={usePersonalized} />
          </aside>

          <div className="content-body">
            <img src={heroImage} alt="" className="hero-image" />

            <ContentIntro intro={intro} />

            {/* Collection Stories */}
            {stories
              ? stories.map((id, index) => (
                  <ItemCard id={id} key={id} position={index} cardShape="wide" showExcerpt={true} />
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
            />

            <AdBelowTheFold allowAds={allowAds} usePersonalized={usePersonalized} />

            <TopicsBubbles topics={topics} className="no-border" />
          </footer>
        </section>
      </main>
      <Toasts />
    </ArticleLayout>
  )
}
