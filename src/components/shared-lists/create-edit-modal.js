import { useState } from 'react'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { Button } from 'components/buttons/button'
import { TextInput } from 'components/form-fields/text-input'
import { TextArea } from 'components/form-fields/text-area'
import { SHARED_LIST_NAME_LIMIT, SHARED_LIST_DESCRIPTION_LIMIT } from 'common/constants'

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

  const [listNameValue, setListNameValue] = useState(listName)
  const [descriptionValue, setDescriptionValue] = useState(listDescription)

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
      isOpen={true} // update with real logic
      screenReaderLabel={modalTitle}
      handleClose={handleClose}>
      <ModalBody>
        <TextInput
          labelText="List Name"
          name="list-name"
          value={listNameValue}
          onChange={onNameChange}
          data-cy="list-name"
          maxLength={SHARED_LIST_NAME_LIMIT}
        />
        <TextArea
          labelText="Description (optional)"
          name="list-description"
          value={descriptionValue}
          onChange={onDescriptionChange}
          initialRows={4}
          maxRows={4}
          characterLimit={SHARED_LIST_DESCRIPTION_LIMIT}
          showCharacterLimit={true}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          variant="secondary"
          disabled={false}
          type="button"
          data-cy="create-list-cancel"
          onClick={handleClose}>
          Cancel
        </Button>
        <Button
          disabled={listNameEmpty}
          type="submit"
          data-cy="create-list-confirm"
          onClick={handleSubmit}>
          {modalSubmit}
        </Button>
      </ModalFooter>
    </Modal>
  )
}
