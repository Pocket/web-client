import { useState } from 'react'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { Button } from 'components/buttons/button'
import { TextInput } from 'components/form-fields/text-input'
import { TextArea } from 'components/form-fields/text-area'

export const CreateEditShareableList = ({
  modalTitle,
  modalSubmit,
  listName = '',
  listDescription = '',
  handleClose,
  handleSubmit,
  handleNameChange,
  handleDescriptionChange
}) => {
  const appRootSelector = '#root' // to be updated when integrated into the app

  const [isOpen, setIsOpen] = useState(true)
  const [listNameValue, setListNameValue] = useState(listName)
  const [descriptionValue, setDescriptionValue] = useState(listDescription)

  const onClose = () => {
    setIsOpen(false)
    handleClose()
  }

  const onNameChange = (e) => {
    setListNameValue(e.target.value)
    handleNameChange()
  }

  const onDescriptionChange = (e) => {
    setDescriptionValue(e.target.value)
    handleDescriptionChange()
  }

  const listNameEmpty = !listNameValue.trim()

  return (
    <Modal
      title={modalTitle}
      appRootSelector={appRootSelector}
      isOpen={isOpen}
      screenReaderLabel={modalTitle}
      handleClose={onClose}>
      <ModalBody>
        <TextInput
          labelText="List Name"
          name="list-name"
          value={listNameValue}
          onChange={onNameChange}
          data-cy="list-name"
          maxLength={100}
        />
        <TextArea
          labelText="Description (optional)"
          name="list-description"
          value={descriptionValue}
          onChange={onDescriptionChange}
          initialRows={4}
          maxRows={4}
          characterLimit={200}
          showCharacterLimit={true}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          variant="secondary"
          disabled={false}
          type="button"
          data-cy="create-edit-list-cancel"
          onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={listNameEmpty}
          type="submit"
          data-cy="create-edit-list-confirm"
          onClick={handleSubmit}>
          {modalSubmit}
        </Button>
      </ModalFooter>
    </Modal>
  )
}
