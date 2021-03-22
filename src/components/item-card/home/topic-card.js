import React from 'react'
import { css } from 'linaria'

import { CardMedia } from 'components/media/card-media'
import { SaveToPocket } from 'components/save-to-pocket/save-to-pocket'
import { FeatureFlag } from 'connectors/feature-flags/feature-flags'
import { SyndicatedBadge } from 'components/item-card/discover/syndicated-badge'
import { urlWithPocketRedirect } from 'common/utilities'
import { SaveFilledIcon } from '@pocket/web-ui'
import Link from 'next/link'

export const cardStyle = css`
  height: 100%;
  width: 100%;
  padding: 0;
  font-family: var(--fontSansSerif);
  font-weight: 400;
  color: var(--color-textPrimary);
  position: relative;

  & > a {
    position: relative;
    display: block;
    height: 100%;
    width: 100%;
    padding-bottom: var(--size400);
    text-decoration: none;
    transition-property: color;
    transition-duration: 0.2s;
    transition-timing-function: ease;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--color-textPrimary);
        .title span {
          text-decoration: underline;
        }
        .media {
          filter: brightness(0.95) saturate(0.8);
          transition: filter 300ms ease-in-out;
        }
      }
    }
  }

  .media {
    overflow: hidden;
    width: 100%;
    height: 0;
    padding-top: 66.66%;
    background-repeat: 'no-repeat';
    background-position: center;
    background-size: cover;
    transition-property: opacity;
    transition-duration: 0.2s;
    transition-timing-function: ease;
    border-radius: var(--size025);
  }

  .title {
    --color-underliner: var(--color-canvas);
    font-family: 'Graphik Web';
    font-weight: 600;
    line-height: 1.22;
    padding: var(--size100) 0 0;
    margin: 0;
    max-height: 4.6em;
    overflow: hidden;
  }

  .details {
    font-style: normal;
    padding: var(--size050) 0;
    display: block;
    color: var(--color-textSecondary);
  }

  .readtime {
    white-space: nowrap;
  }

  .syndicated {
    display: inline-block;
    padding-left: var(--spacing050);
  }

  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .actions {
    display: flex;
  }

  .savedItem {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: flex-start;
    font-size: var(--fontSize150);
    min-width: 3.913em;
    color: var(--color-textSecondary);
    cursor: pointer;
    padding-top: 8px;

    span {
      margin-top: 0;
    }

    svg {
      color: var(--color-actionBrand);
    }
  }

  .savedCopy {
    font-size: 0.667em;
    height: var(--size150);
    line-height: var(--size150);
    padding-left: 8px;

    a {
      text-decoration: none;
    }
  }
`

export const Card = React.forwardRef(
  ({ item, onSave, onOpen, isAuthenticated }, ref) => {
    const {
      resolved_id: id,
      title,
      thumbnail,
      publisher,
      open_url,
      read_time,
      save_status,
      syndicated,
      openExternal
    } = item

    const openUrl = openExternal ? open_url : `/read/${id}`

    return (
      <article
        className={cardStyle}
        key={id}
        ref={ref}
        data-cy={`home-card-${id}`}>
        {/*eslint-disable-next-line react/jsx-no-target-blank*/}
        <a href={open_url} onClick={onOpen} target="_blank">
          <CardMedia image_src={thumbnail} title={title} id={id} />
          <div className="content">
            <h2 className="title">
              <span>{title}</span>
            </h2>
            <cite className="details">
              <span>{publisher}</span>
              <span className="readtime">
                {read_time ? ` · ${read_time} min` : null}
              </span>
              {syndicated ? (
                <span className="syndicated" aria-label="Syndicated by Pocket">
                  <SyndicatedBadge />
                </span>
              ) : null}
            </cite>
          </div>
        </a>

        <footer className="footer">
          <div className="actions">
            {(save_status === 'saved') ? (
              <div className="savedItem">
                <SaveFilledIcon />
                <div className="savedCopy">
                  <Link href={openUrl}>
                    <a target={openExternal ? "_blank" : undefined}>Read now</a>
                  </Link>
                </div>
              </div>
            ) : (
              <SaveToPocket
                saveAction={onSave}
                isAuthenticated={isAuthenticated}
                saveStatus={save_status}
                id={id}
                readNow={true}
              />
            )}
          </div>
        </footer>
      </article>
    )
  }
)
