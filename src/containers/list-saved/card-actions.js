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

import { mutationFavorite } from 'connectors/items/items-saved.state'
import { mutationUnFavorite } from 'connectors/items/items-saved.state'
import { mutationArchive } from 'connectors/items/items-saved.state'
import { mutationUnArchive } from 'connectors/items/items-saved.state'
import { mutationDelete } from 'connectors/items/items-saved.state'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export function ActionsMyList({ id, position }) {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const isPremium = useSelector((state) => state.user.premium_status === '1')
  const itemSaved = useSelector((state) => state.itemsSaved[id])

  if (!itemSaved) return null
  const { permanentUrl, isFavorite, isArchived, analyticsData: passedAnalyticsData } = itemSaved
  const analyticsData = { ...passedAnalyticsData, id, position }

  /** ITEM MENU ITEMS
  --------------------------------------------------------------- */
  const itemShare = () => {}

  const itemDelete = () => dispatch(mutationDelete(id))
  const itemArchive = () => dispatch(mutationArchive(id))
  const itemUnArchive = () => dispatch(mutationUnArchive(id))
  const itemFavorite = () => dispatch(mutationFavorite(id))
  const itemUnFavorite = () => dispatch(mutationUnFavorite(id))

  const itemTag = () => {}

  const itemPermLibOpen = () => {
    const data = { ...analyticsData, url: permanentUrl }
    dispatch(sendSnowplowEvent('my-list.card.permanent-library', data))
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
