import { Button } from 'components/buttons/button'
import { Modal, ModalBody } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { css } from 'linaria'
import { clearSavedArticle } from './get-started.state'
import { LogoMark } from 'components/logo/logo'
import { useRouter } from 'next/router'
import { breakpointLargeHandset } from 'common/constants'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

const modalConfirmStyles = css`
  .modal-title {
    font-weight: 600;
    margin-bottom: 0.5rem;
    & > div {
      margin-bottom: 1rem;
    }
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    align-content: flex-end;

    ${breakpointLargeHandset} {
      flex-direction: column-reverse;

      button {
        width: 100%;

        + button {
          margin-bottom: 1rem;
        }
      }
    }
  }
  .button {
    margin-left: 1rem;
    &.primary {
      border: 1px solid var(--color-actionPrimary);
    }
  }

  .skip {
    text-decoration: none;
    font-size: 0.825rem;
  }
  p {
    margin: 0 0 0.5rem;
    font-size: 1.5rem;
    font-family: var(--fontSansSerif);
    &.small {
      font-size: 1rem;
      margin-bottom: 2rem;
    }
  }
`

export const SaveConfirm = () => {
  const router = useRouter()

  const savedArticleId = useSelector((state) => state.getStarted.savedArticleId)
  const showModal = !!savedArticleId

  const goToReader = () => router.push(`/read/${savedArticleId}?getStarted=true`)
  return savedArticleId ? <SaveConfirmModal showModal={showModal} goToReader={goToReader} /> : null
}

export const SaveConfirmModal = ({ showModal, goToReader }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleClose = () => {
    dispatch(sendSnowplowEvent('get-started.article.modal.close'))
    dispatch(clearSavedArticle())
  }

  const handleSkip = () => {
    dispatch(sendSnowplowEvent('get-started.article.modal.skip'))
    router.push('/home?get-started=skip')
  }

  const handleRead = () => {
    dispatch(sendSnowplowEvent('get-started.article.modal.continue'))
    goToReader()
  }

  return (
    <Modal
      appRootSelector="#__next"
      isOpen={showModal}
      handleClose={handleClose}
      screenReaderLabel="Save then read in our calm reading environment">
      <ModalBody>
        <div className={modalConfirmStyles}>
          <h4 className="modal-title">
            <LogoMark /> Nice save!
          </h4>
          <p>Save then read in our calm reading environment</p>
          <p className="small">Saving is the key to using Pocket</p>
          <footer className="modal-footer">
            <Button type="submit" className="button" variant="secondary" onClick={handleSkip}>
              Discover More on Home
            </Button>
            <Button type="submit" className="button" variant="primary" onClick={handleRead}>
              Read Article
            </Button>
          </footer>
        </div>
      </ModalBody>
    </Modal>
  )
}
