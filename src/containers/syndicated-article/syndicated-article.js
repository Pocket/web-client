import React, { Fragment, useEffect } from 'react'
import ErrorPage from 'pages/_error'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { saveArticleItem, unSaveArticleItem } from './syndicated-article.state'
import { publisherRecsRequest } from '/connectors/recit/recit.state'
import { pocketRecsRequest } from '/connectors/recit/recit.state'

import { trackPageView } from './syndicated-article.analytics'
import { trackShareClick } from './syndicated-article.analytics'
import { trackPublisherCTAImpression } from './syndicated-article.analytics'
import { trackPublisherCTAClick } from './syndicated-article.analytics'
import { trackEmailInputFocus } from './syndicated-article.analytics'
import { trackEmailSubmit } from './syndicated-article.analytics'
import { trackEmailSubmitSuccess } from './syndicated-article.analytics'
import { trackEmailSubmitFailure } from './syndicated-article.analytics'
import { trackEmailValidationError } from './syndicated-article.analytics'
import { trackEmailImpression } from './syndicated-article.analytics'
import { trackEmailDismiss } from './syndicated-article.analytics'
import { trackScrollDepth } from './syndicated-article.analytics'
import { sendSaveToSnowplow } from './syndicated-article.analytics'

import { PUBLISHER_MODULE } from '/connectors/recit/recit.analytics'
import { POCKET_MODULE } from '/connectors/recit/recit.analytics'
import { trackRecImpression } from '/connectors/recit/recit.analytics'
import { trackRecClick } from '/connectors/recit/recit.analytics'

import Layout from 'layouts/main'
import MobileLayout from 'layouts/mobile-web'
import { css, cx } from 'linaria'
import { spacing250 } from '@pocket/web-ui'
import { spacing400 } from '@pocket/web-ui'
import { breakpointMediumTablet } from '@pocket/web-ui'
import { breakpointSmallTablet } from '@pocket/web-ui'
import { breakpointTinyTablet } from '@pocket/web-ui'

import { PocketWorthy } from 'components/content-headline/pocket-worthy'
import { ParsedHeadline } from 'components/content-headline/parsed-headline'
import { AuthorByline } from 'components/content-author/author-byline'
import { ArticleActions } from 'components/content-actions/article-actions'
import { PublisherAttribution } from 'components/content-publisher/publisher-attribution'
import { SaveArticleTop } from 'components/content-saving/save-article'
import { SaveArticleBottom } from 'components/content-saving/save-article'

import { TopicsBubbles } from 'components/article/topics-bubbles'
import { ParsedContent } from 'components/article/parsed-content'
import PublisherRecs from 'components/publisher-recs/publisher-recs'
import PocketRecs from 'components/pocket-recs/pocket-recs'
import { DepthTracking } from 'components/depth-tracking/depth-tracking'
import { ScrollPocketHitsChyron } from 'components/pocket-hits-chyron/scroll-pocket-hits-chyron'

import ProgrammaticAd, {
  AD_TYPE_VERTICAL,
  AD_TYPE_HORIZONTAL_LG,
  AD_TYPE_HORIZONTAL_M
} from 'components/programmatic-ad/programmatic-ad'

// Syndicated Article Ad IDs
const ABOVE_THE_FOLD = 'div-gpt-ad-6843487-1'
const RIGHT_RAIL_1_ID = 'div-gpt-ad-6843487-2'
const RIGHT_RAIL_2_ID = 'div-gpt-ad-6843487-7'
const BELOW_THE_FOLD = 'div-gpt-ad-6843487-4'
// unused ad slots
const MIDDLE_OF_ARTICLE = 'div-gpt-ad-6843487-3'
const NATIVE_SYNDICATION = 'div-gpt-ad-6843487-5'
const NATIVE_FRONT_DOOR = 'div-gpt-ad-6843487-6'

