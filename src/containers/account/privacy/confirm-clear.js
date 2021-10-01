import { useState } from 'react'
import { Button } from '@pocket/web-ui'
import { css } from 'linaria'

import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { accountClearConfirm } from './privacy.state'
import { accountClearCancel } from './privacy.state'
import { useTranslation } from 'next-i18next'
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

  const confirmClearAccount = () => dispatch(accountClearConfirm())
  const cancelClearAccount = () => {
    setClearCheck(false)
    dispatch(accountClearCancel())
  }
  const setClearChecked = () => setClearCheck(!clearCheck)

  const appRootSelector = '#__next'
  const showModal = useSelector((state) => state.userPrivacy?.clearRequest)
  const clearError = useSelector((state) => state.userProfile?.clearRequestError)

  const error =
    errorCodes[clearError]?.desc || 'We are experiencing some issues, please try again later'

  return (
    <Modal
      title={t('profile:clear-account', 'Clear Account')}
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel={t('profile:clear-account', 'Clear Account')}
      handleClose={cancelClearAccount}>
      <ModalBody className={accountClearStyles}>
        <p>
          It's your data and you have control over it. If you wish, you can remove any data that has
          been saved for your account.
        </p>
        <p>
          This will only remove the content in your account, not the account itself. You will still
          be able to log in with your account.
        </p>

        <div className="toggleWrap warn">
          <label htmlFor="rssPasswords" className="flush">
            I understand this will remove the data in my Pocket account <em>Permanently!</em>
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
        <Button variant="secondary" data-cy="clear-account-confirm" onClick={cancelClearAccount}>
          Get me out of here!
        </Button>
        <Button
          variant="brand"
          data-cy="clear-account-confirm"
          onClick={confirmClearAccount}
          disabled={!clearCheck}>
          Clear Account
        </Button>
      </ModalFooter>
    </Modal>
  )
}
