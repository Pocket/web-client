import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/css'
import { getPublishedDate } from 'common/utilities/date-time/date-time'
import { breakpointLargeHandset } from 'common/constants'
import VisibilitySensor from 'components/visibility-sensor/visibility-sensor'
import { Trans } from 'next-i18next'

const AttributionWrapper = css`
  hr {
    border: 0;
    height: 0;
    border-top: 1px solid var(--color-textSecondary);
    max-width: 7.375rem;
    margin: 2rem 0;
  }
  img {
    max-height: var(--size250);
  }
  p {
    margin: 2rem 0;
    font-family: var(--fontSerif);
    color: var(--color-textSecondary);
    font-style: italic;
    font-size: 1.25em;
  }
  .publisher-follow {
    p {
      color: var(--color-textPrimary);
      font-family: var(--fontSansSerif);
      font-weight: 600;
      font-size: var(--fontSize100);
      font-style: normal;
      display: inline-block;
      margin: 0 1.1875rem var(--spacing100) 0;
    }
    a.secondary {
      font-weight: 500;
      padding: 0.5625rem 1.1875rem;
    }
  }

  ${breakpointLargeHandset} {
    text-align: center;

    hr {
      max-width: unset;
      margin: var(--spacing100) 0;
    }
    p {
      margin: var(--spacing100) 0 1.3125rem;
      font-size: 0.875em;
    }
    .publisher-follow p {
      margin: 0 0 var(--spacing075);
    }
  }
`

function FollowPublisher({ leadIn, text, url, handleImpression, handleClick }) {
  const onVisible = () => handleImpression(text)
  const onClick = () => handleClick(text)

  return (
    <VisibilitySensor onVisible={onVisible}>
      <div className="publisher-follow" data-testid="follow-publisher">
        <p>{leadIn}</p>
        <a
          className="button secondary"
          onClick={onClick}
          href={url}
          /* eslint-disable-next-line */
          rel="noopener">
          {text}
        </a>
      </div>
    </VisibilitySensor>
  )
}

function PublisherInfo({ logoWide, publishedAt, name }) {
  const publishedDate = getPublishedDate(publishedAt)
  return name ? (
    <>
      <hr />
      {logoWide ? (
        <img src={logoWide} data-testid="publisher-img" alt={`Logo for ${name}`} />
      ) : null}
      <p>
        <Trans i18nKey="discover:publisher-attribution">
          This post originally appeared on {{ name }} and was published {{ publishedDate }}. This
          article is republished here with permission.
        </Trans>
      </p>
    </>
  ) : null
}

function PublisherAttribution({
  publisher = null,
  handlePublisherImpression = () => {},
  handlePublisherClick = () => {},
  publishedAt
}) {
  return publisher ? (
    <cite className={AttributionWrapper}>
      <PublisherInfo
        logoWide={publisher.logoWide}
        publishedAt={publishedAt}
        name={publisher.name}
      />
      {publisher.articleCta ? (
        <FollowPublisher
          {...publisher.articleCta}
          handleImpression={handlePublisherImpression}
          handleClick={handlePublisherClick}
        />
      ) : null}
    </cite>
  ) : null
}

PublisherAttribution.propTypes = {
  /**
   * Publisher object that includes the publisher name, logo, and custom button object
   */
  publisher: PropTypes.shape({
    logoWide: PropTypes.string,
    name: PropTypes.string,
    articleCta: PropTypes.object
  }),

  /**
   * Published date as a string: e.g 4/1/2019
   */
  publishedAt: PropTypes.string,

  /**
   * Callback function to fire an event on impression
   */
  handlePublisherImpression: PropTypes.func,

  /**
   * Callback function to fire an event on click
   */
  handlePublisherClick: PropTypes.func
}

export { PublisherAttribution }