const atfAdStyles = css`
  margin-bottom: var(--spacing250);
  border-bottom: 3px solid var(--color-actionPrimaryHover);
  padding-bottom: 3rem;
`
const rightRailAdStyles = css`
  margin: 0 0 ${spacing400};
`
const rightRailAdWithLabelStyles = css`
  margin: -22px 0 ${spacing400}; /* negative top margin here helps align label */
`
const btfAdStyles = css`
  margin-top: ${spacing400};
`

const PH_THRESHOLD_PERCENTAGE = 0.75

// Not using grid style here because we don't export in a way that
// can be composed with `css`.  Once that is updated, we can stick
// it back in.  But until then we will have some unexpected layout
// import { gridStyle } from '@pocket/web-ui'
/* ${gridStyle};  This should be exported as an object style */
const main = css`
  display: grid;
  align-items: start;
  justify-content: space-between;
  grid-column-gap: var(--spacing150);
  grid-row-gap: var(--spacing150);
  /* this is a 12 column grid */
  grid-template-columns: repeat(12, 1fr);
  grid-auto-flow: dense;

  box-sizing: content-box;
  padding: 0;
  grid-column-gap: 24px;

  ${breakpointSmallTablet} {
    grid-column-gap: 16px;
  }

  .spacing {
    grid-column-start: 2;
    grid-column-end: span 7;
    min-width: 0;

    ${breakpointMediumTablet} {
      grid-column-end: span 10;
    }

    ${breakpointSmallTablet} {
      grid-column-start: 2;
      grid-column-end: span 11;
    }

    ${breakpointTinyTablet} {
      grid-column-start: 1;
      grid-column-end: span 12;
    }

    &.isMobileWebView {
      grid-column-start: 1;
      grid-column-end: span 8;

      ${breakpointMediumTablet} {
        grid-column-end: span 11;
      }

      ${breakpointTinyTablet} {
        grid-column-start: 1;
        grid-column-end: span 12;
      }
    }
  }
`

const SocialWrapper = css`
  position: sticky;
  top: 6rem;
  grid-column-end: span 1;

  aside {
    display: flex;
    flex-direction: column;
  }

  div {
    margin-bottom: var(--spacing100);
    margin-right: 0;
  }

  ${breakpointSmallTablet} {
    grid-column-end: span 1;
  }

  ${breakpointTinyTablet} {
    position: static;
    grid-column-end: span 12;

    aside {
      flex-direction: row;
    }
    div {
      margin-bottom: 0;
      margin-right: var(--spacing100);
    }
  }
`

const ArticleWrapper = css`
  grid-column-end: span 7;

  ${breakpointMediumTablet} {
    grid-column-end: span 6;
  }

  ${breakpointSmallTablet} {
    grid-column-end: span 11;
  }

  ${breakpointTinyTablet} {
    grid-column-end: span 12;
  }

  &.isMobileWebView {
    grid-column-end: span 8;

    ${breakpointMediumTablet} {
      grid-column-end: span 7;
    }

    ${breakpointSmallTablet} {
      grid-column-end: span 12;
    }
  }
`

const SidebarWrapper = css`
  grid-column-end: span 4;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;

  ${breakpointMediumTablet} {
    grid-column-end: span 5;
  }

  ${breakpointSmallTablet} {
    display: none;
    grid-column-end: span 0;
  }
`

const stickyContainerStyles = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;

  // assign direct children position sticky
  & > * {
    position: sticky;
    top: 6rem;
    margin-bottom: var(--spacing400);
  }
