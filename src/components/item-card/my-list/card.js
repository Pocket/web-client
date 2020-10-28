import React from 'react'
import { css, cx } from 'linaria'
import { testIdAttribute } from '@pocket/web-utilities/test-utils'

import { CardMedia } from './card-media'
import { ItemAction } from './item-action'
import { underliner } from 'components/underliner/underliner'
import { FeatureFlag } from 'connectors/feature-flags/feature-flags'

import { IosShareIcon } from '@pocket/web-ui'
import { DeleteIcon } from '@pocket/web-ui'
import { ArchiveIcon } from '@pocket/web-ui'
import { AddIcon } from '@pocket/web-ui'
import { FavoriteIcon } from '@pocket/web-ui'
import { AddCircledIcon } from '@pocket/web-ui'
import { CheckCircledIcon } from '@pocket/web-ui'
import { TagIcon } from '@pocket/web-ui'

const card = css`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid var(--color-dividerTertiary);
  padding: 0;
  font-family: var(--fontSansSerif);
  font-weight: 400;
  color: var(--color-textPrimary);
  position: relative;

  &.bulkEdit {
    cursor: pointer;
    user-select: none;
    a,
    .actions {
      pointer-events: none;
    }

    &.bulkSelected .title {
      --color-underliner: var(--color-navCurrentTab);
    }
  }

  .bulkBacking {
    position: absolute;
    box-sizing: content-box;
    border-radius: var(--borderRadius);
    padding: 1em;
    width: 100%;
    height: 100%;
    transform: translate(-1em, -1em);
    display: none;
    z-index: -1;
  }

  &.bulkSelected .bulkBacking {
    background-color: var(--color-navCurrentTab);
    display: block;
  }

  &.fixedheightgrid {
    height: 355px;
  }

  &.fixedheightlist {
    height: 65px;
  }

  & > a {
    position: relative;
    display: block;
    height: 100%;
    width: 100%;
    padding-bottom: var(--size200);
    text-decoration: none;
    transition-property: color;
    transition-duration: 0.2s;
    transition-timing-function: ease;

    .title span {
      ${underliner};
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--color-textPrimary);
        .title span {
          background-color: var(--color-textPrimary);
          transition: background-color 300ms ease-in-out;
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
    padding-bottom: 0.5em;
  }

  .actions {
    display: flex;
  }

  &.bulkEdit .actions {
    flex-direction: row-reverse;
  }

  .bulkIconStyle {
    display: block;
    width: 22px;
    height: 22px;
  }
`

/**
 * This is the article card base. This takes a [feed_item](https://github.com/Pocket/spec/blob/master/model/feed_item.md)
 * out of the [feed](https://github.com/Pocket/spec/blob/master/query/v3server/feed.md)
 * and makes sure the appropriate data is represented.
 */
export const Card = ({
  item,
  fluidHeight,
  type,
  actions,
  bulkEdit,
  bulkSelected
}) => {
  const {
    resolved_id: id,
    title,
    thumbnail,
    publisher,
    excerpt,
    read_time,
    favorite,
    status,
    open_url = '',
    onOpen = () => {}
  } = item

  const {
    itemShare,
    itemDelete,
    itemArchive,
    itemUnArchive,
    itemFavorite,
    itemUnFavorite,
    itemTag,
    itemBulkSelect,
    itemBulkDeSelect
  } = actions

  const cardType = type === 'list' ? 'fixedheightlist' : 'fixedheightgrid'
  const cardClass = cx(
    card,
    fluidHeight && cardType,
    bulkEdit && 'bulkEdit',
    bulkSelected && 'bulkSelected'
  )

  const archiveAction = status === '0' ? itemArchive : itemUnArchive
  const CorrectArchiveIcon = status === '0' ? ArchiveIcon : AddIcon
  const archiveLabel = status === '0' ? 'Archive' : 'Add'

  const favoriteAction = favorite === '0' ? itemFavorite : itemUnFavorite
  const CorrectFavIcon = favorite === '0' ? FavoriteIcon : FavoriteIcon // FavoriteFilledIcon <- Icon is broken
  const favoriteLabel = favorite === '0' ? 'Favorite' : 'UnFavorite'

  const selectBulk = (event) => {
    const withShift = event.shiftKey
    if (bulkEdit)
      return bulkSelected
        ? itemBulkDeSelect(withShift)
        : itemBulkSelect(withShift)
  }

  return (
    <article
      className={cardClass}
      key={id}
      {...testIdAttribute(`article-card-${id}`)}
      onClick={selectBulk}>
      <div className="bulkBacking" />
      <FeatureFlag flag="temp.web.client.dev.card.item_id_overlay" dev={true}>
        <span className="idOverlay">{id}</span>
      </FeatureFlag>
      <a href={open_url} onClick={onOpen}>
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
          </cite>
          <p className="excerpt">{excerpt}</p>
        </div>
      </a>
      <footer className="footer">
        <div className="actions">
          {bulkEdit ? (
            bulkSelected ? (
              <CheckCircledIcon className="bulkIconStyle" />
            ) : (
              <AddCircledIcon className="bulkIconStyle" />
            )
          ) : (
            <ItemAction
              menuItems={[
                {
                  label: 'Share',
                  icon: <IosShareIcon />,
                  onClick: itemShare
                },
                {
                  label: 'Delete',
                  icon: <DeleteIcon />,
                  onClick: itemDelete
                },
                {
                  label: archiveLabel,
                  icon: <CorrectArchiveIcon />,
                  onClick: archiveAction
                },
                {
                  label: favoriteLabel,
                  icon: <CorrectFavIcon />,
                  onClick: favoriteAction
                },
                {
                  label: 'Tag',
                  icon: <TagIcon />,
                  onClick: itemTag
                }
              ]}
              placement="top-end"
              alignRight={true}
            />
          )}
        </div>
      </footer>
    </article>
  )
}
