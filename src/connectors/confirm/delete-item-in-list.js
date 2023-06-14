import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation, Trans } from 'next-i18next'
import { mutationDeleteConnectedItemConfirm } from 'connectors/items/mutation-delete.state'
import { mutationDeleteConnectedItemCancel } from 'connectors/items/mutation-delete.state'

export const ConfirmDeleteItemInList = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  // Handle delete actions with confirmation
  const itemToDelete = useSelector((state) => state.mutationDelete.itemId)
  const count = useSelector((state) => state.mutationDelete.count)
  const modalStatus = useSelector((state) => state.mutationDelete.showDeleteListModal)
  const showModal = modalStatus && itemToDelete?.length > 0
  const confirmDelete = () => dispatch(mutationDeleteConnectedItemConfirm())
  const cancelDelete = () => dispatch(mutationDeleteConnectedItemCancel())

  const appRootSelector = '#__next'

  return (
    <Modal
      title={t('confirm:confirm-delete-item-in-list', 'Confirm Delete')}
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel={t('confirm:confirm-delete-item-in-list', 'Confirm Delete')}
      handleClose={cancelDelete}>
      <ModalBody>
        <p>TEMPORARY: Number of lists this item is in: {count}</p>
        <p>
          <Trans i18nKey="confirm:delete-item-in-list-copy">
            Are you sure you want to delete this item? This will also remove it from {count} Lists.
            This action cannot be undone.
          </Trans>
        </p>
      </ModalBody>
      <ModalFooter>
        <button
          className="secondary"
          data-cy="delete-cancel"
          onClick={cancelDelete}
          autoFocus={true}>
          {t('confirm:cancel', 'Cancel')}
        </button>
        <button
          className="primary"
          type="submit"
          data-cy="delete-confirm"
          onClick={confirmDelete}
          autoFocus={true}>
          {t('confirm:delete', 'Delete')}
        </button>
      </ModalFooter>
    </Modal>
  )
}
