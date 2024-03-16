import { css } from '@emotion/css'

import { useState } from 'react'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { confirmUsernameUpdate } from './profile.state'
import { cancelUsernameUpdate } from './profile.state'
import { useTranslation } from 'next-i18next'
import { errorCodes } from 'common/errors'

const updateUsernameStyles = css`
  label {
    padding: 1rem 0 0.25rem;
  }
  .helperText {
    display: block;
    font-family: var(--fontSansSerif);
    font-size: 0.825rem;
    line-height: 1.5;
    color: var(--color-textSecondary);
    padding: 0.5rem 0 0;
  }
  .errorText {
    display: block;
    text-align: center;
    padding: 1rem 0 0;
    color: var(--color-error);
    font-family: var(--fontSansSerif);
    font-size: 0.75rem;
    line-height: 1;
  }
`

const updateUsernameFooter = css`
  justify-content: space-between;
  align-items: center;
  align-content: center;
  button {
    white-space: nowrap;
    margin-left: 2rem;
  }
  .footerWarning {
    display: flex;
    align-content: center;
    align-items: center;
    color: var(--color-textTertiary);
    font-family: var(--fontSansSerif);
    font-weight: 400;
    font-style: italic;
    font-size: 0.875rem;
    line-height: 1.2;
  }
`

export const UsernameModal = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const appRootSelector = '#__next'
  const showModal = useSelector((state) => state.userProfile?.updatingUsername)
  const usernameError = useSelector((state) => state.userProfile?.updatingUsernameError)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const confirmUsernmame = () => dispatch(confirmUsernameUpdate(username, password))
  const cancelUsername = () => dispatch(cancelUsernameUpdate())

  const onChangeUsername = (e) => setUsername(e.target.value)
  const onChangePassword = (e) => setPassword(e.target.value)

  const error =
    errorCodes[usernameError]?.desc ||
    t('account:error-generic', 'We are experiencing some issues, please try again later')

  return (
    <Modal
      title={t('account:confirm-change-username', 'Change Username')}
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel={t('account:confirm-change-username', 'Change Username')}
      handleClose={cancelUsername}>
      <ModalBody className={updateUsernameStyles}>
        <label htmlFor="new-username">{t('account:new-username', 'New Username')}</label>
        <input type="text" id="new-username" value={username} onChange={onChangeUsername} />
        <span className="helperText">
          {t(
            'account:new-username-helper',
            'Usernames must be alphanumeric and have a length of 3 or more characters. After changing your username, you will need to log back in again.'
          )}
        </span>
        <label htmlFor="password">{t('account:enter-password', 'Enter password')}</label>
        <input type="password" id="password" value={password} onChange={onChangePassword} />

        <div>{usernameError ? <span className="errorText">{error}</span> : null}</div>
      </ModalBody>
      <ModalFooter className={updateUsernameFooter}>
        <div className="footerWarning">
          {t(
            'account:username-change-warning',
            'You will need to log in again after you update your username.'
          )}
        </div>
        <button
          className="primary"
          type="submit"
          data-testid="update-username-confirm"
          onClick={confirmUsernmame}>
          {t('account:update-username', 'Update Username')}
        </button>
      </ModalFooter>
    </Modal>
  )
}
