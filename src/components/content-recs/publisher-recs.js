import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/css'
import VisibilitySensor from 'components/visibility-sensor/visibility-sensor'
import { Trans } from 'next-i18next'

const publisherStyles = css`
  img {
    width: 60px;
    height: 60px;
    margin-bottom: 16px;

    .colormode-dark &,
    .colormode-sepia & {
      border-radius: 4px;
    }
  }
  p {
    color: var(--color-textTertiary);
    font-family: var(--fontSansSerif);
    font-size: 1.25rem;
    margin-bottom: 8px;
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
      {logo ? <img data-testid="publisher-logo" src={logo} alt={publisherName} /> : null}
      <h6 className="publisher-name" data-testid="publisher-recs-publisher-name">
        <Trans i18nKey="discover:more-from-publisher">More from {{ publisherName }}</Trans>
      </h6>
    </div>
  )
}

const recommendedArticleStyles = css`
  list-style: none;
  border-bottom: solid 1px var(--color-dividerTertiary);
  margin-top: 24px;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    border: none;
  }

  .title {
    font-family: var(--fontSerif);
    font-size: 1.25rem;
    line-height: 130%;
    font-weight: bold;
    text-decoration: none;
    margin-bottom: 24px;
    display: block;
  }
`

const RecommendedArticle = ({
  rec,
  position,
  corpusRecommendationId,
  handleRecImpression,
  handleRecClick
}) => {
  if (!rec) return null
  const { title, url } = rec

  const handleVisible = () => {
    handleRecImpression({ position, corpusRecommendationId, url })
  }

  const handleClick = () => {
    handleRecClick({ position, corpusRecommendationId, url })
  }

  return (
    <VisibilitySensor onVisible={handleVisible}>
      <li className={recommendedArticleStyles} data-testid="publisher-recs-article">
        <a
          onClick={handleClick}
          className="title"
          href={url}
          target="_blank"
          rel="noopener noreferrer">
          {title}
        </a>
      </li>
    </VisibilitySensor>
  )
}

const publisherWrap = css`
  & > div {
    position: sticky;
    top: 6rem;
    margin: 0 0 4rem;
    margin-top: -22px;
  }
`

const recommendationsStyles = css`
  font-size: 16px; /* sets root size for list */
  list-style: none;
  padding: 0;
`

export const PublisherRecs = ({
  publisher,
  recommendations = [],
  maxRecommendations = 3,
  handleRecImpression = () => {},
  handleRecClick = () => {}
}) => {
  if (recommendations.length === 0) return null

  const recsToDisplay = recommendations.slice(0, maxRecommendations)

  return (
    <div className={publisherWrap}>
      <div>
        <Publisher {...publisher} data-testid="publisher-header" />
        <ul className={recommendationsStyles} data-testid="publisher-recommended-articles">
          {recsToDisplay.map(({ corpusItem, corpusRecommendationId }, index) => (
            <RecommendedArticle
              key={corpusItem?.id}
              rec={corpusItem}
              position={index}
              corpusRecommendationId={corpusRecommendationId}
              handleRecImpression={handleRecImpression}
              handleRecClick={handleRecClick}
            />
          ))}
        </ul>
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
    logo: PropTypes.string
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
