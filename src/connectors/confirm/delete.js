import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { mutationBulkConfirm, mutationBulkCancel } from 'connectors/items/mutations-bulk.state'
import { useTranslation, Trans } from 'next-i18next'

export const ConfirmDelete = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  // Handle delete actions with confirmation
  const itemsToDelete = useSelector((state) => state.mutationDelete.itemIds)

  const showModal = itemsToDelete.length > 0
  const confirmDelete = () => dispatch(mutationBulkConfirm())
  const cancelDelete = () => dispatch(mutationBulkCancel())

  return (
    <Modal
      title={t('confirm:delete-item', 'Delete Item')}
      isOpen={showModal}
      screenReaderLabel={t('confirm:delete-item', 'Delete Item')}
      handleClose={cancelDelete}>
      <ModalBody>
        <p>
          <Trans i18nKey="confirm:delete-item-copy">
            Are you sure you want to delete this item? This cannot be undone.
          </Trans>
        </p>
      </ModalBody>

      <ModalFooter>
        <button
          className="primary"
          type="submit"
          data-cy="delete-confirm"
          onClick={confirmDelete}
          autoFocus={true}>
          <Trans i18nKey="confirm:delete">Delete</Trans>
        </button>
      </ModalFooter>
    </Modal>
  )
}
