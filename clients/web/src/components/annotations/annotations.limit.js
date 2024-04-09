/* eslint  react/jsx-no-target-blank: 0*/
import { css } from '@emotion/css'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { PremiumIcon } from '@ui/icons/PremiumIcon'
import { ArrowLink } from 'components/arrow-link/arrow-link'
import VisibilitySensor from 'components/visibility-sensor/visibility-sensor'
import { Trans, useTranslation } from 'next-i18next'
import { PREMIUM_URL } from 'common/constants'

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
          href={`${PREMIUM_URL}&utm_campaign=highlights-limit-sidebar`}>
          <Trans i18nKey="annotations:upgrade-now">Upgrade now</Trans>
        </ArrowLink>
      </div>
    </VisibilitySensor>
  )
}

export const ModalLimitNotice = ({ showModal, closeModal, onVisible }) => {
  const appRootSelector = '#__next'
  const { t } = useTranslation()

  const handleVisible = () => onVisible('highlights.limit.modal')

  return (
    <Modal
      title={t('annotations:highlight-limit', 'Highlight Limit')}
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel={t('annotations:highlight-limit', 'Highlight Limit')}
      handleClose={closeModal}>
      <ModalBody>
        <VisibilitySensor onVisible={handleVisible}>
          <p>
            <PremiumIcon />{' '}
            <Trans i18nKey="annotations:highlight-limit-copy">
              You’re limited to 3 highlights per article. Pocket Premium members get unlimited
              highlights.
            </Trans>{' '}
            <ArrowLink
              id="reader.highlights.limit"
              href={`${PREMIUM_URL}&utm_campaign=highlights-limit-modal`}>
              <Trans i18nKey="annotations:upgrade-now">Upgrade now</Trans>
            </ArrowLink>
          </p>
        </VisibilitySensor>
      </ModalBody>
      <ModalFooter>
        <button className="primary" type="submit" onClick={closeModal}>
          <Trans i18nKey="annotations:close">Close</Trans>
        </button>
      </ModalFooter>
    </Modal>
  )
}
