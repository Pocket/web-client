/* eslint  react/jsx-no-target-blank: 0*/
import { css } from 'linaria'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { PremiumIcon, Button } from '@pocket/web-ui'
import { ArrowLink } from 'components/arrow-link/arrow-link'
import VisibilitySensor from 'components/visibility-sensor/visibility-sensor'
import { Trans, useTranslation } from 'react-i18next'
import { PREMIUM_URL } from 'common/constants'

const upsellWrapper = css`
  font-family: 'Graphik Web';
  font-size: 16px;
  line-height: 22px;
  padding: 20px 32px 40px;

  p  {
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
          <Trans>You’re limited to 3 highlights per article.
          Pocket Premium members get unlimited highlights.</Trans>
        </p>
        <ArrowLink
          id="highlights.limit.sidebar"
          href={`${PREMIUM_URL}14`}
          target="_blank">
          <Trans>Upgrade now</Trans>
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
      title={t("Highlight Limit")}
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel={t("Highlight Limit")}
      handleClose={closeModal}>
      <ModalBody>
        <VisibilitySensor onVisible={handleVisible}>
          <p>
            <PremiumIcon />{' '}
            <Trans>You’re limited to 3 highlights per article.
            Pocket Premium members get unlimited highlights.</Trans>{' '}
            <ArrowLink
              id="reader.highlights.limit"
              href={`${PREMIUM_URL}5`}
              target="_blank">
              <Trans>Upgrade now</Trans>
            </ArrowLink>
          </p>
        </VisibilitySensor>
      </ModalBody>
      <ModalFooter>
        <Button type="submit" onClick={closeModal}>
          <Trans>Close</Trans>
        </Button>
      </ModalFooter>
    </Modal>
  )
}
