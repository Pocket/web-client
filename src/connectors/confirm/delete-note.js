import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { mutateListItemNoteDeleteCancel } from 'connectors/lists/mutation-delete.state'
import { mutateListItemNoteDeleteConfirm } from 'connectors/lists/mutation-delete.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { useTranslation } from 'next-i18next'

export const ConfirmNoteDelete = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const showModal = useSelector((state) => state.mutationListDelete.noteOpen)

  const confirmDelete = () => {
    dispatch(sendSnowplowEvent('shareable-list.item.note.delete.confirm'))
    dispatch(mutateListItemNoteDeleteConfirm())
  }
  const cancelDelete = () => {
    dispatch(sendSnowplowEvent('shareable-list.item.note.delete.cancel'))
    dispatch(mutateListItemNoteDeleteCancel())
  }

  return (
    <Modal
      title={t('list:delete-note', 'Delete Note')}
      isOpen={showModal}
      screenReaderLabel={t('list:delete-note', 'Delete Note')}
      handleClose={cancelDelete}>
      <ModalBody>
        <p>
          {t(
            'list:delete-note-confirmation',
            'Are you sure you want to delete this note? This cannot be undone.'
          )}
        </p>
      </ModalBody>
      <ModalFooter>
        <button type="submit" data-testid="delete-confirm" onClick={confirmDelete} autoFocus={true}>
          {t('list:delete', 'Delete')}
        </button>
      </ModalFooter>
    </Modal>
  )
}
