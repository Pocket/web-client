import { SaveIcon } from '@ui/icons/SaveIcon'
import { SaveFilledIcon } from '@ui/icons/SaveFilledIcon'
import { css } from '@emotion/css'
import { usePopover, popoverBase } from 'components/popover/popover'
import { LOGIN_URL, SIGNUP_URL } from 'common/constants'
import { useTranslation, Trans } from 'next-i18next'

const transitionalActionStyles = css`
  button {
    color: var(--color-textSecondary);

    .saveIcon {
      color: var(--color-actionBrand);
      margin-left: 0;
      margin-right: 0.5em;
    }

    &:hover {
      color: var(--color-textPrimary);
    }
  }
`

const popoverContainer = css`
  ${popoverBase};
  padding: 16px;
  font-size: 16px;
  line-height: 24px;
  max-width: 180px;
  .popoverLink {
    font-weight: 500;
    color: var(--color-actionPrimaryHover);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

export function TransitionalActions({
  id,
  isAuthenticated,
  saveStatus,
  onSave,
  onUnSave
  // onReport
}) {
  const { t } = useTranslation()
  const { popTrigger, popBody, shown } = usePopover({ placement: 'top-end' })
  const isSaved = saveStatus === 'saved'
  return (
    <div className={`${transitionalActionStyles} status-${saveStatus}`}>
      {isSaved ? (
        <button
          className="action saved"
          ref={popTrigger}
          onClick={onUnSave}
          data-testid="article-save-btn-saved">
          <SaveFilledIcon className="saveIcon" />
          <span className="copy">{t('item-action:save-saved', 'Saved')}</span>
        </button>
      ) : (
        <button
          className="action save"
          ref={popTrigger}
          onClick={onSave}
          data-testid="article-save-btn-save">
          <SaveIcon className="saveIcon" />
          <span className="copy">{t('item-action:save-unsaved', 'Save')}</span>
        </button>
      )}

      {!isAuthenticated && shown ? <SavePopover popoverRef={popBody} id={id} /> : null}
    </div>
  )
}

export const SavePopover = function ({ popoverRef, id }) {
  const loginUrl = `${LOGIN_URL}?src=web-save&utm_source=${global.location.href}&route=${global.location.href}`
  const signupUrl = `${SIGNUP_URL}?src=web-save&utm_source=${global.location.href}&route=${global.location.href}`
  return (
    //prettier-ignore
    <div className={popoverContainer} ref={popoverRef} data-testid={`article-save-login-popup-${id}`}>
      <Trans i18nKey="item-action:no-auth-save">
        <a className="popoverLink" href={loginUrl} data-testid="save-login">Log in</a> or{' '}
        <a className="popoverLink" href={signupUrl} data-testid="save-signup">Sign up</a> to save this article.
      </Trans>
    </div>
  )
}
