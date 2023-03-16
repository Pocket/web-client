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
  const batchTotal = useSelector((state) => state.mutationBulk.batchTotal)
  const batchCount = useSelector((state) => state.mutationBulk.batchCount)
  const batchStart = useSelector((state) => state.mutationBulk.batchStart)

  const showModal = itemsToDelete.length > 0
  const confirmDelete = () => dispatch(mutationBulkConfirm())
  const cancelDelete = () => dispatch(mutationBulkCancel())

  const appRootSelector = '#__next'

  return (
    <Modal
      title={t('confirm:delete-item', 'Delete Item')}
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel={t('confirm:delete-item', 'Delete Item')}
      handleClose={cancelDelete}>
      <ModalBody>
        {batchStart ? (
          <BatchProcessing batchTotal={batchTotal} batchCount={batchCount} />
        ) : (
          <p>
            <Trans i18nKey="confirm:delete-item-copy">
              Are you sure you want to delete this item? This cannot be undone.
            </Trans>
          </p>
        )}
      </ModalBody>
      {batchStart ? null : (
        <ModalFooter>
          <button className="primary" type="submit" data-cy="delete-confirm" onClick={confirmDelete} autoFocus={true}>
            <Trans i18nKey="confirm:delete">Delete</Trans>
          </button>
        </ModalFooter>
      )}
    </Modal>
  )
}
