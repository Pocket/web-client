import { useState } from 'react'
import { Button } from '@pocket/web-ui'
import { css } from 'linaria'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { confirmPasswordUpdate } from './profile.state'
import { cancelPasswordUpdate } from './profile.state'
import { setPasswordError } from './profile.state'
import { useTranslation } from 'next-i18next'
import { errorCodes } from 'common/errors'

const updatePasswordStyles = css`
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
    cursor: pointer;
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

export const PasswordModal = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const appRootSelector = '#__next'
  const showModal = useSelector((state) => state.userProfile?.updatingPassword)
  const passwordError = useSelector((state) => state.userProfile?.updatingPasswordError)

  const [oldpassword, setOldPassword] = useState(null)
  const [newpassword, setNewPassword] = useState(null)
  const [confirmation, setConfirmation] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  const onChangeOldPassword = (e) => setOldPassword(e.target.value)
  const onChangePassword = (e) => setNewPassword(e.target.value)
  const onChangeConfirmPassword = (e) => setConfirmation(e.target.value)
  const onShowPassword = () => setShowPassword(!showPassword)

  const cancelPassword = () => dispatch(cancelPasswordUpdate())
  const confirmPassword = () => {
    if (newpassword !== confirmation) return dispatch(setPasswordError(6000))
    dispatch(confirmPasswordUpdate(newpassword, oldpassword))
  }

  const error =
    errorCodes[passwordError]?.desc || 'We are experiencing some issues, please try again later'

  return (
    <Modal
      title={t('profile:change-password', 'Change Password')}
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel={t('profile:change-password', 'Change Password')}
      handleClose={cancelPassword}>
      <ModalBody className={updatePasswordStyles}>
        <label htmlFor="old-password">Old Password</label>
        <input
          type="password"
          id="old-password"
          value={oldpassword}
          onChange={onChangeOldPassword}
        />

        <label htmlFor="new-password">New Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="new-Password"
          value={newpassword}
          onChange={onChangePassword}
        />
        <span className="helperText" onClick={onShowPassword}>
          {showPassword ? 'hide password' : 'show password'}
        </span>

        <label htmlFor="confirm-new-password">Confirm New Password</label>
        <input
          type="password"
          id="confirm-new-Password"
          value={confirmation}
          onChange={onChangeConfirmPassword}
        />

        <div>{passwordError ? <span className="errorText">{error}</span> : null}</div>
      </ModalBody>
      <ModalFooter>
        <Button type="submit" data-cy="update-Password-confirm" onClick={confirmPassword}>
          Update Password
        </Button>
      </ModalFooter>
    </Modal>
  )
}
