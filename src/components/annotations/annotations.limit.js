/* eslint  react/jsx-no-target-blank: 0*/
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { PremiumIcon, Button } from '@pocket/web-ui'
import { ArrowLink } from 'components/arrow-link/arrow-link'
import VisibilitySensor from 'components/visibility-sensor/visibility-sensor'
import { Trans, useTranslation } from 'next-i18next'
import { PREMIUM_URL } from 'common/constants'

export const AnnotationsLimitModal = ({ showModal, closeModal, onVisible }) => {
  const appRootSelector = '#__next'
  const { t } = useTranslation()

  const handleVisible = () => onVisible('annotations.limit.modal')

  return (
    <Modal
      title={t('annotations:annotations-modal-title', 'Edit Annotation')}
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel={t('annotations:annotations-modal-title', 'Edit Annotation')}
      handleClose={closeModal}>
      <ModalBody>
        <VisibilitySensor onVisible={handleVisible}>
          <p>
            <PremiumIcon />{' '}
            <Trans i18nKey="annotations:annotation-limit-copy">
              Adding annotations to your highlights is a brand new Pocket Premium
              feature. Upgrading your account will automatically unlock annotations.
              Plus you'll get unlimited highlights! 🤩
            </Trans>{' '}
            <ArrowLink
              id="reader.annotations.limit"
              href={`${PREMIUM_URL}&utm_campaign=annotations-limit-modal`}
              target="_blank">
              <Trans i18nKey="annotations:upgrade-now">Upgrade now</Trans>
            </ArrowLink>
          </p>
        </VisibilitySensor>
      </ModalBody>
      <ModalFooter>
        <Button type="submit" onClick={closeModal}>
          <Trans i18nKey="annotations:close">Close</Trans>
        </Button>
      </ModalFooter>
    </Modal>
  )
}
