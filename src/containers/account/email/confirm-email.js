import { css } from '@emotion/css'

import { useState } from 'react'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { confirmPrimaryEmailUpdate } from './email.state'
import { cancelPrimaryEmailUpdate } from './email.state'
import { useTranslation } from 'next-i18next'
import { errorCodes } from 'common/errors'

const updateEmailStyles = css`
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
export const EmailModal = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const appRootSelector = '#__next'
  const currentEmail = useSelector((state) => state.userEmail?.email)
  const showModal = useSelector((state) => state.userEmail?.updating)
  const emailError = useSelector((state) => state.userEmail?.error)

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const confirmEmail = () => dispatch(confirmPrimaryEmailUpdate(email, password))
  const cancelEmail = () => {
    setEmail(currentEmail)
    setPassword('')
    dispatch(cancelPrimaryEmailUpdate())
  }

  const onChangeEmail = (e) => setEmail(e.target.value)
  const onChangePassword = (e) => setPassword(e.target.value)

  const error =
    errorCodes[emailError]?.desc ||
    t('account:error-generic', 'We are experiencing some issues, please try again later')

  return (
    <Modal
      title={t('account:change-primary-email', 'Change Primary Email')}
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel={t('account:change-primary-email', 'Change Primary Email')}
      handleClose={cancelEmail}>
      <ModalBody className={updateEmailStyles}>
        <label htmlFor="email">{t('account:new-email-address', 'New Email Address')}</label>
        <input
          type="text"
          id="email"
          defaultValue={currentEmail}
          value={email}
          onChange={onChangeEmail}
        />
        <label htmlFor="password">{t('account:enter-password', 'Enter password')}</label>
        <input type="password" id="password" value={password} onChange={onChangePassword} />

        <div>{emailError ? <span className="errorText">{error}</span> : null}</div>
      </ModalBody>
      <ModalFooter>
        <button
          className="primary"
          type="submit"
          data-testid="update-primary-email-confirm"
          onClick={confirmEmail}>
          {t('account:update-email', 'Update Email')}
        </button>
      </ModalFooter>
    </Modal>
  )
}
