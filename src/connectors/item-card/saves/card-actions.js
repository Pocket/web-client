import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { ItemActions } from 'components/item-actions/inline'
import { itemActionStyle } from 'components/item-actions/base'

import { IosShareIcon } from 'components/icons/IosShareIcon'
import { DeleteIcon } from 'components/icons/DeleteIcon'
import { ArchiveIcon } from 'components/icons/ArchiveIcon'
import { AddIcon } from 'components/icons/AddIcon'
import { FavoriteIcon } from 'components/icons/FavoriteIcon'
import { TagIcon } from 'components/icons/TagIcon'
import { PermanentCopyIcon } from 'components/icons/PermanentCopyIcon'

import { EmptyCircledIcon } from 'components/icons/EmptyCircledIcon'
import { CheckCircledIcon } from 'components/icons/CheckCircledIcon'

import { itemsArchiveAction } from 'connectors/items-by-id/saves/items.archive'
import { itemsUnArchiveAction } from 'connectors/items-by-id/saves/items.archive'

import { itemsFavoriteAction } from 'connectors/items-by-id/saves/items.favorite'
import { itemsUnFavoriteAction } from 'connectors/items-by-id/saves/items.favorite'

import { itemsDeleteAction } from 'connectors/items-by-id/saves/items.delete'
import { itemsTagAction } from 'connectors/items-by-id/saves/items.tag'
import { itemsShareAction } from 'connectors/items-by-id/saves/items.share'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export function ActionsSaves({ id, position }) {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const isPremium = useSelector((state) => state.user.premium_status === '1')
  const item = useSelector((state) => state.savesItemsById[id])

  if (!item) return null
  const { permanentUrl, isFavorite, isArchived, analyticsData: passedAnalyticsData } = item
  const analyticsData = { ...passedAnalyticsData, id, position }

  /** ITEM MENU ITEMS
  --------------------------------------------------------------- */
  const itemShare = () => {
    dispatch(sendSnowplowEvent('saves.share', analyticsData))
    dispatch(itemsShareAction({ id, position }))
  }

  const itemDelete = () => {
    dispatch(sendSnowplowEvent('saves.delete', analyticsData))
    dispatch(itemsDeleteAction([{ id, position }]))
  }

  const itemArchive = () => {
    dispatch(sendSnowplowEvent('saves.archive', analyticsData))
    dispatch(itemsArchiveAction([{ id, position }]))
  }
  const itemUnArchive = () => {
    dispatch(sendSnowplowEvent('saves.unarchive', analyticsData))
    dispatch(itemsUnArchiveAction([{ id, position }]))
  }

  const itemFavorite = () => {
    dispatch(sendSnowplowEvent('saves.favorite', analyticsData))
    dispatch(itemsFavoriteAction([{ id, position }]))
  }
  const itemUnFavorite = () => {
    dispatch(sendSnowplowEvent('saves.un-favorite', analyticsData))
    dispatch(itemsUnFavoriteAction([{ id, position }]))
  }

  const itemTag = () => {
    dispatch(sendSnowplowEvent('saves.tag', analyticsData))
    dispatch(itemsTagAction([{ id, position }]))
  }

  const itemPermLibOpen = () => {
    const data = { ...analyticsData, url: permanentUrl }
    dispatch(sendSnowplowEvent('saves.card.permanent-library', data))
  }

  const archiveAction = isArchived ? itemUnArchive : itemArchive
  const CorrectArchiveIcon = isArchived ? AddIcon : ArchiveIcon
  const archiveLabel = isArchived
    ? t('item-action:add', 'Add')
    : t('item-action:archive', 'Archive')

  const favoriteAction = isFavorite ? itemUnFavorite : itemFavorite
  const favoriteLabel = isFavorite
    ? t('item-action:unfavorite', 'Un-Favorite')
    : t('item-action:favorite', 'Favorite')

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
          href: permanentUrl,
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
