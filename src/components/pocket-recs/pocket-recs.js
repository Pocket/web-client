import React from 'react'
import PropTypes from 'prop-types'
import { css, cx } from 'linaria'
import { getImageCacheUrl } from 'common/utilities/urls/urls'
import { breakpointTinyTablet } from 'common/constants'
import { breakpointMediumTablet } from 'common/constants'
import { breakpointLargeHandset } from 'common/constants'
import VisibilitySensor from 'components/visibility-sensor/visibility-sensor'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

const headingStyles = css`
  font-family: var(--fontSerifAlt);
`
const Heading = () => {
  const { t } = useTranslation()
  return (
    <h3 className={cx('h6', headingStyles)} data-cy="pocket-recs-heading">
      {t('discover:more-stories-from-pocket', 'More Stories from Pocket')}
    </h3>
  )
}

const publisherStyles = css`
  margin-bottom: 8px;

  img {
    max-height: 30px;

    .colormode-dark & {
      mix-blend-mode: exclusion;
      filter: invert(1);
    }

    .colormode-sepia & {
      mix-blend-mode: multiply;
    }
  }

  span {
    font-size: 20px;
    line-height: 147%;
    font-family: var(--fontSansSerif);
    font-weight: 500;
    color: var(--color-textSecondary);
  }

  ${breakpointTinyTablet} {
    margin-top: 16px;
  }
`
export const Publisher = ({ name, logo }) => (
  <div className={publisherStyles}>
    {logo ? (
      <img src={logo} data-cy="pocket-rec-publisher-logo" alt={`Logo for ${name}`} />
    ) : (
      <span data-cy="pocket-rec-publisher-name">{name}</span>
    )}
  </div>
)

const recommendationStyles = css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1.5rem;
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }

  a {
    text-decoration: none;
  }
  .thumbnail {
    grid-column: 1 / 4;

    img {
      border-radius: 4px;
      width: 100%;
      object-fit: cover;
    }
  }
  .details {
    grid-column: 4 / 8;
  }
  .title {
    line-height: 122%;
  }

  ${breakpointMediumTablet} {
    grid-template-columns: repeat(10, 1fr);

    .thumbnail {
      grid-column: 1 / 5;
    }

    .details {
      grid-column: 5 / 11;
    }
  }

  ${breakpointTinyTablet} {
    display: flex;
    flex-direction: column;
    margin-right: 24px;
    max-width: 248px;
    margin-bottom: 0;

    h4 {
      line-height: 125%;
    }

    .thumbnail img {
      width: 248px;
    }
  }
`

export const Recommendation = ({
  rec,
  position,
  corpusRecommendationId,
  handleRecImpression,
  handleRecClick
}) => {
  if (!rec) return null
  const { imageUrl, title, url, publisher } = rec
  const thumbnailUrl = getImageCacheUrl(imageUrl, { width: 270, height: 150 })

  const handleVisible = () => {
    handleRecImpression({ position, corpusRecommendationId, url })
  }

  const handleClick = () => {
    handleRecClick({ position, corpusRecommendationId, url })
  }

  return (
    <VisibilitySensor onVisible={handleVisible}>
      <li className={recommendationStyles} data-cy="pocket-recs-article">
        <Link href={url}>
          <a className="thumbnail" onClick={handleClick}>
            <img src={thumbnailUrl} alt={`Thumbnail image for article`} />
          </a>
        </Link>
        <div className="details">
          <Publisher name={publisher} />
          <Link href={url}>
            <a onClick={handleClick}>
              <h4 className="h5">{title}</h4>
            </a>
          </Link>
        </div>
      </li>
    </VisibilitySensor>
  )
}

const pocketRecsStyles = css`
  border-top: solid 3px var(--color-textPrimary);
  margin-top: 40px;
  padding: 40px 0 0;

  ${breakpointTinyTablet} {
    max-width: 92vw;
  }

  ${breakpointLargeHandset} {
    padding-top: 24px;
  }
`

const recommendationsStyles = css`
  font-size: 16px; /* sets root size for list */
  list-style: none;
  padding: 0;

  ${breakpointTinyTablet} {
    width: 100%;
    overflow-x: scroll;
    overflow-scrolling: touch;
    display: flex;
    margin-bottom: 0;
  }
`

export const PocketRecs = ({
  recommendations,
  maxRecommendations,
  handleRecImpression,
  handleRecClick
}) => {
  if (recommendations.length === 0) return null

  const recsToDisplay = recommendations.slice(0, maxRecommendations)

  return (
    <div className={cx(pocketRecsStyles, 'pocket-recs')}>
      <Heading />
      <ul className={recommendationsStyles} data-cy="pocket-recommended-articles">
        {recsToDisplay.map(({ corpusItem, corpusRecommendationId }, index) => (
          <Recommendation
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
  )
}

PocketRecs.propTypes = {
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

PocketRecs.defaultProps = {
  recommendations: [],
  maxRecommendations: 3,
  handleRecImpression: () => {},
  handleRecClick: () => {}
}

export default PocketRecs
