import { Button } from 'components/buttons/button'
import { Modal, ModalBody } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { css } from 'linaria'
import { clearSavedArticle } from './get-started.state'
import { LogoMark } from 'components/logo/logo'
import { useRouter } from 'next/router'

const modalConfirmStyles = css`
  .modal-title {
    & > div {
      margin-bottom: 1rem;
    }
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    align-content: flex-end;
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
    margin: 0 0 2rem;
    font-size: 22px;
    font-family: var(--fontSansSerif);
  }
`

export const SaveConfirm = () => {
  const router = useRouter()
  const { t } = useTranslation()

  const savedArticleId = useSelector((state) => state.getStarted.savedArticleId)
  const showModal = !!savedArticleId

  const goToReader = () => router.push(`/read/${savedArticleId}?getStarted=true`)
  return savedArticleId ? <SaveConfirmModal showModal={showModal} goToReader={goToReader} /> : null
}

export const SaveConfirmModal = ({ showModal, goToReader }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleClose = () => dispatch(clearSavedArticle())
  const handleSkip = () => router.push('/home?get-started=skip')

  return (
    <Modal
      appRootSelector="#__next"
      isOpen={showModal}
      handleClose={handleClose}
      screenReaderLabel="Save then read in our calm reading environment">
      <ModalBody>
        <div className={modalConfirmStyles}>
          <h4 className="modal-title">
            <LogoMark /> Nice Save!
          </h4>
          <p>Save then read in our calm reading environment</p>
          <footer className="modal-footer">
            <Button type="submit" className="button" variant="secondary" onClick={handleSkip}>
              Discover More on Home
            </Button>
            <Button type="submit" className="button" variant="primary" onClick={goToReader}>
              Read Article
            </Button>
          </footer>
        </div>
      </ModalBody>
    </Modal>
  )
}
