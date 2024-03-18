import { useState } from 'react'
import { css } from '@emotion/css'

import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { accountClearConfirm } from './privacy.state'
import { accountClearCancel } from './privacy.state'
import { useTranslation, Trans } from 'next-i18next'
import { errorCodes } from 'common/errors'

const accountClearStyles = css`
  .toggleWrap {
    display: grid;
    grid-column-gap: 1rem;
    grid-template-columns: repeat(12, 1fr);
    align-items: center;
  }
  label {
    grid-column: 1 / 11;
    padding: 1rem 0 0.25rem;
  }

  input[type='checkbox'] {
    grid-column: span 2;
    margin: 0;

    &:before {
      margin-top: 2px;
    }
  }

  input.toggle[type='checkbox']:checked:before {
    transform: translateX(25px);
  }

  .helperText {
    display: block;
    font-family: var(--fontSansSerif);
    font-size: 0.825rem;
    line-height: 1.5;
    color: var(--color-textSecondary);
    padding: 0.5rem 0 0;
  }

  .warn {
    font-style: italic;
    color: var(--color-error);
    em {
      font-weight: 600;
    }
  }
`

const clearFooterStyle = css`
  justify-content: space-between;
`

export const AccountClearModal = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [clearCheck, setClearCheck] = useState(false)

  // Account Clear Actions
  const setClearChecked = () => setClearCheck(!clearCheck)
  const confirmClearAccount = () => dispatch(accountClearConfirm())
  const cancelClearAccount = () => {
    setClearCheck(false)
    dispatch(accountClearCancel())
  }

  const appRootSelector = '#__next'
  const showModal = useSelector((state) => state.userPrivacy?.clearRequest)
  const clearSuccess = useSelector((state) => state.userPrivacy?.clearRequestSuccess)

  return (
    <Modal
      title={t('account:clear-account', 'Clear Account')}
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel={t('account:clear-account', 'Clear Account')}
      handleClose={cancelClearAccount}>
      {clearSuccess ? (
        <PostClear cancelClearAccount={cancelClearAccount} />
      ) : (
        <PreClear
          cancelClearAccount={cancelClearAccount}
          confirmClearAccount={confirmClearAccount}
          setClearChecked={setClearChecked}
          clearCheck={clearCheck}
        />
      )}
    </Modal>
  )
}

const PreClear = ({ cancelClearAccount, confirmClearAccount, setClearChecked, clearCheck }) => {
  const { t } = useTranslation()

  const clearError = useSelector((state) => state.userPrivacy?.clearRequestError)
  const error =
    errorCodes[clearError]?.desc ||
    t('account:error-generic', 'We are experiencing some issues, please try again later')

  return (
    <>
      <ModalBody className={accountClearStyles}>
        <Trans i18nKey="account:clear-copy">
          <p>
            It’s your data and you have control over it. If you wish, you can remove any data that
            has been saved for your account.
          </p>
          <p>
            This will only remove the content in your account, not the account itself. You will
            still be able to log in with your account.
          </p>
        </Trans>
        <div className="toggleWrap warn">
          <label htmlFor="rssPasswords" className="flush">
            <Trans i18nKey="account:clear-comply">
              I understand this will remove the data in my Pocket account <em>Permanently!</em>
            </Trans>
          </label>
          <input
            onChange={setClearChecked}
            checked={clearCheck}
            type="checkbox"
            name="clearCheck"
            id="clearCheck"
            className="toggle"
          />
        </div>
        <div>{clearError ? <span className="errorText">{error}</span> : null}</div>
      </ModalBody>
      <ModalFooter className={clearFooterStyle}>
        <button
          className="secondary"
          data-testid="clear-account-confirm"
          onClick={cancelClearAccount}>
          {t('account:cancel-clear', 'Get me out of here!')}
        </button>
        <button
          className="brand"
          data-testid="clear-account-confirm"
          onClick={confirmClearAccount}
          disabled={!clearCheck}>
          {t('account:clear-account-confirm', 'Clear Account')}
        </button>
      </ModalFooter>
    </>
  )
}

const PostClear = ({ cancelClearAccount }) => {
  // const { t } = useTranslation()
  return (
    <>
      <ModalBody className={accountClearStyles}>
        <p>Your data is in the queue to be cleared.</p>
      </ModalBody>
      <ModalFooter className={clearFooterStyle}>
        <div></div>
        <button
          className="primary"
          data-testid="clear-account-finalize"
          onClick={cancelClearAccount}>
          Continue
        </button>
      </ModalFooter>
    </>
  )
}
