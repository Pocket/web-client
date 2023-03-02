import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'

export const AddToListModal = ({
  showModal,
  modalTitle,
  handleCreate,
  handleClose,
  handleSubmit
}) => {

  const createAction = () => handleCreate()
  const cancelAction = () => handleClose()
  const confirmAction = () => handleSubmit()

  return (
    <Modal
      title={modalTitle}
      screenReaderLabel={modalTitle}
      isOpen={showModal}
      handleClose={cancelAction}>
      <ModalBody>
        {/* List Names */}
      </ModalBody>
      <ModalFooter>
        <button onClick={createAction}>
          Create List
        </button>

        <button onClick={cancelAction} className="secondary">
          Cancel
        </button>

        <button type="submit" onClick={confirmAction}>
          Save to List
        </button>
      </ModalFooter>
    </Modal>
  )
}
