import {
  Button,
  Modal,
  ModalBody,
  ModalFooter
} from '@pocket/web-ui'
import { css } from 'linaria'

const footerStyles = css`
  button {
    margin-left: var(--spacing050);
  }
`

export const DeleteModal = ({ isOpen, setModalOpen, appRootSelector, deleteItem }) => {
  const handleCloseModal = () => {
    setModalOpen(false)
  }

  return (
    <Modal
      title="Delete Item"
      appRootSelector={appRootSelector}
      isOpen={isOpen}
      screenReaderLabel="Delete Item"
      handleClose={handleCloseModal}
    >
      <ModalBody>
        <p>Are you sure you want to delete this item? This cannot be undone.</p>
      </ModalBody>
      <ModalFooter className={footerStyles}>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={deleteItem}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  )
}
