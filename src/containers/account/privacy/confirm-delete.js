import { useState } from 'react'
import { Button } from 'components/buttons/button'
import { css } from 'linaria'

import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { accountDeleteConfirm } from './privacy.state'
import { accountDeleteCancel } from './privacy.state'
import { useTranslation, Trans } from 'next-i18next'

const accountDeleteStyles = css`
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

const deleteFooterStyle = css`
  justify-content: space-between;
`

export const AccountDeleteModal = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [deleteCheck, setDeleteCheck] = useState(false)

  const confirmDeleteAccount = () => dispatch(accountDeleteConfirm())
  const cancelDeleteAccount = () => {
    setDeleteCheck(false)
    dispatch(accountDeleteCancel())
  }
  const setDeleteChecked = () => setDeleteCheck(!deleteCheck)

  const appRootSelector = '#__next'
  const showModal = useSelector((state) => state.userPrivacy?.deleteRequest)
  const deleteError = useSelector((state) => state.userProfile?.deleteRequestError)

  const error = t(
    'account:error-generic',
    'We are experiencing some issues, please try again later'
  )

  return (
    <Modal
      title={t('account:delete-account', 'Delete Account')}
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel={t('account:delete-account', 'Delete Account')}
      handleClose={cancelDeleteAccount}>
      <ModalBody className={accountDeleteStyles}>
        <Trans i18nKey="account:delete-copy">
          <p>
            This will remove your account and all associated data. You will not be able to log in
            with your account or access any data you have saved.
          </p>
          <p>
            If you subscribe to Pocket Premium, please make sure that you{' '}
            <a href="https://getpocket.com/premium_manage_subscription">cancel your subscription</a>{' '}
            before deleting your account.
          </p>
        </Trans>
        <div className="toggleWrap warn">
          <label htmlFor="deleteCheck" className="flush">
            <Trans i18nKey="account:delete-comply">
              I understand this will remove my Pocket account <em>Permanently!</em>
            </Trans>
          </label>
          <input
            onChange={setDeleteChecked}
            checked={deleteCheck}
            type="checkbox"
            name="deleteCheck"
            id="deleteCheck"
            className="toggle"
          />
        </div>
        <div>{deleteError ? <span className="errorText">{error}</span> : null}</div>
      </ModalBody>
      <ModalFooter className={deleteFooterStyle}>
        <Button variant="secondary" data-cy="delete-account-confirm" onClick={cancelDeleteAccount}>
          {t('account:cancel-delete', 'Get me out of here!')}
        </Button>
        <Button
          variant="brand"
          data-cy="delete-account-confirm"
          onClick={confirmDeleteAccount}
          disabled={!deleteCheck}>
          {t('account:delete-account-confirm', 'Delete Account')}
        </Button>
      </ModalFooter>
    </Modal>
  )
}
