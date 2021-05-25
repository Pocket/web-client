import Layout from 'layouts/main'
import MobileLayout from 'layouts/mobile-web'

import { useDispatch, useSelector } from 'react-redux'

import { contentLayout } from 'components/content-layout/content-layout'
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

import { CardTopicsNav as TopicsBubbles } from 'connectors/topic-list/topic-list'
import { ItemCard } from 'connectors/item-card/collection/story-card'
import { saveCollection } from 'containers/collections/collections.state'
import { saveCollectionPage } from 'containers/collections/collections.state'
import { Toasts } from 'connectors/toasts/toast-list'
import { useTranslation } from 'next-i18next'

export function CollectionPage({ queryParams = {}, slug }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const metaData = {
    description: t(
      'discover:page-description',
      'Discover fascinating stories from all across the web with Pocket.'
    ),
    title: t('discover:page-title', 'Discover stories on Pocket')
  }
  const { mobile_web_view: isMobileWebView } = queryParams
  const ArticleLayout = isMobileWebView ? MobileLayout : Layout

  const isAuthenticated = useSelector((state) => state.user?.auth)
  const isPremium = useSelector((state) => state.user?.premium_status)
  const oneTrustReady = useSelector((state) => state.oneTrust?.trustReady)
  const trackingEnabled = useSelector((state) => state.oneTrust?.tracking?.enabled)
  const data = useSelector((state) => state.collections[slug]) || {}
  const topics = useSelector((state) => state.topicList?.topicsByName)

  const { title, intro, excerpt, authors, stories, imageUrl, pageSaveStatus } = data
  const { showAds = true } = data
  const authorNames = authors?.map((author) => author.name)
  const allowAds = isPremium ? false : showAds && oneTrustReady
  const usePersonalized = allowAds && trackingEnabled

  const saveAction = () => dispatch(saveCollectionPage(slug))

  // const count = urls?.length
  // const saveCollectionTop = () => dispatch(saveCollection(slug))
  // const saveCollectionBottom = () => dispatch(saveCollection(slug))

  return (
    <ArticleLayout title={metaData.title} metaData={metaData}>
      <main className={contentLayout}>
        <section>
          <AdAboveTheFold allowAds={allowAds} usePersonalized={usePersonalized} />
        </section>
        {/* Content header information */}
        <section className="content-section">
          <header>
            <PocketWorthy />
            <ParsedHeadline title={title} description={intro} />
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
              saveAction={saveAction}
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
            <img src={imageUrl} alt="" className="hero-image" />
            <p className="collection-excerpt">{excerpt}</p>

            {/* Collection Stories */}
            {stories
              ? stories.map((id, index) => (
                  <ItemCard id={id} key={id} position={index} cardShape="wide" showExcerpt={true} />
                ))
              : null}
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
