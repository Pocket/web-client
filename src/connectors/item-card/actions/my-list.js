import React from 'react'
import { useDispatch } from 'react-redux'
import { ItemActions } from 'components/item-menus/flat'
import { IosShareIcon } from '@pocket/web-ui'
import { DeleteIcon } from '@pocket/web-ui'
import { ArchiveIcon } from '@pocket/web-ui'
import { AddIcon } from '@pocket/web-ui'
import { FavoriteIcon } from '@pocket/web-ui'
import { TagIcon } from '@pocket/web-ui'
import { ItemTags } from './item-tags'
import { itemsArchiveAction } from 'connectors/items-by-id/my-list/items.archive'
import { itemsUnArchiveAction } from 'connectors/items-by-id/my-list/items.archive'

import { itemsFavoriteAction } from 'connectors/items-by-id/my-list/items.favorite'
import { itemsUnFavoriteAction } from 'connectors/items-by-id/my-list/items.favorite'

import { itemsDeleteAction } from 'connectors/items-by-id/my-list/items.delete'
import { itemsTagAction } from 'connectors/items-by-id/my-list/items.tag'
import { itemsShareAction } from 'connectors/items-by-id/my-list/items.share'

export function ActionsMyList({
  id,
  position,
  status,
  favorite,
  tags,
  showTags
}) {
  const dispatch = useDispatch()

  const itemShare = () => dispatch(itemsShareAction({ id, position }))
  const itemDelete = () => dispatch(itemsDeleteAction([{ id, position }]))

  const itemArchive = () => dispatch(itemsArchiveAction([{ id, position }]))
  const itemUnArchive = () => dispatch(itemsUnArchiveAction([{ id, position }]))

  const itemFavorite = () => dispatch(itemsFavoriteAction([{ id, position }]))
  const itemUnFavorite = () => dispatch(itemsUnFavoriteAction([{ id, position }])) //prettier-ignore

  const itemTag = () => dispatch(itemsTagAction([{ id, position }]))

  const archiveAction = status === '0' ? itemArchive : itemUnArchive
  const CorrectArchiveIcon = status === '0' ? ArchiveIcon : AddIcon
  const archiveLabel = status === '0' ? 'Archive' : 'Add'

  const isFavorite = favorite === '1'
  const favoriteAction = isFavorite ? itemUnFavorite : itemFavorite

  return (
    <div className="actions">
      {showTags ? <ItemTags tags={tags} /> : null}
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
            key: `delete-${id}`,
            label: 'Delete',
            icon: <DeleteIcon />,
            onClick: itemDelete
          },
          {
            key: `share-${id}`,
            label: 'Share',
            icon: <IosShareIcon />,
            onClick: itemShare
          }
        ]}
      />
    </div>
  )
}