`

const StickyContainer = ({ children, className }) => (
  <div className={cx(stickyContainerStyles, className, 'sticky')}>{children}</div>
)

// Possible query params passed via url
const ValidParams = {
  // hide unneeded elements when rendered by native apps
  mobile_web_view: false,
  // external state being managed by native apps
  premium_user: false
}

export default function SyndicatedArticle({ url, queryParams = ValidParams }) {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.user?.auth)
  const isPremium = useSelector((state) => state.user?.premium_status)
  const oneTrustReady = useSelector((state) => state.oneTrust?.trustReady)
  const adsEnabled = useSelector((state) => state.oneTrust?.advertising.enabled)

  // modify rendered elements when query params are passed in
  const { mobile_web_view, premium_user } = queryParams
  const isMobileWebView = mobile_web_view === 'true'
  const isPremiumUser = premium_user === 'true' || isPremium === '1'

  const articleData = useSelector((state) => state.syndicatedArticle.articleData)
  const saveStatus = useSelector((state) => state.syndicatedArticle.saveStatus)
  const publisherRecs = useSelector((state) => state.recit.publisherRecs)
  const pocketRecs = useSelector((state) => state.recit.pocketRecs)
  const recIds = {
    [PUBLISHER_MODULE]: useSelector((state) => state.recit.publisherRecId),
    [POCKET_MODULE]: useSelector((state) => state.recit.pocketRecId)
  }
  const recModels = {
    [PUBLISHER_MODULE]: useSelector((state) => state.recit.publisherRecModel),
    [POCKET_MODULE]: useSelector((state) => state.recit.pocketRecModel)
  }
  const topics = useSelector((state) => state.topicList?.topicsByName)

  useEffect(() => {
    trackPageView()
    dispatch(publisherRecsRequest(originalItemId))
    dispatch(pocketRecsRequest(originalItemId))
  }, [dispatch])

  if (!articleData) {
    return <ErrorPage statusCode={404} />
  }

  const {
    itemId,
    originalItemId,
    title,
    excerpt,
    publisher,
    authorNames,
    content,
    publishedAt,
    publisherId,
    publisherUrl,
    mainImage,
    slug,
    iabTopCategory,
    iabSubCategory,
    curationCategory,
    legacyId,
    showAds
  } = articleData

  const allowAds = isPremiumUser ? false : showAds
  const shouldShowAds = allowAds && oneTrustReady && adsEnabled

  const saveAction = (savedUrl) => {
    if (saveStatus === 'saved') dispatch(unSaveArticleItem(itemId))
    if (saveStatus !== 'saved') dispatch(saveArticleItem(savedUrl))
  }

  const adTargetingMetadata = {
    iabTopCategory,
    iabSubCategory,
    legacyId, // this will have to be `id` provided by graphql eventually, as legacyId will be deprecated by backend in the future
    nav: null
  }

  const handleRecImpression = ({ position, resolvedId, module, location }) => {
    trackRecImpression({
      model: recModels[module],
      recId: recIds[module],
      articleId: legacyId,
      position,
      resolvedId,
      module,
      location
    })
  }

  const handleRecClick = ({ position, resolvedId, module, location }) => {
    trackRecClick({
      model: recModels[module],
      recId: recIds[module],
      articleId: legacyId,
      position,
      resolvedId,
      module,
      location
    })
  }

  const trackSaveClick = (identifier) => {
    sendSaveToSnowplow({
      identifier,
      itemId,
      url
    })

    trackShareClick('Pocket')
  }

  const articleMetaData = {
    url,
    title,
    description: excerpt,
    image: mainImage,
    type: 'article'
  }
  const canonical = publisher?.attributeCanonicalToPublisher ? publisherUrl : url

  const ArticleLayout = isMobileWebView ? MobileLayout : Layout

  return (
    <Fragment>
      <ArticleLayout title={title} metaData={articleMetaData} canonical={canonical}>
        <section className={main}>
          <div className="spacing">
            <ProgrammaticAd
              id={ABOVE_THE_FOLD}
              positionAlias="ATF"
              type={AD_TYPE_HORIZONTAL_LG}
              adTargetingMetadata={adTargetingMetadata}
              showAd={isPremiumUser ? false : showAds}
              instanceStyles={atfAdStyles}
            />
          </div>
        </section>
        <header className={main}>
          <div className={classNames('spacing', { isMobileWebView })}>
            <PocketWorthy />
            <ParsedHeadline title={title} description={excerpt} />
            <AuthorByline
              url={publisher?.url}
              name={publisher?.name}
              showAuthors={publisher?.showAuthors}
              authorNames={authorNames}
            />
            <SaveArticleTop
              trackSaveClick={trackSaveClick}
              isAuthenticated={isAuthenticated}
              saveAction={saveAction}
              saveStatus={saveStatus}
              url={url}
            />
          </div>
        </header>

        <article className={main}>
          {!isMobileWebView ? (
            <aside className={SocialWrapper}>
              <ArticleActions
                title={title}
                excerpt={excerpt}
                saveAction={saveAction}
                saveStatus={saveStatus}
                isAuthenticated={isAuthenticated}
                handleShareClick={trackShareClick}
                trackSaveClick={trackSaveClick}
                slug={slug}
              />
            </aside>
          ) : null}

          <article className={classNames(ArticleWrapper, { isMobileWebView })}>
            <DepthTracking onScrollDepth={trackScrollDepth}>
              <ParsedContent content={content?.content} />
            </DepthTracking>
          </article>

          <section className={SidebarWrapper}>
            {allowAds ? (
              <StickyContainer
                className={shouldShowAds ? rightRailAdWithLabelStyles : rightRailAdStyles}>
                <ProgrammaticAd
                  id={RIGHT_RAIL_1_ID}
                  positionAlias="RightRail1"
                  type={AD_TYPE_VERTICAL}
                  adTargetingMetadata={adTargetingMetadata}
                  showAd={shouldShowAds}
                />
              </StickyContainer>
            ) : null}
            <StickyContainer>
              <PublisherRecs
                recommendations={publisherRecs}
                publisher={publisher}
                maxRecommendations={3}
                handleRecImpression={handleRecImpression}
                handleRecClick={handleRecClick}
              />
            </StickyContainer>
            {allowAds ? (
              <StickyContainer
                className={shouldShowAds ? rightRailAdWithLabelStyles : rightRailAdStyles}>
                <ProgrammaticAd
                  id={RIGHT_RAIL_2_ID}
                  positionAlias="RightRail2"
                  type={AD_TYPE_VERTICAL}
                  adTargetingMetadata={adTargetingMetadata}
                  showAd={shouldShowAds}
                />
              </StickyContainer>
            ) : null}
          </section>
        </article>

        <footer className={main}>
          <div className={classNames('spacing', { isMobileWebView })}>
            <SaveArticleBottom
              trackSaveClick={trackSaveClick}
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
            <ProgrammaticAd
              id={BELOW_THE_FOLD}
              positionAlias="BTF"
              type={AD_TYPE_HORIZONTAL_M}
              adTargetingMetadata={adTargetingMetadata}
              showAd={isPremiumUser ? false : showAds}
              instanceStyles={btfAdStyles}
            />

            {!isMobileWebView ? (
              <Fragment>
                <PocketRecs
                  recommendations={pocketRecs}
                  maxRecommendations={5}
                  handleRecImpression={handleRecImpression}
                  handleRecClick={handleRecClick}
                />
                <TopicsBubbles topics={topics} />
              </Fragment>
            ) : null}
          </div>
        </footer>
      </ArticleLayout>

      {/* Chyron needs to sit outside of layout to span full width */}
      <ScrollPocketHitsChyron
        isAuthenticated={true || isAuthenticated || isMobileWebView} // Manually suppressing Chyron
        instanceId="syndicated-ph-signup"
        thresholdPercent={PH_THRESHOLD_PERCENTAGE}
        utmCampaign="article-chyron"
        utmSource="syndication"
        handleSubmit={trackEmailSubmit}
        handleSubmitSuccess={trackEmailSubmitSuccess}
        handleSubmitFailure={trackEmailSubmitFailure}
        handleValidationError={trackEmailValidationError}
        handleEmailInputFocus={trackEmailInputFocus}
        onVisible={trackEmailImpression}
        handleEmailDismiss={trackEmailDismiss}
      />
    </Fragment>
  )
}
