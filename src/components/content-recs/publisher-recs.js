import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'linaria'
import { numberWithCommas } from 'common/utilities'
import VisibilitySensor from 'components/visibility-sensor/visibility-sensor'

import { Trans } from 'next-i18next'

const publisherWrap = css`
  & > div {
    position: sticky;
    top: 6rem;
    margin: 0 0 4rem;
    margin-top: -22px;
  }
`

const publisherStyles = css`
  img {
    width: 60px;
    height: 60px;
    margin-bottom: var(--spacing100);

    .colormode-dark &,
    .colormode-sepia & {
      border-radius: 4px;
    }
  }
  p {
    color: var(--color-textTertiary);
    font-family: var(--fontSansSerif);
    font-size: var(--fontSize125);
    margin-bottom: var(--spacing050);
  }
  .publisher-name {
    font-family: var(--fontSansSerif);
    font-weight: 600;
    color: var(--color-textSecondary);
  }
`

export const Publisher = ({ recommendationName, name, logo }) => {
  const publisherName = recommendationName || name || 'Publisher'
  return (
    <div className={publisherStyles}>
      {logo ? <img data-cy="publisher-logo" src={logo.url} alt={publisherName} /> : null}
      <h6 className="publisher-name" data-cy="publisher-recs-publisher-name">
        <Trans i18nKey="discover:more-from-publisher">More from {{ publisherName }}</Trans>
      </h6>
    </div>
  )
}

const saveCountStyles = css`
  color: var(--color-textSecondary);
  font-family: var(--fontSansSerif);
  font-size: var(--fontSize100);
  padding-bottom: var(--spacing100);
  line-height: 24px;
`

const SaveCount = ({ count }) => (
  <div className={saveCountStyles}>
    <Trans i18nKey="discover:save-count" count={numberWithCommas(count)}>
      {{ count }} saves
    </Trans>
  </div>
)

const recommendedArticleStyles = css`
  list-style: none;
  border-bottom: solid 1px var(--color-dividerTertiary);
  margin-top: var(--spacing150);

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    border: none;
  }

  .title {
    font-family: var(--fontSerif);
    font-size: var(--fontSize125);
    line-height: 130%;
    font-weight: bold;
    text-decoration: none;
    padding-bottom: var(--spacing100);
    display: block;
  }
`

export const RecommendedArticle = ({ title, saveCount, targetUrl, handleClick }) => (
  <li className={recommendedArticleStyles} data-cy="publisher-recs-article">
    {/*eslint-disable-next-line*/}
    <a onClick={handleClick} className="title" href={targetUrl} target="_blank">
      {title}
    </a>
    <SaveCount count={saveCount} />
  </li>
)

const recommendationsStyles = css`
  /*set ems in this component relative to 16px. getting clobbered by typography base style targeting ul */
  font-size: 16px;
  padding: 0;
`
const RecommendedArticles = ({
  recommendations,
  maxRecommendations,
  handleRecImpression,
  handleRecClick
}) => {
  return (
    <ul className={recommendationsStyles}>
      {recommendations.slice(0, maxRecommendations).map((r, position) => {
        const { save_count: saveCount, target_url: targetUrl, item, syndicated_article } = r
        if (!item) {
          return null
        }

        const { title: itemTitle, item_id: itemId, resolved_id: resolvedId } = item

        const title = syndicated_article?.title || itemTitle
        const url = targetUrl.replace(
          'getpocket.com/redirect?',
          'getpocket.com/redirect?skipSyndication=1&'
        )

        function handleVisible() {
          handleRecImpression({
            resolvedId,
            position
          })
        }

        function handleClick() {
          handleRecClick({
            resolvedId,
            position
          })
        }

        return (
          <VisibilitySensor key={itemId} onVisible={handleVisible}>
            <RecommendedArticle
              title={title}
              saveCount={saveCount}
              targetUrl={url}
              handleClick={handleClick}
            />
          </VisibilitySensor>
        )
      })}
    </ul>
  )
}

export const PublisherRecs = ({
  publisher,
  recommendations,
  maxRecommendations,
  handleRecImpression,
  handleRecClick
}) => {
  if (recommendations.length === 0) return null

  return (
    <div className={publisherWrap}>
      <div>
        <Publisher {...publisher} data-cy="publisher-header" />
        <RecommendedArticles
          data-cy="recommended-articles"
          recommendations={recommendations}
          maxRecommendations={maxRecommendations}
          handleRecImpression={handleRecImpression}
          handleRecClick={handleRecClick}
        />
      </div>
    </div>
  )
}

PublisherRecs.propTypes = {
  /**
   * Publisher object that includes the publisher name, logo, and custom button object
   */
  publisher: PropTypes.shape({
    recommendationName: PropTypes.string,
    logo: PropTypes.object
  }),

  /**
   * A list of recommended articles from the same publisher
   */
  recommendations: PropTypes.arrayOf(PropTypes.object),

  /**
   * The max number of recommended articles to display
   */
  maxRecommendations: PropTypes.number,

  /**
   * Callback function to fire on Rec impression
   */
  handleRecImpression: PropTypes.func,

  /**
   * Callback function to fire on Rec click
   */
  handleRecClick: PropTypes.func
}

PublisherRecs.defaultProps = {
  recommendations: [],
  maxRecommendations: 3,
  handleRecImpression() {},
  handleRecClick() {}
}
