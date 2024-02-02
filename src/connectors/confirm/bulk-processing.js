import { Modal, ModalBody } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { mutationBulkCancel } from 'connectors/items/mutations-bulk.state'

import { BatchProcessing } from 'components/processing/processing'
import { useTranslation } from 'next-i18next'

export const BulkProcessing = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const batchTotal = useSelector((state) => state.mutationBulk.batchTotal)
  const batchCount = useSelector((state) => state.mutationBulk.batchCount)
  const batchStart = useSelector((state) => state.mutationBulk.batchStart)

  const handleClose = () => dispatch(mutationBulkCancel())

  return (
    <Modal
      title={t('confirm:processing-title', 'Processing')}
      isOpen={batchStart}
      screenReaderLabel={t('confirm:processing-request', 'We are processing your request')}
      handleClose={handleClose}>
      <ModalBody>
        <BatchProcessing batchTotal={batchTotal} batchCount={batchCount} />
      </ModalBody>
    </Modal>
  )
}
