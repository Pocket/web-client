import { css } from 'linaria'
import { Button } from '@pocket/web-ui'
import { breakpointMediumHandset } from '@pocket/web-ui'
import { darkMode, sepiaMode } from '@pocket/web-ui'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { TopicSelector } from 'connectors/topic-list/topic-selector'
import { onboardingCloseTopicSelectionModal } from './onboarding.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { SaveFilledIcon } from '@pocket/web-ui'
import RainbowReader from 'static/images/rainbow-reader-transparent.svg'

const modalBodyStyles = css`
  .onboarding-modal-body {
    padding: 0;
  }

  .close {
    position: absolute;
    right: 0;
  }

  header {
    display: flex;
    width: 100%;
    background-color: var(--color-apricotLightest);

    ${darkMode} {
      background-color: var(--color-grey40);
    }

    ${sepiaMode} {
      background-color: var(--color-amberLight);
    }

    h2 {
      margin: 1.5rem 0 0 1.5rem;
      font-family: 'Doyle';
      font-size: 2rem;
      font-weight: 400;
    }
    svg {
      height: 24px;
      color: var(--color-actionBrand);
    }
    img {
      width: 290px;
      margin-bottom: -1rem;
    }
  }

  section {
    padding: 3rem 1.5rem 1rem;

    h4 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    p {
      font-size: 1rem;
    }
  }

  ${breakpointMediumHandset} {
    header {
      h2 {
        font-size: 1.5rem;
        margin: 1rem 0 0 1rem;
      }
      img {
        width: 200px;
      }
    }

    section {
      padding: 2rem 1rem 1rem;

      h4 {
        font-size: 1.25rem;
      }
    }
  }
`

export const OnboardingModal = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const appRootSelector = '#__next'
  const pinnedTopics = useSelector((state) => state.settings.pinnedTopics)
  const modalReady = useSelector((state) => state.onboarding.topicSelectionModal)
  const settingsFetched = useSelector((state) => state.settings.settingsFetched)
  const showModal = modalReady && settingsFetched

  useEffect(() => {
    if (showModal) dispatch(sendSnowplowEvent('onboarding.welcome.impression'))
  }, [showModal])

  const handleClose = () => {
    dispatch(sendSnowplowEvent('onboarding.welcome.close'))
    dispatch(onboardingCloseTopicSelectionModal())
  }

  const handleContinue = () => {
    dispatch(sendSnowplowEvent('onboarding.welcome.continue'))
    dispatch(onboardingCloseTopicSelectionModal())
  }

  const toggleCallback = (label) => {
    dispatch(sendSnowplowEvent('onboarding.topic.toggle', { label }))
  }

  const noTopicsSelected = pinnedTopics.length === 0
  const buttonLabel = noTopicsSelected
    ? t('confirm:skip', 'Skip')
    : t('confirm:continue', 'Continue')

  return (
    <Modal
      appRootSelector={appRootSelector}
      isOpen={showModal}
      portalClassName={modalBodyStyles}
      screenReaderLabel={t('onboarding:welcome-to-pocket', 'Welcome to Pocket')}
      shouldCloseOnOverlayClick={false}
      handleClose={handleClose}>
      <ModalBody className="onboarding-modal-body">
        <header>
          <h2>
            <SaveFilledIcon /><br />
            { t('onboarding:welcome-to-pocket', 'Welcome to Pocket') }
          </h2>
          <img alt="" src={RainbowReader} />
        </header>
        <section>
          <h4>{ t('onboarding:curate-corner', 'Curate your personal corner of the web') }</h4>
          <p>{ t('onboarding:tell-us', 'Tell us what you’re interested in') }</p>
          <TopicSelector toggleCallback={toggleCallback} />
        </section>
      </ModalBody>
      <ModalFooter>
        <Button
          type="submit"
          variant={noTopicsSelected ? 'secondary' : 'primary'}
          data-cy="onboarding-cta"
          onClick={handleContinue}>
          { buttonLabel }
        </Button>
      </ModalFooter>
    </Modal>
  )
}
