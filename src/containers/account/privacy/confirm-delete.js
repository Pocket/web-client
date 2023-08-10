import { useState } from 'react'
import { css } from '@emotion/css'

import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { accountDeleteConfirm } from './privacy.state'
import { accountDeleteCancel } from './privacy.state'
import { useTranslation, Trans } from 'next-i18next'
import { errorCodes } from 'common/errors'

const accountDeleteStyles = css`
  .toggleWrap {
    display: grid;
    grid-column-gap: 1rem;
    grid-template-columns: repeat(12, 1fr);
    align-items: center;
    padding: 1rem 0;
  }
  label {
    grid-column: 2 / -1;
  }

  input[type='checkbox'] {
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
    /* color: var(--color-error); */
    em {
      font-weight: 600;
    }
  }
`

const deleteFooterStyle = css`
  justify-content: flex-end;
`

export const AccountDeleteModal = ({ isPremium }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [deleteCheck, setDeleteCheck] = useState(false)
  const [premiumCheck, setPremiumCheck] = useState(false)

  const confirmDeleteAccount = () => dispatch(accountDeleteConfirm())
  const cancelDeleteAccount = () => {
    setDeleteCheck(false)
    setPremiumCheck(false)
    dispatch(accountDeleteCancel())
  }
  const setDeleteChecked = () => setDeleteCheck(!deleteCheck)
  const setPremiumChecked = () => setPremiumCheck(!premiumCheck)

  const appRootSelector = '#__next'
  const showModal = useSelector((state) => state.userPrivacy?.deleteRequest)
  const deleteError = useSelector((state) => state.userProfile?.deleteRequestError)

  const error =
    errorCodes[deleteError]?.desc ||
    t('account:error-generic', 'We are experiencing some issues, please try again later')

  const formReady = isPremium ? deleteCheck && premiumCheck : deleteCheck

  return (
    <Modal
      title={t('account:delete-account', 'Delete Account')}
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel={t('account:delete-account', 'Delete Account')}
      handleClose={cancelDeleteAccount}>
      <ModalBody className={accountDeleteStyles}>
        <p>
          {t(
            'account:delete-copy-alt',
            'This will remove your account and all associated data. You will not be able to log in with your account or access any data you have saved.'
          )}
        </p>
        {isPremium ? (
          <>
            <Trans i18nKey="account:premium-confirm">
              <p>
                As a Pocket Premium subscriber, you must{' '}
                <a href="https://getpocket.com/premium_manage_subscription">
                  cancel your subscription
                </a>{' '}
                before deleting your account. If your subscription is not canceled first, all
                subscription and payment information will be deleted and cannot be retrieved again
                by Pocket.
              </p>
            </Trans>

            <div className="toggleWrap warn">
              <input
                onChange={setPremiumChecked}
                checked={premiumCheck}
                type="checkbox"
                name="premiumCheck"
                id="premiumCheck"
              />
              <label htmlFor="premiumCheck" className="flush">
                <Trans i18nKey="account:premium-comply">
                  I have canceled my Pocket Premium subscription.
                </Trans>
              </label>
            </div>
          </>
        ) : null}
        <div className="toggleWrap warn">
          <input
            onChange={setDeleteChecked}
            checked={deleteCheck}
            type="checkbox"
            name="deleteCheck"
            id="deleteCheck"
          />
          <label htmlFor="deleteCheck" className="flush">
            <Trans i18nKey="account:delete-comply">
              I understand this will remove my Pocket account <em>Permanently!</em>
            </Trans>
          </label>
        </div>
        <div>{deleteError ? <span className="errorText">{error}</span> : null}</div>
      </ModalBody>
      <ModalFooter className={deleteFooterStyle}>
        <button
          className="secondary"
          data-cy="delete-account-confirm"
          onClick={cancelDeleteAccount}>
          {t('account:cancel-delete', 'Cancel')}
        </button>
        <button
          className="brand"
          data-cy="delete-account-confirm"
          onClick={confirmDeleteAccount}
          disabled={!formReady}>
          {t('account:delete-account-confirm', 'Delete Account')}
        </button>
      </ModalFooter>
    </Modal>
  )
}
