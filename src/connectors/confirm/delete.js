import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { mutationBulkConfirm, mutationBulkCancel } from 'connectors/items/mutations-bulk.state'
import { BatchProcessing } from 'components/processing/processing'
import { useTranslation, Trans } from 'next-i18next'

export const ConfirmDelete = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  // Handle delete actions with confirmation
  const itemsToDelete = useSelector((state) => state.mutationDelete.itemIds)
  const modalStatus = useSelector((state) => state.mutationDelete.showBulkDeleteModal)
  const batchTotal = useSelector((state) => state.mutationBulk.batchTotal)
  const batchCount = useSelector((state) => state.mutationBulk.batchCount)
  const batchStart = useSelector((state) => state.mutationBulk.batchStart)
  const batchStatus = useSelector((state) => state.mutationBulk.deleteAction)

  const showModal = modalStatus && itemsToDelete.length > 0
  const confirmDelete = () => dispatch(mutationBulkConfirm())
  const cancelDelete = () => dispatch(mutationBulkCancel())

  const deleteCopy =
    // aly update this - no Trans component
    batchStatus === 'delete' ? (
      <Trans i18nKey="confirm:delete-item-copy">
        Are you sure you want to delete this item? This cannot be undone.
      </Trans>
    ) : (
      <Trans i18nKey="confirm:delete-bulk-list-items-copy">pink elephants</Trans>
    )

  const deleteTitle =
    batchStatus === 'delete'
      ? t('confirm:delete-items', 'Delete Items')
      : t('confirm:delete-bulk-list-items-title', 'Confirm Delete')

  const appRootSelector = '#__next'

  return (
    <Modal
      title={deleteTitle}
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel={deleteTitle}
      handleClose={cancelDelete}>
      <ModalBody>
        {batchStart ? (
          <BatchProcessing batchTotal={batchTotal} batchCount={batchCount} />
        ) : (
          <p>{deleteCopy}</p>
        )}
      </ModalBody>
      {batchStart ? null : (
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
      )}
    </Modal>
  )
}
