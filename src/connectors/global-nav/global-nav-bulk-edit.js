import GlobalNavBulkEdit from 'components/global-nav/tools/bulk-edit/global-nav-bulk-edit'
import { itemsBulkClear } from 'connectors/items-by-id/my-list/items.bulk.js'
import { useDispatch, useSelector } from 'react-redux'

function GlobalNavBulkEditConnected({ onClose }) {
  const dispatch = useDispatch()
  const bulkItems = useSelector((state) => state?.bulkEdit?.selected)
  const bulkItemsCount = bulkItems.length

  const clearBulkItems = () => dispatch(itemsBulkClear())

  return (
    <GlobalNavBulkEdit
      onClose={onClose}
      clearBulkItems={clearBulkItems}
      bulkItemsCount={bulkItemsCount}
    />
  )
}

export default GlobalNavBulkEditConnected
