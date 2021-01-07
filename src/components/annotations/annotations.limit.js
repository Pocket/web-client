/* eslint  react/jsx-no-target-blank: 0*/
import { css } from 'linaria'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { PremiumIcon, Button } from '@pocket/web-ui'
import { ArrowLink } from 'components/arrow-link/arrow-link'
import VisibilitySensor from 'components/visibility-sensor/visibility-sensor'
// import { MAX_ANNOTATIONS_DEFAULT } from 'Common/constants'
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
          You’re limited to 3 highlights per article.
          Pocket Premium members get unlimited highlights.
        </p>
        <ArrowLink
          id="highlights.limit.sidebar"
          href={`${PREMIUM_URL}14`}
          target="_blank">
          Upgrade now
        </ArrowLink>
      </div>
    </VisibilitySensor>
  )
}

export const ModalLimitNotice = ({ showModal, closeModal, onVisible }) => {
  const appRootSelector = '#__next'

  const handleVisible = () => onVisible('highlights.limit.modal')

  return (
    <Modal
      title="Highlight Limit"
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel="Highlight Limit"
      handleClose={closeModal}>
      <ModalBody>
        <VisibilitySensor onVisible={handleVisible}>
          <p>
            <PremiumIcon />{' '}
            You’re limited to 3 highlights per article.
            Pocket Premium members get unlimited highlights.{' '}
            <ArrowLink
              id="reader.highlights.limit"
              href={`${PREMIUM_URL}5`}
              target="_blank">
              Upgrade now
            </ArrowLink>
          </p>
        </VisibilitySensor>
      </ModalBody>
      <ModalFooter>
        <Button type="submit" onClick={closeModal}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  )
}
