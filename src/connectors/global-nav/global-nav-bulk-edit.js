import GlobalNavBulkEdit from 'components/global-nav/tools/bulk-edit/global-nav-bulk-edit'
import { itemsBulkClear } from 'connectors/items-by-id/my-list/items.bulk.js'

import { itemsArchiveBatch } from 'connectors/items-by-id/my-list/items.archive.js'
import { itemsUnarchiveBatch } from 'connectors/items-by-id/my-list/items.archive.js'

import { itemsFavoriteBatch } from 'connectors/items-by-id/my-list/items.favorite.js'
import { itemsUnFavoriteBatch } from 'connectors/items-by-id/my-list/items.favorite.js'

import { itemsDeleteAction } from 'connectors/items-by-id/my-list/items.delete'
import { itemsTagAction } from 'connectors/items-by-id/my-list/items.tag'

// import { sendBulkDeleteEvent } from './global-nav.analytics'
// import { sendBulkFavoriteEvent } from './global-nav.analytics'
// import { sendBulkArchiveEvent } from './global-nav.analytics'
// import { sendBulkTagEvent } from './global-nav.analytics'

import { useDispatch, useSelector } from 'react-redux'

function GlobalNavBulkEditConnected({ onClose }) {
  const dispatch = useDispatch()
  const bulkItems = useSelector((state) => state?.bulkEdit?.selected)
  const batchFavorite = useSelector((state) => state?.bulkEdit?.batchFavorite)
  const batchStatus = useSelector((state) => state?.bulkEdit?.batchStatus)

  const bulkItemsCount = bulkItems.length

  const clearBulkItems = () => dispatch(itemsBulkClear())

  const deleteAction = () => {
    if (bulkItemsCount) {
      // dispatch(sendBulkDeleteEvent(bulkItems))
      dispatch(itemsDeleteAction(bulkItems))
    }
  }

  const tagAction = () => {
    if (bulkItemsCount) {
      // dispatch(sendBulkTagEvent(bulkItems))
      dispatch(itemsTagAction(bulkItems))
    }
  }

  const archiveFunction =
    batchStatus === 'archive' ? itemsArchiveBatch : itemsUnarchiveBatch
  const archiveAction = () => {
    if (bulkItemsCount) {
      // dispatch(sendBulkArchiveEvent(bulkItems, batchStatus === 'archive'))
      dispatch(archiveFunction(bulkItems))
    }
  }

  const favoriteFunction =
    batchFavorite === 'favorite' ? itemsFavoriteBatch : itemsUnFavoriteBatch
  const favoriteAction = () => {
    if (bulkItemsCount) {
      // dispatch(sendBulkFavoriteEvent(bulkItems, batchFavorite === 'favorite'))
      dispatch(favoriteFunction(bulkItems))
    }
  }

  return (
    <GlobalNavBulkEdit
      onClose={onClose}
      batchFavorite={batchFavorite}
      batchStatus={batchStatus}
      tagAction={tagAction}
      favoriteAction={favoriteAction}
      archiveAction={archiveAction}
      deleteAction={deleteAction}
      clearBulkItems={clearBulkItems}
      bulkItemsCount={bulkItemsCount}
    />
  )
}

export default GlobalNavBulkEditConnected
