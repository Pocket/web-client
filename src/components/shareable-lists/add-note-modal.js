import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { TextArea } from 'components/form-fields/text-area'

export const AddNoteModal = ({
  showModal,
  note = '',
  handleClose,
  handleSubmit,
  appRootSelector
}) => {
  const { t } = useTranslation()

  const [noteValue, setNoteValue] = useState(note || '')

  const onClose = () => handleClose()
  // regex on note replaces multiple line breaks with two
  const onSubmit = () => handleSubmit(noteValue.replace(/\n{2,}/g, '\n\n').trim())

  const onNoteChange = (e) => setNoteValue(e.target.value)

  return (
    <Modal
      title={t('list:add-note', 'Add Note')}
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel={t('list:add-note', 'Add Note')}
      handleClose={onClose}>
      <ModalBody>
        <TextArea
          autoFocus={true}
          labelText={t('list:add-note', 'Add Note')}
          name="item-note"
          value={noteValue}
          onChange={onNoteChange}
          initialRows={4}
          maxRows={4}
          characterLimit={300}
          showCharacterLimit={true}
        />
      </ModalBody>
      <ModalFooter>
        <button className="secondary" type="button" data-cy="note-cancel" onClick={onClose}>
          {t('list:cancel', 'Cancel')}
        </button>
        <button className="primary" type="submit" data-cy="note-confirm" onClick={onSubmit}>
          {t('list:save', 'Save')}
        </button>
      </ModalFooter>
    </Modal>
  )
}
