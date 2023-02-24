import { useState, useEffect } from 'react'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { Button } from 'components/buttons/button'
import { TextInput } from 'components/form-fields/text-input'
import { TextArea } from 'components/form-fields/text-area'

export const CreateEditShareableList = ({
  showModal,
  modalTitle,
  modalSubmit,
  listName = '',
  listDescription = '',
  handleClose,
  handleSubmit,
  handleNameChange = () => {},
  handleDescriptionChange = () => {},
  appRootSelector
}) => {
  const [listNameValue, setListNameValue] = useState(listName)
  const [descriptionValue, setDescriptionValue] = useState(listDescription)

  const reset = () => {
    // reset inputs on close
    setListNameValue(listName)
    setDescriptionValue(listDescription)
  }

  const onClose = () => {
    handleClose()
    reset()
  }

  const onSubmit = () => {
    handleSubmit(listNameValue, descriptionValue)
    reset()
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
      isOpen={showModal}
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
          onClick={onSubmit}>
          {modalSubmit}
        </Button>
      </ModalFooter>
    </Modal>
  )
}
