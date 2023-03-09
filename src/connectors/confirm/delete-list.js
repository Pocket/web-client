import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { mutateListDeleteCancel } from 'connectors/lists/mutation-delete.state'
import { mutateListDeleteConfirm } from 'connectors/lists/mutation-delete.state'

export const ConfirmListDelete = () => {
  const dispatch = useDispatch()

  const showModal = useSelector((state) => state.mutationListDelete.open)

  const confirmDelete = () => dispatch(mutateListDeleteConfirm())
  const cancelDelete = () => dispatch(mutateListDeleteCancel())

  return (
    <Modal
      title="Delete List"
      isOpen={showModal}
      screenReaderLabel="Delete List"
      handleClose={cancelDelete}>
      <ModalBody>
        <p>
          Are you sure you want to delete this list? This cannot be undone.
        </p>
      </ModalBody>
      <ModalFooter>
        <button type="submit" data-cy="delete-confirm" onClick={confirmDelete} autoFocus={true}>
          Delete
        </button>
      </ModalFooter>
    </Modal>
  )
}
