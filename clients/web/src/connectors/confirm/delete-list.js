import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { mutateListDeleteCancel } from 'connectors/lists/mutation-delete.state'
import { mutateListDeleteConfirm } from 'connectors/lists/mutation-delete.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { useTranslation } from 'next-i18next'

export const ConfirmListDelete = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const showModal = useSelector((state) => state.mutationListDelete.open)

  const confirmDelete = () => {
    dispatch(sendSnowplowEvent('shareable-list.delete.confirm'))
    dispatch(mutateListDeleteConfirm())
  }
  const cancelDelete = () => {
    dispatch(sendSnowplowEvent('shareable-list.delete.cancel'))
    dispatch(mutateListDeleteCancel())
  }

  return (
    <Modal
      title={t('list:delete-list', 'Delete List')}
      isOpen={showModal}
      screenReaderLabel={t('list:delete-list', 'Delete List')}
      handleClose={cancelDelete}>
      <ModalBody>
        <p>
          {t(
            'list:delete-list-confirmation',
            'Are you sure you want to delete this list? This cannot be undone.'
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
