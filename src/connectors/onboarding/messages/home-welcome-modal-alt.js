import { Button } from '@pocket/web-ui'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { onboardingCloseTopicSelectionModal } from '../onboarding.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { SaveFilledIcon } from '@pocket/web-ui'
import RainbowReader from 'static/images/rainbow-reader-transparent.svg'
import { modalBodyStyles } from './home-welcome-modal'
import { modalContentClass } from './home-welcome-modal'

export const HomeWelcomeModalAlt = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const appRootSelector = '#__next'
  const modalReady = useSelector((state) => state.onboarding.topicSelectionModal)
  const settingsFetched = useSelector((state) => state.settings.settingsFetched)
  const showModal = modalReady && settingsFetched

  useEffect(() => {
    if (showModal) dispatch(sendSnowplowEvent('onboarding.welcome.impression'))
  }, [dispatch, showModal])

  const closeModal = (identifier) => {
    dispatch(sendSnowplowEvent(identifier))
    dispatch(onboardingCloseTopicSelectionModal())
  }

  const handleClose = () => closeModal('onboarding.welcome.close')
  const handleContinue = () => closeModal('onboarding.welcome.continue')
  const buttonLabel = t('confirm:continue', 'Continue')

  return (
    <Modal
      appRootSelector={appRootSelector}
      isOpen={showModal}
      portalClassName={modalBodyStyles}
      modalContentClassName={modalContentClass}
      screenReaderLabel={t('onboarding:welcome-to-pocket', 'Welcome to Pocket')}
      shouldCloseOnOverlayClick={false}
      handleClose={handleClose}>
      <ModalBody className="onboarding-modal-body">
        <header>
          <h2>
            <SaveFilledIcon />
            <br />
            {t('onboarding:welcome-to-pocket', 'Welcome to Pocket')}
          </h2>
          <img alt="" src={RainbowReader} />
        </header>
        <section>
          <h4>{t('onboarding:curate-corner', 'Curate your personal corner of the web')}</h4>
        </section>
      </ModalBody>
      <ModalFooter>
        <Button type="submit" variant="primary" data-cy="onboarding-cta" onClick={handleContinue}>
          {buttonLabel}
        </Button>
      </ModalFooter>
    </Modal>
  )
}
