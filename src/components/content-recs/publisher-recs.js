import PropTypes from 'prop-types'
import { css } from '@emotion/css'
import { useRef } from 'react'
import { useIntersectionObserver } from 'common/utilities/intersection/intersection'
import { useTranslation } from 'next-i18next'

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
    font-size: 1.25rem;
    margin-bottom: 8px;
  }
  .publisher-name {
    font-weight: 600;
    color: var(--color-textSecondary);
  }
`

export const Publisher = ({ recommendationName, name, logo }) => {
  const { t } = useTranslation()
  const publisherName = recommendationName || name || 'Publisher'
  return (
    <div className={publisherStyles}>
      {logo ? <img data-cy="publisher-logo" src={logo} alt={publisherName} /> : null}
      <h6 className="publisher-name" data-cy="publisher-recs-publisher-name">
        {t('discover:more-from-publisher', 'More from {{ publisherName }}', { publisherName })}
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
  const viewRef = useRef(null)
  const entry = useIntersectionObserver(viewRef, { freezeOnceVisible: true, threshold: 0.5 })

  if (!rec) return null
  const { title, url } = rec

  const handleVisible = () => {
    handleRecImpression({ position, corpusRecommendationId, url })
  }

  const handleClick = () => {
    handleRecClick({ position, corpusRecommendationId, url })
  }

  if (!!entry?.isIntersecting) handleVisible()

  return (
    <li className={recommendedArticleStyles} data-cy="publisher-recs-article" ref={viewRef}>
      <a
        onClick={handleClick}
        className="title"
        href={url}
        target="_blank"
        rel="noopener noreferrer">
        {title}
      </a>
    </li>
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
        <Publisher {...publisher} data-cy="publisher-header" />
        <ul className={recommendationsStyles} data-cy="publisher-recommended-articles">
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
