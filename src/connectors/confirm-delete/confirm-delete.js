import { Button } from '@pocket/web-ui'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { itemsDeleteConfirm } from 'connectors/items-by-id/my-list/items.delete'
import { itemsDeleteCancel } from 'connectors/items-by-id/my-list/items.delete'

export const DeleteModal = () => {
  const dispatch = useDispatch()

  // Handle delete actions with confirmation
  const itemsToDelete = useSelector((state) => state.itemsToDelete)
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
        <p>Are you sure you want to delete this item? This cannot be undone.</p>
      </ModalBody>
      <ModalFooter>
        <div className="actions">
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button type="submit" onClick={confirmDelete}>
            Delete
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}
