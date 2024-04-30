import { useState } from 'react'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { TextArea } from 'components/form-fields/text-area'
import { useTranslation } from 'next-i18next'

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
  error,
  appRootSelector
}) => {
  const { t } = useTranslation()

  const [listNameValue, setListNameValue] = useState(listName)
  const [descriptionValue, setDescriptionValue] = useState(listDescription || '')

  const onClose = () => handleClose()
  // regex on description replaces multiple line breaks with two
  const onSubmit = () => handleSubmit(listNameValue, descriptionValue.replace(/\n{2,}/g, '\n\n'))

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
        <TextArea
          autoFocus={true}
          labelText={t('list:collection-name', 'Collection Name')}
          name="list-name"
          value={listNameValue}
          onChange={onNameChange}
          initialRows={2}
          maxRows={4}
          characterLimit={100}
          showCharacterLimit={true}
          error={error}
        />
        <TextArea
          labelText={t('list:description-optional', 'Description (optional)')}
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
        <button
          className="secondary"
          disabled={false}
          type="button"
          data-testid="create-edit-list-cancel"
          onClick={onClose}>
          {t('list:cancel', 'Cancel')}
        </button>
        <button
          className="primary"
          disabled={listNameEmpty}
          type="submit"
          data-testid="create-edit-list-confirm"
          onClick={onSubmit}>
          {modalSubmit}
        </button>
      </ModalFooter>
    </Modal>
  )
}
