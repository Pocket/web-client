import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ItemActions } from 'components/item-actions/inline'
import { IosShareIcon } from '@pocket/web-ui'
import { DeleteIcon } from '@pocket/web-ui'
import { ArchiveIcon } from '@pocket/web-ui'
import { AddIcon } from '@pocket/web-ui'
import { FavoriteIcon } from '@pocket/web-ui'
import { TagIcon } from '@pocket/web-ui'
import { PermanentCopyIcon } from '@pocket/web-ui'

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
  const item = useSelector((state) => state.myListItemsById[id])
  const isPremium = useSelector((state) => state.user.premium_status === '1')

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

  const archiveAction = status === '0' ? itemArchive : itemUnArchive
  const CorrectArchiveIcon = status === '0' ? ArchiveIcon : AddIcon
  const archiveLabel = status === '0' ? 'Archive' : 'Add'

  const isFavorite = favorite === '1'
  const favoriteAction = isFavorite ? itemUnFavorite : itemFavorite

  const itemPermLibOpen = () => {
    dispatch(trackItemOpen(position, item, 'my-list.card.permanent-library'))
  }

  return (
    <ItemActions
      menuItems={[
        {
          key: `favorite-${id}`,
          label: 'Favorite',
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
          label: 'Tag',
          icon: <TagIcon />,
          onClick: itemTag
        },
        {
          key: `share-${id}`,
          label: 'Share',
          icon: <IosShareIcon />,
          onClick: itemShare
        },
        {
          key: `permanent-${id}`,
          label: 'Permanent Copy',
          isPremium,
          onlyPremium: true,
          href: permanent_url,
          icon: <PermanentCopyIcon />,
          onClick: itemPermLibOpen
        },
        {
          key: `delete-${id}`,
          label: 'Delete',
          icon: <DeleteIcon />,
          onClick: itemDelete
        }
      ]}
    />
  )
}
