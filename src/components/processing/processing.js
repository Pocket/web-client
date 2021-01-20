import { ModalBody } from 'components/modal/modal'
import { ProgressPill } from 'components/progress-pill/progress-pill'
import { Trans } from 'react-i18next'

export const BatchProcessing = ({ batchTotal, batchCount }) => {
  return (
    <ModalBody>
      <p>
        <em><Trans>... Processing Items</Trans></em>
      </p>
      <ProgressPill total={batchTotal} current={batchTotal - batchCount} />
    </ModalBody>
  )
}
