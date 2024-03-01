import { cx } from '@emotion/css'
import { SaveIcon } from 'components/icons/SaveIcon'
import { SaveFilledIcon } from 'components/icons/SaveFilledIcon'
import { ThumbsDownIcon } from 'components/icons/ThumbsDownIcon'
import { ThumbsUpIcon } from 'components/icons/ThumbsUpIcon'
import { css } from '@emotion/css'
import { usePopover, popoverBase } from 'components/popover/popover'
import { LOGIN_URL, SIGNUP_URL } from 'common/constants'
import { useTranslation, Trans } from 'next-i18next'
import { topTooltip } from 'components/tooltip/tooltip'

const signaledActionStyles = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-top: 1rem;
  .signals button {
    color: var(--color-textPrimary);
    margin-right: 0.5rem;
    &:hover {
      color: var(--color-actionPrimary);
    }
  }
  button {
    display: inline-flex;
    align-content: center;
    align-items: center;
    background-color: var(--color-canvas);
    font-size: 1.5rem;
    line-height: 1em;
    color: var(--color-textSecondary);
    padding: 0.25rem;
    .copy {
      font-size: 1rem;
      padding-left: 0.25rem;
    }

    .saveIcon {
      color: var(--color-actionBrand);
      display: block;
      margin-top: 0;
    }

    &:hover {
      text-decoration: none;
      color: var(--color-textPrimary);
    }
    &:focus {
      outline: 1px solid var(--color-formFieldBorder);
    }
    &:focus:not(:focus-visible) {
      outline: none;
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
          className={cx(topTooltip, isPromoted && 'promoted')}
          data-tooltip={t('home:tooltip-promote', 'I like this')}>
          <ThumbsUpIcon />
        </button>

        <button
          onClick={onDemote}
          disabled={isPromoted}
          className={topTooltip}
          data-tooltip={t('home:tooltip-demote', 'Not for me')}>
          <ThumbsDownIcon />
        </button>
      </div>

      {isSaved ? (
        <button
          className="saved"
          ref={popTrigger}
          onClick={onUnSave}
          data-testid="article-save-btn-saved">
          <SaveFilledIcon className="saveIcon" />
          <span className="copy">{t('item-action:save-saved', 'Saved')}</span>
        </button>
      ) : (
        <button
          className="save"
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
