import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { Button } from 'components/buttons/button'
import { TextInput } from 'components/form-fields/text-input'
import { TextArea } from 'components/form-fields/text-area'

export const ListModal = () => {
  const appRootSelector = '#root'
  const { t } = useTranslation()

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

  return (
    <Modal
      title={t('lists:create-list', 'Create List')}
      appRootSelector={appRootSelector}
      isOpen={isOpen}
      screenReaderLabel={t('lists:create-list', 'Create List')}
      handleClose={handleClose}>
      <ModalBody>
        <TextInput
          labelText={t('lists:list-name', 'List Name')}
          name="list-name"
          value={listName}
          onChange={handleNameChange}
          data-cy="list-name"
          maxLength={100}
        />
        <TextArea
          labelText={t('lists:description', 'Description (optional)')}
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
          {t('list:cancel', 'Cancel')}
        </Button>
        <Button disabled={false} type="submit" data-cy="create-list-confirm" onClick={() => {}}>
          {t('list:create-list', 'Create List')}
        </Button>
      </ModalFooter>
    </Modal>
  )
}
