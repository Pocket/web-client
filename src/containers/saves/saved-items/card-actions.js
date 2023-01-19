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

import { mutationFavorite } from 'connectors/items/mutation-favorite.state'
import { mutationUnFavorite } from 'connectors/items/mutation-favorite.state'
import { mutationArchive } from 'connectors/items/mutation-archive.state'
import { mutationDelete } from 'connectors/items/mutation-delete.state'
import { mutationUnArchive } from 'connectors/items/mutation-archive.state'
import { mutationUpsert } from 'connectors/items/mutation-upsert.state'
import { mutationTagItem } from 'connectors/items/mutation-tagging.state'

import { shareAction } from 'connectors/share-modal/share-modal.state'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export function ActionsSaves({ id, position }) {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const isPremium = useSelector((state) => state.user.premium_status === '1')
  const itemSaved = useSelector((state) => state.itemsSaved[id])
  const { filters, sort } = useSelector((state) => state.listSavedPageInfo)
  const item = useSelector((state) => state.itemsDisplay[id])

  if (!itemSaved || !item) return null
  const { isFavorite, isArchived, tags} = itemSaved //prettier-ignore
  const { givenUrl, permanentUrl, analyticsData: passedAnalyticsData } = item
  const analyticsData = { ...passedAnalyticsData, position }

  /** ITEM MENU ITEMS
  --------------------------------------------------------------- */
  const itemShare = () => {
    dispatch(sendSnowplowEvent('saves.share', analyticsData))
    dispatch(shareAction({ item, position }))
  }
  const itemDelete = () => {
    dispatch(sendSnowplowEvent('saves.delete', analyticsData))
    dispatch(mutationDelete(id))
  }
  const itemArchive = () => {
    dispatch(sendSnowplowEvent('saves.archive', analyticsData))
    dispatch(mutationArchive(id))
  }
  const itemUpsert = () => {
    dispatch(sendSnowplowEvent('saves.unarchive', analyticsData))
    dispatch(mutationUpsert(givenUrl, filters, sort, true))
  }
  const itemFavorite = () => {
    dispatch(sendSnowplowEvent('saves.favorite', analyticsData))
    dispatch(mutationFavorite(id))
  }
  const itemUnFavorite = () => {
    dispatch(sendSnowplowEvent('saves.un-favorite', analyticsData))
    dispatch(mutationUnFavorite(id))
  }
  const itemTag = () => {
    dispatch(sendSnowplowEvent('saves.tag', analyticsData))
    dispatch(mutationTagItem(id, tags))
  }

  // This is more of an undo.  Leaving it here because we may want to switch to this eventually
  // For now Upsert will double as our `archive` function
  const itemUnArchive = () => dispatch(mutationUnArchive(id))

  const itemPermLibOpen = () => {
    const data = { ...analyticsData, url: permanentUrl }
    dispatch(sendSnowplowEvent('saves.card.permanent-library', data))
  }

  const archiveAction = isArchived ? itemUpsert : itemArchive
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
  const bulkList = useSelector((state) => state.mutationBulk.itemIds)
  const selected = bulkList?.includes(id)
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
