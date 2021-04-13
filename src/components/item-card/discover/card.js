import React from 'react'
import { css } from 'linaria'

import { CardMedia } from 'components/media/card-media'
import { ItemAction } from './item-action'
import { SyndicatedBadge } from './syndicated-badge'
import { SaveToPocket } from 'components/item-actions/save-to-pocket'
import { ReportIcon } from '@pocket/web-ui'
import { FeatureFlag } from 'connectors/feature-flags/feature-flags'

const card = css`
  height: 100%;
  width: 100%;
  border-bottom: 1px solid var(--color-dividerTertiary);
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

  .idOverlay {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: rgba(255, 255, 255, 0.5);
    padding: var(--spacing050);
    border-radius: var(--size025);
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
    font-family: 'Graphik Web';
    font-weight: 600;
    line-height: 1.22;
    padding: var(--size100) 0 0;
    margin: 0;
    max-height: 4.4em;
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

  .excerpt {
    font-size: var(--fontSize100);
    margin: 0;
    padding-bottom: 1em;
  }

  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-bottom: 1.5em;
  }

  .actions {
    display: flex;
  }
`

/**
 * This is the article card base. This takes a [feed_item](https://github.com/Pocket/spec/blob/master/model/feed_item.md)
 * out of the [feed](https://github.com/Pocket/spec/blob/master/query/v3server/feed.md)
 * and makes sure the appropriate data is represented.
 */
export const Card = React.forwardRef(
  ({ item, onSave, onOpen, onReportFeedback, isAuthenticated }, ref) => {
    const {
      resolved_id: id,
      title,
      thumbnail,
      publisher,
      excerpt,
      open_url,
      read_time,
      save_status,
      syndicated
    } = item

    return (
      <article className={card} key={id} ref={ref} data-cy={`article-card-${id}`}>
        <FeatureFlag flag="item_id_overlay" dev={true}>
          <span className="idOverlay">{id}</span>
        </FeatureFlag>
        <a href={open_url} onClick={onOpen} target={syndicated ? undefined : '_blank'}>
          <CardMedia image_src={thumbnail} title={title} id={id} />
          <div className="content">
            <h3 className="title">
              <span>{title}</span>
            </h3>
            <cite className="details">
              <span>{publisher}</span>
              <span className="readtime">{read_time ? ` · ${read_time} min` : null}</span>
              {syndicated ? (
                <span className="syndicated" aria-label="Syndicated by Pocket">
                  <SyndicatedBadge />
                </span>
              ) : null}
            </cite>
            <p className="excerpt">{excerpt}</p>
          </div>
        </a>
        <footer className="footer">
          <div className="actions">
            <SaveToPocket
              saveAction={onSave}
              isAuthenticated={isAuthenticated}
              saveStatus={save_status}
              id={id}
            />
            <ItemAction
              menuItems={[
                {
                  label: 'Report',
                  icon: <ReportIcon />,
                  onClick: () => {
                    onReportFeedback()
                  }
                }
              ]}
              placement="top-end"
              alignRight={true}
            />
          </div>
        </footer>
      </article>
    )
  }
)
