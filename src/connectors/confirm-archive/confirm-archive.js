import { Button } from 'components/buttons/button'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { itemsArchiveConfirm } from 'connectors/items-by-id/saves/items.archive'
import { itemsArchiveCancel } from 'connectors/items-by-id/saves/items.archive'
import { BatchProcessing } from 'components/processing/processing'
import { useTranslation, Trans } from 'next-i18next'

export const ArchiveModal = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  // Handle delete actions with confirmation
  const itemsToArchive = useSelector((state) => state.itemsToArchive)
  const batchTotal = useSelector((state) => state.bulkEdit.batchTotal)
  const batchCount = useSelector((state) => state.bulkEdit.batchCount)
  const batchStart = useSelector((state) => state.bulkEdit.batchStart)
  const batchStatus = useSelector((state) => state.bulkEdit.batchStatus)

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
  const confirmArchive = () => dispatch(itemsArchiveConfirm())
  const cancelArchive = () => dispatch(itemsArchiveCancel())

  const appRootSelector = '#__next'

  return (
    <Modal
      title={archiveTitle}
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel={archiveTitle}
      handleClose={cancelArchive}>
      <ModalBody>
        {batchStart ? (
          <BatchProcessing batchTotal={batchTotal} batchCount={batchCount} />
        ) : (
          <p>{archiveCopy}</p>
        )}
      </ModalBody>
      {batchStart ? null : (
        <ModalFooter>
          <Button
            type="submit"
            data-cy="archive-modal-confirm"
            onClick={confirmArchive}
            autoFocus={true}>
            {archiveTitle}
          </Button>
        </ModalFooter>
      )}
    </Modal>
  )
}
