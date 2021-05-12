import Layout from 'layouts/main'
import MobileLayout from 'layouts/mobile-web'
import { cardGrid } from 'components/items-layout/base'
import { useDispatch, useSelector } from 'react-redux'

import { PocketWorthy } from 'components/content-headline/pocket-worthy'
import { ParsedHeadline } from 'components/content-headline/parsed-headline'
import { AuthorByline } from 'components/content-author/author-byline'
import { ArticleActions } from 'components/content-actions/article-actions'
import { PublisherAttribution } from 'components/content-publisher/publisher-attribution'
import { SaveArticleTop } from 'components/content-saving/save-article'
import { SaveArticleBottom } from 'components/content-saving/save-article'
import { CardTopicsNav as TopicsBubbles } from 'connectors/topic-list/topic-list'

import { css, cx } from 'linaria'
import { OffsetList } from 'components/items-layout/list-offset'
import { ItemCard } from 'connectors/item-card/collection/story-card'

import { saveCollection } from 'containers/collections/collections.state'
import { Toasts } from 'connectors/toasts/toast-list'

const collectionDetail = css`
  display: grid;
  grid-template-columns: repeat(12, 1fr);

  .collection-body {
    grid-column: 2 / -1;
  }

  .hero-image {
    position: relative;
    grid-column: span 8;
    img {
      width: 100%;
    }
  }
  .collection-info {
    grid-column: span 8;
    color: var(--color-textPrimary);
    font-size: 1.5rem;
    font-family: var(--fontSerif);
  }
`

export function CollectionPage({ queryParams = {}, slug }) {
  const metaData = {
    description: 'Discover fascinating stories from all across the web with Pocket.',
    title: 'Discover stories on Pocket'
  }
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.user.auth)
  const data = useSelector((state) => state.collections[slug]) || {}
  const topics = useSelector((state) => state.topicList?.topicsByName)

  const { mobile_web_view: isMobileWebView } = queryParams
  const ArticleLayout = isMobileWebView ? MobileLayout : Layout

  const { title, intro, excerpt, authors, stories, imageUrl, urls, saveStatus } = data
  const authorNames = authors?.map((author) => author.name)
  const count = urls.length
  const saveCollectionTop = () => dispatch(saveCollection(slug))
  const saveCollectionBottom = () => dispatch(saveCollection(slug))

  return (
    <ArticleLayout title={metaData.title} metaData={metaData}>
      <main className={cx('main', collectionDetail)}>
        <div className="collection-body">
          <header>
            <div className={cx('spacing', isMobileWebView && 'mobile')}>
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
            </div>
          </header>
          <section className={cardGrid}>
            <div className="hero-image">
              <img src={imageUrl} alt="" />
            </div>
            <p className="collection-info">{excerpt}</p>
          </section>

          <OffsetList items={stories} offset={0} count={20} cardShape="wide" ItemCard={ItemCard} />

          <TopicsBubbles topics={topics} className="no-border" />
        </div>
      </main>
      <Toasts />
    </ArticleLayout>
  )
}
