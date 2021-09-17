import { Button } from '@pocket/web-ui'
import { css } from 'linaria'

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
export const UsernameModal = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const appRootSelector = '#__next'
  const showModal = useSelector((state) => state.userProfile?.updatingUsername)
  const usernameError = useSelector((state) => state.userProfile?.updatingUsernameError)

  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)

  const confirmUsernmame = () => dispatch(confirmUsernameUpdate(username, password))
  const cancelUsername = () => dispatch(cancelUsernameUpdate())

  const onChangeUsername = (e) => setUsername(e.target.value)
  const onChangePassword = (e) => setPassword(e.target.value)

  const error =
    errorCodes[usernameError]?.desc || 'We are experiencing some issues, please try again later'

  return (
    <Modal
      title={t('profile:change-username', 'Change Username')}
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel={t('profile:change-username', 'Change Username')}
      handleClose={cancelUsername}>
      <ModalBody className={updateUsernameStyles}>
        <label htmlFor="new-username">New Username</label>
        <input type="text" id="new-username" value={username} onChange={onChangeUsername} />
        <span className="helperText">
          Usernames must be alphanumeric and have a length of 3 or more characters. After changing
          your username, you will need to log back in again.
        </span>
        <label htmlFor="password">Enter password</label>
        <input type="password" id="password" value={password} onChange={onChangePassword} />

        <div>{usernameError ? <span className="errorText">{error}</span> : null}</div>
      </ModalBody>
      <ModalFooter>
        <Button type="submit" data-cy="update-username-confirm" onClick={confirmUsernmame}>
          Update Username
        </Button>
      </ModalFooter>
    </Modal>
  )
}
