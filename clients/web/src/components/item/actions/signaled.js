import { cx } from '@emotion/css'
import { SaveIcon } from '@ui/icons/SaveIcon'
import { SaveFilledIcon } from '@ui/icons/SaveFilledIcon'
import { ThumbsDownIcon } from '@ui/icons/ThumbsDownIcon'
import { ThumbsUpIcon } from '@ui/icons/ThumbsUpIcon'
import { css } from '@emotion/css'
import { usePopover, popoverBase } from 'components/popover/popover'
import { LOGIN_URL, SIGNUP_URL } from 'common/constants'
import { useTranslation, Trans } from 'next-i18next'

const signaledActionStyles = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  .signals button {
    color: var(--color-textPrimary);
    &:hover {
      color: var(--color-actionPrimary);
    }
  }
  button {
    color: var(--color-textSecondary);

    .saveIcon {
      color: var(--color-actionBrand);
    }

    &:hover {
      text-decoration: none;
      color: var(--color-textPrimary);
    }
  }
`

const popoverContainer = css`
  ${popoverBase};
  padding: 16px;
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

export function SignaledActions({
  id,
  isAuthenticated,
  isPromoted = true,
  saveStatus,
  onSave,
  onUnSave,
  onDemote,
  onPromote
  // onReport
}) {
  const { t } = useTranslation()
  const { popTrigger, popBody, shown } = usePopover({ placement: 'top-end' })
  const isSaved = saveStatus === 'saved'

  return (
    <div className={`${signaledActionStyles} status-${saveStatus}`}>
      <div className="signals">
        <button
          onClick={onPromote}
          disabled={isPromoted}
          className={cx('action', isPromoted && 'promoted')}
          data-tooltip-position="top"
          data-tooltip-delay={true}
          data-tooltip={t('home:tooltip-promote', 'I like this')}>
          <ThumbsUpIcon />
        </button>

        <button
          onClick={onDemote}
          disabled={isPromoted}
          className="action"
          data-tooltip-position="top"
          data-tooltip-delay={true}
          data-tooltip={t('home:tooltip-demote', 'Not for me')}>
          <ThumbsDownIcon />
        </button>
      </div>

      {isSaved ? (
        <button
          className="saved action"
          ref={popTrigger}
          onClick={onUnSave}
          data-testid="article-save-btn-saved">
          <SaveFilledIcon className="saveIcon" />
          {t('item-action:save-saved', 'Saved')}
        </button>
      ) : (
        <button
          className="save action "
          ref={popTrigger}
          onClick={onSave}
          data-testid="article-save-btn-save">
          <SaveIcon className="saveIcon" />
          {t('item-action:save-unsaved', 'Save')}
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
