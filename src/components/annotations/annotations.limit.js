/* eslint  react/jsx-no-target-blank: 0*/
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { PremiumIcon } from 'components/icons/PremiumIcon'
import { Button } from 'components/buttons/button'
import { ArrowLink } from 'components/arrow-link/arrow-link'
import VisibilitySensor from 'components/visibility-sensor/visibility-sensor'
import { Trans, useTranslation } from 'next-i18next'
import { PREMIUM_URL } from 'common/constants'

<<<<<<< feat/highlight-annotations -- Incoming Change
export const AnnotationsLimitModal = ({ showModal, closeModal, onVisible }) => {
=======
const upsellWrapper = css`
  font-family: 'Graphik Web';
  font-size: 16px;
  line-height: 22px;
  padding: 20px 32px 40px;

  p {
    margin-bottom: 10px;
    color: var(--color-textSecondary);
  }
`

export const LimitNotice = ({ onVisible }) => {
  const handleVisible = () => onVisible('highlights.limit.sidebar')

  return (
    <VisibilitySensor onVisible={handleVisible}>
      <div className={upsellWrapper}>
        <p>
          <PremiumIcon />{' '}
          <Trans i18nKey="annotations:highlight-limit-copy">
            You’re limited to 3 highlights per article. Pocket Premium members get unlimited
            highlights.
          </Trans>
        </p>
        <ArrowLink
          id="highlights.limit.sidebar"
          href={`${PREMIUM_URL}&utm_campaign=highlights-limit-sidebar`}
          target="_blank">
          <Trans i18nKey="annotations:upgrade-now">Upgrade now</Trans>
        </ArrowLink>
      </div>
    </VisibilitySensor>
  )
}

export const ModalLimitNotice = ({ showModal, closeModal, onVisible }) => {
>>>>>>> main -- Current Change
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
<<<<<<< feat/highlight-annotations -- Incoming Change
            <Trans i18nKey="annotations:annotation-limit-copy">
              Adding annotations to your highlights is a brand new Pocket Premium
              feature. Upgrading your account will automatically unlock annotations.
              Plus you'll get unlimited highlights! 🤩
=======
            <Trans i18nKey="annotations:highlight-limit-copy">
              You’re limited to 3 highlights per article. Pocket Premium members get unlimited
              highlights.
>>>>>>> main -- Current Change
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
