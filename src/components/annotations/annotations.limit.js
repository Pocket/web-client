/* eslint  react/jsx-no-target-blank: 0*/
import { useRef } from 'react'
import { css } from '@emotion/css'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { PremiumIcon } from 'components/icons/PremiumIcon'
import { ArrowLink } from 'components/arrow-link/arrow-link'
import { useIntersectionObserver } from 'common/utilities/intersection/intersection'

import { useTranslation } from 'next-i18next'
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
  const { t } = useTranslation()
  const viewRef = useRef(null)

  const handleVisible = () => onVisible('highlights.limit.sidebar')
  const entry = useIntersectionObserver(viewRef, { freezeOnceVisible: true, threshold: 0.5 })
  if (!!entry?.isIntersecting && onVisible) handleVisible()

  return (
    <div className={upsellWrapper} ref={viewRef}>
      <p>
        <PremiumIcon />{' '}
        {t(
          'annotations:highlight-limit-copy',
          'You’re limited to 3 highlights per article. Pocket Premium members get unlimited highlights.'
        )}
      </p>
      <ArrowLink
        id="highlights.limit.sidebar"
        href={`${PREMIUM_URL}&utm_campaign=highlights-limit-sidebar`}
        target="_blank">
        {t('annotations:upgrade-now', 'Upgrade now')}
      </ArrowLink>
    </div>
  )
}

export const ModalLimitNotice = ({ showModal, closeModal, onVisible }) => {
  const appRootSelector = '#__next'
  const { t } = useTranslation()

  const handleVisible = () => onVisible('highlights.limit.modal')
  const viewRef = useRef(null)
  const entry = useIntersectionObserver(viewRef, { freezeOnceVisible: true, threshold: 0.5 })
  if (!!entry?.isIntersecting && onVisible) handleVisible()
  return (
    <Modal
      title={t('annotations:highlight-limit', 'Highlight Limit')}
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel={t('annotations:highlight-limit', 'Highlight Limit')}
      handleClose={closeModal}>
      <ModalBody>
        <p ref={viewRef}>
          <PremiumIcon />{' '}
          {t(
            'annotations:highlight-limit-copy',
            'You’re limited to 3 highlights per article. Pocket Premium members get unlimited highlights.'
          )}{' '}
          <ArrowLink
            id="reader.highlights.limit"
            href={`${PREMIUM_URL}&utm_campaign=highlights-limit-modal`}
            target="_blank">
            {t('annotations:upgrade-now', 'Upgrade now')}
          </ArrowLink>
        </p>
      </ModalBody>
      <ModalFooter>
        <button className="primary" type="submit" onClick={closeModal}>
          {t('annotations:close', 'Close')}
        </button>
      </ModalFooter>
    </Modal>
  )
}
