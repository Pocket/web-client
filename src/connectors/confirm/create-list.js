import { useState } from 'react'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { Button } from 'components/buttons/button'
import { TextInput } from 'components/form-fields/text-input'
import { TextArea } from 'components/form-fields/text-area'

export const CreateListModal = () => {
  const appRootSelector = '#root'

  const [isOpen, setIsOpen] = useState(true)
  const [listName, setListName] = useState('')
  const [description, setDescription] = useState('')

  const handleNameChange = (e) => {
    setListName(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const listNameEmpty = !listName.trim()

  return (
    <Modal
      title="Create List"
      appRootSelector={appRootSelector}
      isOpen={isOpen}
      screenReaderLabel="Create List"
      handleClose={handleClose}>
      <ModalBody>
        <TextInput
          labelText="List Name"
          name="list-name"
          value={listName}
          onChange={handleNameChange}
          data-cy="list-name"
          maxLength={100}
        />
        <TextArea
          labelText="Description (optional)"
          name="list-description"
          value={description}
          onChange={handleDescriptionChange}
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
          data-cy="create-list-cancel"
          onClick={handleClose}>
          Cancel
        </Button>
        <Button
          disabled={listNameEmpty}
          type="submit"
          data-cy="create-list-confirm"
          onClick={() => {}}>
          Create List
        </Button>
      </ModalFooter>
    </Modal>
  )
}
