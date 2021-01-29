import React from 'react'
import { css, cx } from 'linaria'
import { testIdAttribute } from '@pocket/web-utilities/test-utils'
import { urlWithPocketRedirect } from 'common/utilities'
import VisibilitySensor from 'components/visibility-sensor/visibility-sensor'
import { useTranslation } from 'common/setup/i18n'

import { CardMedia } from 'components/media/card-media'
import { ItemActions } from './item-actions'
import { ItemMenu } from './item-menu'
import { ItemTags } from './item-tags'

import { FeatureFlag } from 'connectors/feature-flags/feature-flags'

import { DeleteIcon } from '@pocket/web-ui'
import { ArchiveIcon } from '@pocket/web-ui'
import { AddIcon } from '@pocket/web-ui'
import { FavoriteIcon } from '@pocket/web-ui'
import { EmptyCircledIcon } from '@pocket/web-ui'
import { CheckCircledIcon } from '@pocket/web-ui'
import { TagIcon } from '@pocket/web-ui'
import Link from 'next/link'

const card = css`
  width: 100%;
  height: 100%;
  padding: 0;
  font-family: var(--fontSansSerif);
  font-weight: 400;
  color: var(--color-textPrimary);
  position: relative;

  z-index: 0;
  &:hover {
    z-index: 1;
  }

  /* &.actionsShown {
    border-bottom-color: transparent;
  } */

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
    width: 100%;
    height: 100%;
    transform: translate(-1.1em, -1.1em);
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
  }

  .actions {
    display: flex;
  }

  &.bulkEdit .actions {
    flex-direction: row-reverse;
  }

  &.bulkEdit .footer {
    bottom: 12px;
  }

  .bulkIconStyle {
    display: block;
    width: 32px;
    height: 32px;
    padding: 5px;
    margin-top: 0;
  }
`

/**
 * This is the article card base. This takes a [feed_item](https://github.com/Pocket/spec/blob/master/model/feed_item.md)
 * out of the [feed](https://github.com/Pocket/spec/blob/master/query/v3server/feed.md)
 * and makes sure the appropriate data is represented.
 */
export const Card = ({
  item,
  actions,
  bulkEdit,
  bulkSelected,
  onOpen,
  position,
  isPremium
}) => {
  const {
    item_id: id,
    title,
    thumbnail,
    publisher,
    excerpt,
    read_time,
    favorite,
    status,
    open_url,
    openExternal,
    tags
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
    itemBulkDeSelect,
    itemImpression,
    itemCopy
  } = actions

  const cardClass = cx(
    card,
    bulkEdit && 'bulkEdit',
    bulkSelected && 'bulkSelected'
  )

  const { t } = useTranslation()

  const archiveAction = status === '0' ? itemArchive : itemUnArchive
  const CorrectArchiveIcon = status === '0' ? ArchiveIcon : AddIcon
  const archiveLabel =
    status === '0'
      ? t('item-action:archive', 'Archive')
      : t('item-action:add', 'Add')

  const isFavorite = favorite === '1'
  const favoriteAction = isFavorite ? itemUnFavorite : itemFavorite

  const selectBulk = (event) => {
    const withShift = event.shiftKey
    if (bulkEdit)
      return bulkSelected
        ? itemBulkDeSelect(withShift)
        : itemBulkSelect(withShift)
  }

  const openUrl = openExternal ? urlWithPocketRedirect(open_url) : `/read/${id}`

  return (
    <VisibilitySensor onVisible={itemImpression}>
      <article
        className={cardClass}
        key={id}
        {...testIdAttribute(`article-card-${id}`)}
        onClick={selectBulk}>
        <div className="bulkBacking" />
        <FeatureFlag flag="temp.web.client.dev.card.item_id_overlay" dev={true}>
          <span className="idOverlay">
            {id}: {position}
          </span>
        </FeatureFlag>
        <Link href={openUrl}>
          <a
            onClick={onOpen}
            // eslint-disable-next-line react/jsx-no-target-blank
            target={openExternal ? '_blank' : undefined}>
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
        </Link>
        <footer className="footer">
          <ItemTags tags={tags} />
          <div className="actions">
            {bulkEdit ? (
              bulkSelected ? (
                <CheckCircledIcon className="bulkIconStyle" />
              ) : (
                <EmptyCircledIcon className="bulkIconStyle" />
              )
            ) : (
              <>
                <ItemActions
                  menuItems={[
                    {
                      key: `favorite-${id}`,
                      label: isFavorite
                        ? t('item-action:unfavorite', 'Un-Favorite')
                        : t('item-action:favorite', 'Favorite'),
                      icon: <FavoriteIcon />,
                      onClick: favoriteAction,
                      active: isFavorite
                    },
                    {
                      key: `archive-${id}`,
                      label: archiveLabel,
                      icon: <CorrectArchiveIcon />,
                      onClick: archiveAction
                    },
                    {
                      key: `tag-${id}`,
                      label: t('item-action:tag', 'Tag'),
                      icon: <TagIcon />,
                      onClick: itemTag
                    },
                    {
                      key: `delete-${id}`,
                      label: t('item-action:delete', 'Delete'),
                      icon: <DeleteIcon />,
                      onClick: itemDelete
                    }
                  ]}
                />
                <ItemMenu
                  openId={id}
                  openUrl={open_url}
                  itemShare={itemShare}
                  itemCopy={itemCopy}
                  isPremium={isPremium}
                  title={title}
                />
              </>
            )}
          </div>
        </footer>
      </article>
    </VisibilitySensor>
  )
}
