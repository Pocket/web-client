import { Button } from 'components/buttons/button'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { itemsDeleteConfirm } from 'connectors/items-by-id/saves/items.delete'
import { itemsDeleteCancel } from 'connectors/items-by-id/saves/items.delete'
import { BatchProcessing } from 'components/processing/processing'
import { useTranslation, Trans } from 'next-i18next'

export const DeleteModal = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  // Handle delete actions with confirmation
  const itemsToDelete = useSelector((state) => state.itemsToDelete)
  const batchTotal = useSelector((state) => state.bulkEdit.batchTotal)
  const batchCount = useSelector((state) => state.bulkEdit.batchCount)
  const batchStart = useSelector((state) => state.bulkEdit.batchStart)

  const showModal = itemsToDelete.length > 0
  const confirmDelete = () => dispatch(itemsDeleteConfirm())
  const cancelDelete = () => dispatch(itemsDeleteCancel())

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
          <Button type="submit" data-cy="delete-confirm" onClick={confirmDelete} autoFocus={true}>
            <Trans i18nKey="confirm:delete">Delete</Trans>
          </Button>
        </ModalFooter>
      )}
    </Modal>
  )
}
