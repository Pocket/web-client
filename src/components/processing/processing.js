import { ModalBody } from 'components/modal/modal'
import { ProgressPill } from 'components/progress-pill/progress-pill'
import { Trans } from 'next-i18next'

export const BatchProcessing = ({ batchTotal, batchCount }) => {
  return (
    <ModalBody>
      <p>
        <em>
          <Trans i18nKey="confirm:processing">... Processing Items</Trans>
        </em>
      </p>
      <ProgressPill total={batchTotal} current={batchTotal - batchCount} />
    </ModalBody>
  )
}
