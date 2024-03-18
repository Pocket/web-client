import GlobalNavBulkEdit from 'components/global-nav/tools/bulk-edit/global-nav-bulk-edit'
import { mutationBulkClear } from 'connectors/items/mutations-bulk.state'

import { mutationBulkArchive } from 'connectors/items/mutation-archive.state'
import { mutationBulkUnArchive } from 'connectors/items/mutation-archive.state'
import { mutationBulkDelete } from 'connectors/items/mutation-delete.state'
import { mutationBulkFavorite } from 'connectors/items/mutation-favorite.state'
import { mutationBulkUnFavorite } from 'connectors/items/mutation-favorite.state'
import { mutationBulkTag } from 'connectors/items/mutation-tagging.state'

import { mutateListBulkAddItems } from 'connectors/lists/mutation-add.state'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { useDispatch, useSelector } from 'react-redux'

function GlobalNavBulkEditConnected({ onClose }) {
  const dispatch = useDispatch()
  const bulkItems = useSelector((state) => state?.mutationBulk?.itemIds)
  const items = useSelector((state) => state?.itemsDisplay)
  const pageSavedIds = useSelector((state) => state?.pageSavedIds)

  const batchFavorite = useSelector((state) => state?.mutationBulk?.favoriteAction)
  const batchStatus = useSelector((state) => state?.mutationBulk?.archiveAction)

  const bulkItemsCount = bulkItems.length

  const clearBulkItems = () => dispatch(mutationBulkClear())

  const buildBulkForAnalytics = () => {
    return bulkItems.map((bulkId) => {
      const item = items[bulkId]
      const { itemId: id, saveUrl: url } = item
      const position = pageSavedIds.indexOf(id)
      return { id, url, position }
    })
  }

  const deleteAction = () => {
    if (bulkItemsCount) {
      const items = buildBulkForAnalytics()
      dispatch(sendSnowplowEvent('global-nav.bulk.delete', items))
      dispatch(mutationBulkDelete(bulkItems))
    }
  }

  const tagAction = () => {
    if (bulkItemsCount) {
      const items = buildBulkForAnalytics()
      dispatch(sendSnowplowEvent('global-nav.bulk.tag', items))
      dispatch(mutationBulkTag(bulkItems))
    }
  }

  const archiveAction = () => {
    if (bulkItemsCount) {
      const identifier = batchStatus === 'archive' ? 'global-nav.bulk.archive' : 'global-nav.bulk.un-archive' // prettier-ignore
      const bulkFunction = batchStatus === 'archive' ? mutationBulkArchive : mutationBulkUnArchive
      const items = buildBulkForAnalytics()
      dispatch(sendSnowplowEvent(identifier, items))
      dispatch(bulkFunction(bulkItems))
    }
  }

  const favoriteAction = () => {
    if (bulkItemsCount) {
      const identifier = batchFavorite === 'favorite' ? 'global-nav.bulk.favorite' : 'global-nav.bulk.un-favorite' // prettier-ignore
      const bulkFunction = batchFavorite === 'favorite' ? mutationBulkFavorite : mutationBulkUnFavorite //prettier-ignore
      const items = buildBulkForAnalytics()
      dispatch(sendSnowplowEvent(identifier, items))
      dispatch(bulkFunction(bulkItems))
    }
  }

  const addToListAction = () => {
    if (bulkItemsCount) {
      const items = buildBulkForAnalytics()
      dispatch(sendSnowplowEvent('global-nav.bulk.add-to-list', items))
      dispatch(mutateListBulkAddItems(bulkItems))
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
      addToListAction={addToListAction}
      clearBulkItems={clearBulkItems}
      bulkItemsCount={bulkItemsCount}
    />
  )
}

export default GlobalNavBulkEditConnected
