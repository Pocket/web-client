import { Button } from '@pocket/web-ui'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { itemsArchiveConfirm } from 'connectors/items-by-id/my-list/items.archive'
import { itemsArchiveCancel } from 'connectors/items-by-id/my-list/items.archive'
import { BatchProcessing } from 'components/processing/processing'

export const ArchiveModal = () => {
  const dispatch = useDispatch()

  // Handle delete actions with confirmation
  const itemsToArchive = useSelector((state) => state.itemsToArchive)
  const batchTotal = useSelector((state) => state.bulkEdit.batchTotal)
  const batchCount = useSelector((state) => state.bulkEdit.batchCount)
  const batchStart = useSelector((state) => state.bulkEdit.batchStart)
  const batchStatus = useSelector((state) => state.bulkEdit.batchStatus)

  const showModal = itemsToArchive.length > 0
  const archiveCopy = batchStatus === 'archive' ? 'archive' : 'add'
  const archiveTitle = batchStatus === 'archive' ? 'Archive Items' : 'Add Items'
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
          <p>
            Are you sure you want to {archiveCopy} these items? This cannot be
            undone.
          </p>
        )}
      </ModalBody>
      {batchStart ? null : (
        <ModalFooter>
          <Button type="submit" onClick={confirmArchive}>
            {archiveTitle}
          </Button>
        </ModalFooter>
      )}
    </Modal>
  )
}
