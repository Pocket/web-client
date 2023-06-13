import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation, Trans } from 'next-i18next'
import { mutationDeleteConnectedItemConfirm } from 'connectors/items/mutation-delete.state'
import { mutationDeleteConnectedItemCancel } from 'connectors/items/mutation-delete.state'

export const ConfirmDeleteItemInList = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  // Handle delete actions with confirmation
  const itemsToDelete = useSelector((state) => state.mutationDelete.itemIds)
  const modalStatus = useSelector((state) => state.mutationDelete.showDeleteListModal)
  const showModal = modalStatus && itemsToDelete?.length > 0
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
        <p>
          <Trans i18nKey="confirm:delete-item-in-list-copy">
            Are you sure you want to delete this item? This will also remove it from Lists. This
            action cannot be undone.
          </Trans>
        </p>
      </ModalBody>
      <ModalFooter>
        <button
          className="secondary"
          data-cy="delete-cancel"
          onClick={cancelDelete}
          autoFocus={true}>
          <Trans i18nKey="confirm:cancel">Cancel</Trans>
        </button>
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
