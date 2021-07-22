import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { ItemActions } from 'components/item-actions/inline'
import { itemActionStyle } from 'components/item-actions/base'

import { IosShareIcon } from '@pocket/web-ui'
import { DeleteIcon } from '@pocket/web-ui'
import { ArchiveIcon } from '@pocket/web-ui'
import { AddIcon } from '@pocket/web-ui'
import { FavoriteIcon } from '@pocket/web-ui'
import { TagIcon } from '@pocket/web-ui'
import { PermanentCopyIcon } from '@pocket/web-ui'

import { EmptyCircledIcon } from '@pocket/web-ui'
import { CheckCircledIcon } from '@pocket/web-ui'

import { itemsArchiveAction } from 'connectors/items-by-id/my-list/items.archive'
import { itemsUnArchiveAction } from 'connectors/items-by-id/my-list/items.archive'

import { itemsFavoriteAction } from 'connectors/items-by-id/my-list/items.favorite'
import { itemsUnFavoriteAction } from 'connectors/items-by-id/my-list/items.favorite'

import { itemsDeleteAction } from 'connectors/items-by-id/my-list/items.delete'
import { itemsTagAction } from 'connectors/items-by-id/my-list/items.tag'
import { itemsShareAction } from 'connectors/items-by-id/my-list/items.share'

import { trackItemAction } from 'connectors/snowplow/snowplow.state'
import { trackItemOpen } from 'connectors/snowplow/snowplow.state'

export function ActionsMyList({ id, position }) {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const isPremium = useSelector((state) => state.user.premium_status === '1')
  const item = useSelector((state) => state.myListItemsById[id])

  if (!item) return null
  const { permanent_url, status, favorite } = item

  /** ITEM MENU ITEMS
  --------------------------------------------------------------- */
  const itemShare = () => {
    dispatch(trackItemAction(position, item, 'my-list.share'))
    dispatch(itemsShareAction({ id, position }))
  }

  const itemDelete = () => {
    dispatch(trackItemAction(position, item, 'my-list.delete'))
    dispatch(itemsDeleteAction([{ id, position }]))
  }

  const itemArchive = () => {
    dispatch(trackItemAction(position, item, 'my-list.archive'))
    dispatch(itemsArchiveAction([{ id, position }]))
  }
  const itemUnArchive = () => {
    // bool to denote save action
    dispatch(trackItemAction(position, item, 'my-list.unarchive', true))
    dispatch(itemsUnArchiveAction([{ id, position }]))
  }

  const itemFavorite = () => {
    dispatch(trackItemAction(position, item, 'my-list.favorite'))
    dispatch(itemsFavoriteAction([{ id, position }]))
  }
  const itemUnFavorite = () => {
    dispatch(trackItemAction(position, item, 'my-list.un-favorite'))
    dispatch(itemsUnFavoriteAction([{ id, position }])) //prettier-ignore
  }

  const itemTag = () => {
    dispatch(trackItemAction(position, item, 'my-list.tag'))
    dispatch(itemsTagAction([{ id, position }]))
  }

  const isArchive = status === '0'
  const archiveAction = isArchive ? itemArchive : itemUnArchive
  const CorrectArchiveIcon = isArchive ? ArchiveIcon : AddIcon
  const archiveLabel = isArchive ? t('item-action:archive', 'Archive') : t('item-action:add', 'Add')

  const isFavorite = favorite === '1'
  const favoriteAction = isFavorite ? itemUnFavorite : itemFavorite
  const favoriteLabel = isFavorite
    ? t('item-action:unfavorite', 'Un-Favorite')
    : t('item-action:favorite', 'Favorite')

  const itemPermLibOpen = () => {
    dispatch(trackItemOpen(position, item, 'my-list.card.permanent-library'))
  }

  return (
    <ItemActions
      menuItems={[
        {
          key: `favorite-${id}`,
          label: favoriteLabel,
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
          key: `share-${id}`,
          label: t('item-action:share', 'Share'),
          icon: <IosShareIcon />,
          onClick: itemShare
        },
        {
          key: `permanent-${id}`,
          label: t('item-action:permanent-copy', 'Permanent Copy'),
          isPremium,
          onlyPremium: true,
          href: permanent_url,
          icon: <PermanentCopyIcon />,
          onClick: itemPermLibOpen
        },
        {
          key: `delete-${id}`,
          label: t('item-action:delete', 'Delete'),
          icon: <DeleteIcon />,
          onClick: itemDelete
        }
      ]}
    />
  )
}

export function ActionsBulk({ id }) {
  const bulkList = useSelector((state) => state.bulkEdit.selected)
  const selected = bulkList?.map((item) => item.id).includes(id)

  const BulkIcon = selected ? CheckCircledIcon : EmptyCircledIcon
  return (
    <div className={`${itemActionStyle} actions`}>
      <div className="item-actions"></div>
      <div>
        <BulkIcon />
      </div>
    </div>
  )
}
