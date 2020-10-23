import React from 'react'
import { css } from 'linaria'
import { domainForUrl, urlWithPocketRedirect } from 'common/utilities'
import classNames from 'classnames'
import { DivideDot } from 'components/divider/divider'
import { getTimeToRead } from 'common/utilities'

const detailsWrapper = css`
  font-size: 0; /* Fight the extra inline padding */
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
  display: flex;
  width: 100%;
  padding: 6px 0 0;
  justify-content: flex-start;
  align-items: center;
  color: var(--color-textTertiary);
`

const domainWrapper = css`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  font-style: normal;
  max-width: 65%;
  a,
  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: var(--color-textTertiary);
    text-decoration: none;
    &:hover {
      color: var(--color-textLinkHover);
    }
    &.noLink:hover {
      color: inherit;
    }
  }
  a {
    cursor: pointer;
  }
`

const timeWrapper = css`
  display: block;
  color: var(--color-textLinkHover);
`

export const ItemTime = ({ word_count, has_video, videos }) => {
  const timeDisplay = getTimeToRead({ word_count, has_video, videos }, true)

  return timeDisplay ? (
    <React.Fragment>
      <DivideDot />
      <div className={timeWrapper}>{timeDisplay}</div>
    </React.Fragment>
  ) : null
}

export const ItemDomain = ({
  resolved_url,
  given_url,
  noLink,
  domain_metadata,
  onExternalLink
}) => {
  const domain = domain_metadata
    ? domain_metadata.name
    : domainForUrl(resolved_url)

  const url = given_url || resolved_url

  return domain ? (
    <cite className={classNames(domainWrapper, { noLink })}>
      {noLink ? (
        <span>{domain}</span>
      ) : (
        <a
          href={urlWithPocketRedirect(url)}
          target="_blank" //eslint-disable-line
          onClick={onExternalLink}>
          {domain}
        </a>
      )}
    </cite>
  ) : (
    <div />
  )
}

export const ShareSheetInfo = ({
  has_video,
  word_count,
  videos,
  resolved_url,
  given_url,
  noLink,
  domain_metadata,
  onExternalLink
}) => {
  const timeEstimateProps = {
    word_count,
    has_video,
    videos
  }

  return (
    <div className={detailsWrapper}>
      <ItemDomain
        onExternalLink={onExternalLink}
        domain_metadata={domain_metadata}
        resolved_url={resolved_url}
        given_url={given_url}
        noLink={noLink}
      />
      <ItemTime {...timeEstimateProps} />
    </div>
  )
}
