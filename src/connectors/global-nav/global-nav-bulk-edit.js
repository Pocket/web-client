import GlobalNavBulkEdit from 'components/global-nav/tools/bulk-edit/global-nav-bulk-edit'
import { itemsBulkClear } from 'connectors/items-by-id/my-list/items.bulk.js'

import { itemsArchiveBatch } from 'connectors/items-by-id/my-list/items.archive.js'
import { itemsUnarchiveBatch } from 'connectors/items-by-id/my-list/items.archive.js'

import { itemsFavoriteBatch } from 'connectors/items-by-id/my-list/items.favorite.js'
import { itemsUnFavoriteBatch } from 'connectors/items-by-id/my-list/items.favorite.js'

import { itemsDeleteAction } from 'connectors/items-by-id/my-list/items.delete'
import { itemsTagAction } from 'connectors/items-by-id/my-list/items.tag'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

import { useDispatch, useSelector } from 'react-redux'

function GlobalNavBulkEditConnected({ onClose }) {
  const dispatch = useDispatch()
  const bulkItems = useSelector((state) => state?.bulkEdit?.selected)
  const batchFavorite = useSelector((state) => state?.bulkEdit?.batchFavorite)
  const batchStatus = useSelector((state) => state?.bulkEdit?.batchStatus)

  const bulkItemsCount = bulkItems.length

  const clearBulkItems = () => dispatch(itemsBulkClear())

  const buildBulkForAnalytics = () => {
    return bulkItems.map(item => ({
      id: item.id,
      url: item.save_url,
      position: item.position
    }))
  }

  const deleteAction = () => {
    if (bulkItemsCount) {
      const items = buildBulkForAnalytics()
      dispatch(sendSnowplowEvent('global-nav.bulk.delete', items))
      dispatch(itemsDeleteAction(bulkItems))
    }
  }

  const tagAction = () => {
    if (bulkItemsCount) {
      const items = buildBulkForAnalytics()
      dispatch(sendSnowplowEvent('global-nav.bulk.tag', items))
      dispatch(itemsTagAction(bulkItems))
    }
  }

  const archiveFunction = batchStatus === 'archive' ? itemsArchiveBatch : itemsUnarchiveBatch
  const archiveAction = () => {
    if (bulkItemsCount) {
      const identifier = (batchStatus === 'archive') ? 'global-nav.bulk.archive' : 'global-nav.bulk.un-archive'
      const items = buildBulkForAnalytics()
      dispatch(sendSnowplowEvent(identifier, items))
      dispatch(archiveFunction(bulkItems))
    }
  }

  const favoriteFunction = batchFavorite === 'favorite' ? itemsFavoriteBatch : itemsUnFavoriteBatch
  const favoriteAction = () => {
    if (bulkItemsCount) {
      const identifier = (batchFavorite === 'favorite') ? 'global-nav.bulk.favorite' : 'global-nav.bulk.un-favorite'
      const items = buildBulkForAnalytics()
      dispatch(sendSnowplowEvent(identifier, items))
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
