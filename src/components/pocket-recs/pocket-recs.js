import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'linaria'
import { getImageCacheUrl } from 'common/utilities'
import {
  breakpointTinyTablet,
  breakpointMediumTablet,
  breakpointLargeHandset
} from '@pocket/web-ui'
import VisibilitySensor from 'components/visibility-sensor/visibility-sensor'
import { POCKET_MODULE } from 'connectors/recit/recit.analytics'

const pocketRecsStyles = css`
  border-top: solid 3px var(--color-textPrimary);
  margin-top: var(--spacing250);
  padding: var(--spacing250) 0 0;

  ${breakpointTinyTablet} {
    max-width: 92vw;
  }

  ${breakpointLargeHandset} {
    padding-top: var(--spacing150);
  }
`

const headingStyles = css`
  font-family: var(--fontSerifAlt);
`
const Heading = () => (
  <h6 className={headingStyles}>More Stories from Pocket</h6>
)

const publisherStyles = css`
  margin-bottom: var(--spacing050);

  img {
    max-height: 30px;
  }

  span {
    text-transform: uppercase;
    font-size: var(--fontSize125);
    line-height: 147%;
    font-family: var(--fontSansSerif);
    color: var(--color-textSecondary);
  }

  ${breakpointTinyTablet} {
    margin-top: var(--spacing100);
  }
`
export const Publisher = ({ name, logo }) => (
  <div className={publisherStyles}>
    {logo ? (
      <img src={logo} data-cy="pocket-rec-publisher-logo" />
    ) : (
      <span data-cy="pocket-rec-publisher-name">{name}</span>
    )}
  </div>
)

const recommendationStyles = css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1.5rem;
  margin-bottom: var(--spacing150);

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
    margin-right: var(--spacing150);
    max-width: 248px;
    margin-bottom: 0;

    h5 {
      line-height: 125%;
    }

    .thumbnail img {
      width: 248px;
    }
  }
`

export const Recommendation = ({
  title,
  url,
  thumbnailUrl,
  publisher: { name, logoWideBwUrl },
  handleClick
}) => (
  <li className={recommendationStyles}>
    <a onClick={handleClick} className="thumbnail" href={url}>
      <img src={thumbnailUrl} />
    </a>
    <div className="details">
      <Publisher name={name} logo={logoWideBwUrl} />
      <a onClick={handleClick} href={url}>
        <h5>{title}</h5>
      </a>
    </div>
  </li>
)

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
export const Recommendations = ({
  recommendations,
  maxRecommendations,
  handleRecImpression,
  handleRecClick
}) => {
  return (
    <ul className={recommendationsStyles}>
      {recommendations.slice(0, maxRecommendations).map((r, position) => {
        const { syndicated_article } = r
        if (!syndicated_article) {
          return null
        }

        const {
          title,
          slug,
          topImageUrl,
          publisher,
          resolvedItem
        } = syndicated_article

        const url = `/explore/item/${slug}`

        function handleVisible() {
          handleRecImpression({
            location: 'Bottom',
            module: POCKET_MODULE,
            resolvedId: resolvedItem.resolvedId,
            position
          })
        }

        function handleClick(e) {
          e.preventDefault()
          handleRecClick({
            location: 'Bottom',
            module: POCKET_MODULE,
            resolvedId: resolvedItem.resolvedId,
            position
          })
          // timeout ensures analytics event completes
          setTimeout(() => (document.location.href = url), 250)
        }

        const preferredThumbnailSize = { width: 270, height: 150 }
        return (
          <VisibilitySensor key={slug} onVisible={handleVisible}>
            <Recommendation
              title={title}
              url={url}
              thumbnailUrl={getImageCacheUrl(
                topImageUrl,
                preferredThumbnailSize
              )}
              publisher={publisher}
              handleClick={handleClick}
            />
          </VisibilitySensor>
        )
      })}
    </ul>
  )
}

const PocketRecs = ({
  recommendations,
  maxRecommendations,
  handleRecImpression,
  handleRecClick
}) => {
  if (recommendations.length === 0) return null

  return (
    <div className={pocketRecsStyles}>
      <Heading data-cy="pocket-recs-heading" />
      <Recommendations
        data-cy="pocket-recommended-articles"
        recommendations={recommendations}
        maxRecommendations={maxRecommendations}
        handleRecImpression={handleRecImpression}
        handleRecClick={handleRecClick}
      />
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
  handleRecImpression() {},
  handleRecClick() {}
}

export default PocketRecs
