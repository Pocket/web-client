import { Button } from '@pocket/web-ui'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { itemsDeleteConfirm } from 'connectors/items-by-id/my-list/items.delete'
import { itemsDeleteCancel } from 'connectors/items-by-id/my-list/items.delete'
import { BatchProcessing } from 'components/processing/processing'

export const DeleteModal = () => {
  const dispatch = useDispatch()

  // Handle delete actions with confirmation
  const itemsToDelete = useSelector((state) => state.itemsToDelete)
  const batchTotal = useSelector((state) => state.bulkEdit.batchTotal)
  const batchCount = useSelector((state) => state.bulkEdit.batchCount)
  const batchStart = useSelector((state) => state.bulkEdit.batchStart)

  const showModal = itemsToDelete.length > 0
  const confirmDelete = () => dispatch(itemsDeleteConfirm())
  const cancelDelete = () => dispatch(itemsDeleteCancel())

  const appRootSelector = '#__next'

  return (
    <Modal
      title="Delete Item"
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel="Delete Item"
      handleClose={cancelDelete}>
      <ModalBody>
        {batchStart ? (
          <BatchProcessing batchTotal={batchTotal} batchCount={batchCount} />
        ) : (
          <p>
            Are you sure you want to delete this item? This cannot be undone.
          </p>
        )}
      </ModalBody>
      {batchStart ? null : (
        <ModalFooter>
          <Button type="submit" onClick={confirmDelete}>
            Delete
          </Button>
        </ModalFooter>
      )}
    </Modal>
  )
}
