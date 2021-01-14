import { ModalBody } from 'components/modal/modal'
import { ProgressPill } from 'components/progress-pill/progress-pill'

export const BatchProcessing = ({ batchTotal, batchCount }) => {
  return (
    <ModalBody>
      <p>
        <em>... Processing Items</em>
      </p>
      <ProgressPill total={batchTotal} current={batchTotal - batchCount} />
    </ModalBody>
  )
}
