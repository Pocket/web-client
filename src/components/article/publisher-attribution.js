import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'linaria'
import { Button } from '@pocket/web-ui'
import { getPublishedDate } from 'common/utilities'
import { breakpointLargeHandset } from '@pocket/web-ui'
import VisibilitySensor from 'components/visibility-sensor/visibility-sensor'

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
  aside {
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
    aside {
      p {
        margin: 0 0 var(--spacing075);
      }
    }
  }
`

function FollowPublisher({ leadIn, text, url, handleImpression, handleClick }) {
  return (
    <VisibilitySensor onVisible={handleImpression}>
      <aside data-cy="follow-publisher">
        <p>{leadIn}</p>
        <Button
          variant="secondary"
          onClick={handleClick}
          href={url}
          /* eslint-disable-next-line */
          target="_blank">
          {text}
        </Button>
      </aside>
    </VisibilitySensor>
  )
}

function PublisherInfo({ logoWide, publishedAt, name }) {
  return name ? (
    <React.Fragment>
      <hr />
      {logoWide ? (
        <img src={logoWide.url} data-cy="publisher-img" />
      ) : null}
      <p>
        This post originally appeared on {name} and was published{' '}
        {getPublishedDate(publishedAt)}. This article is republished here with
        permission.
      </p>
    </React.Fragment>
  ) : null
}

function PublisherAttribution({
  publisher,
  publishedAt,
  handlePublisherImpression,
  handlePublisherClick
}) {
  function handleImpression() {
    handlePublisherImpression(publisher.name)
  }

  function handleClick() {
    handlePublisherClick(publisher.name)
  }

  return publisher ? (
    <footer className={AttributionWrapper}>
      <PublisherInfo
        logoWide={publisher.logoWide}
        publishedAt={publishedAt}
        name={publisher.name}
      />
      {publisher.articleCta ? (
        <FollowPublisher
          {...publisher.articleCta}
          handleImpression={handleImpression}
          handleClick={handleClick}
        />
      ) : null}
    </footer>
  ) : null
}

PublisherAttribution.propTypes = {
  /**
   * Publisher object that includes the publisher name, logo, and custom button object
   */
  publisher: PropTypes.shape({
    logoWide: PropTypes.object,
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

PublisherAttribution.defaultProps = {
  publisher: null,
  handlePublisherImpression() {},
  handlePublisherClick() {}
}

export { PublisherAttribution }
