import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { mutationBulkConfirm, mutationBulkCancel } from 'connectors/items/mutations-bulk.state'

import { useTranslation, Trans } from 'next-i18next'

export const ConfirmArchive = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  // Handle delete actions with confirmation
  const itemsToArchive = useSelector((state) => state.mutationArchive.itemIds)
  const batchStatus = useSelector((state) => state.mutationBulk.archiveAction)

  const showModal = itemsToArchive.length > 0
  const archiveCopy =
    batchStatus === 'archive' ? (
      <Trans i18nKey="confirm:archive-items-copy">
        Are you sure you want to archive these items? This cannot be undone.
      </Trans>
    ) : (
      <Trans i18nKey="confirm:add-items-copy">
        Are you sure you want to add these items? This cannot be undone.
      </Trans>
    )

  const archiveTitle =
    batchStatus === 'archive'
      ? t('confirm:archive-items', 'Archive Items')
      : t('confirm:add-items', 'Add Items')
  const confirmArchive = () => dispatch(mutationBulkConfirm())
  const cancelArchive = () => dispatch(mutationBulkCancel())

  return (
    <Modal
      title={archiveTitle}
      isOpen={showModal}
      screenReaderLabel={archiveTitle}
      handleClose={cancelArchive}>
      <ModalBody>
        <p>{archiveCopy}</p>
      </ModalBody>

      <ModalFooter>
        <button
          className="primary"
          type="submit"
          data-cy="archive-modal-confirm"
          onClick={confirmArchive}
          autoFocus={true}>
          {archiveTitle}
        </button>
      </ModalFooter>
    </Modal>
  )
}
