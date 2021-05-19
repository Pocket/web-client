import { css } from 'linaria'
import { usePopover, popoverBase } from 'components/popover/popover'
import { LOGIN_URL, SIGNUP_URL } from 'common/constants'
import classNames from 'classnames'
import { buttonReset } from 'components/buttons/button-reset'
import Link from 'next/link'
import { useTranslation, Trans } from 'next-i18next'

import { SaveIcon } from '@pocket/web-ui'
import { SaveFilledIcon } from '@pocket/web-ui'
import { ReadingIcon } from '@pocket/web-ui'

const saveContainer = css`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
  font-size: var(--fontSize150);
  min-width: 3.913em;
  color: var(--color-textSecondary);
  cursor: pointer;
  padding: 4px;
  text-decoration: none;

  .icon {
    margin-top: 0;
  }

  svg {
    transition: transform 200ms ease-out;
    display: block;
    margin-right: var(--size050);
    height: 1em;
  }

  .actionCopy {
    font-size: 1rem;
    height: var(--size150);
    line-height: var(--size150);
    white-space: nowrap;
  }

  a {
    text-decoration: none;
  }

  &.read-now.saved {
    svg {
      color: var(--color-textSecondary);
    }
  }

  &:hover,
  &:focus,
  &.saved,
  &.read-now.saved:hover,
  &.read-now.saved:focus {
    text-decoration: none;
    color: var(--color-textSecondary);
    svg {
      color: var(--color-actionBrand);
    }
  }

  &:active,
  &.saving {
    svg {
      transform: scale(0.95);
      color: var(--color-actionBrandHover);
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

export const SavePopover = function ({ popoverRef, id }) {
  const loginUrl = `${LOGIN_URL}?route=${global.location.href}`
  const signupUrl = `${SIGNUP_URL}?route=${global.location.href}`
  return (
    //prettier-ignore
    <div className={popoverContainer} ref={popoverRef} data-cy={`article-save-login-popup-${id}`}>
      <Trans i18nKey="userMessagesUnread">
        <a className="popoverLink" href={loginUrl}>Log in</a> or{' '}
        <a className="popoverLink" href={signupUrl}>Sign up</a> to save this article.    
      </Trans>
    </div>
  )
}

/**
 * Pocket logomark with click interaction to save a story to Pocket.
 */
export const SaveToPocket = function ({
  url,
  onOpen,
  openExternal,
  saveAction,
  isAuthenticated,
  saveStatus = 'unsaved',
  allowRead = false,
  id
}) {
  const { t } = useTranslation()

  const saveCopy = {
    unsaved: t('item-action:save-unsaved', 'Save'),
    saving: t('item-action:save-saving', 'Save'),
    saved: t('item-action:save-saved', 'Saved')
  }

  const handleClick = (event) => {
    event.preventDefault()
    event.stopPropagation()

    saveAction(isAuthenticated)
  }

  // Popover Effect
  const { popTrigger, popBody, shown } = usePopover({
    placement: 'top-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 0]
        }
      }
    ]
  })

  const saveClasses = classNames(
    buttonReset,
    saveContainer,
    saveStatus,
    'card-actions',
    allowRead && 'read-now'
  )

  return saveStatus === 'saved' && allowRead ? (
    <Link href={url}>
      <a
        data-cy={`article-read-now-${id}`}
        onClick={onOpen}
        className={saveClasses}
        target={openExternal ? '_blank' : undefined}>
        <ReadingIcon />
        <span className="actionCopy">{t('item-action:read-now', 'Read Now')}</span>
      </a>
    </Link>
  ) : (
    <>
      <button
        className={saveClasses}
        onClick={handleClick}
        ref={popTrigger}
        data-cy={`article-save-btn-${id}`}>
        {saveStatus === 'saved' ? <SaveFilledIcon /> : <SaveIcon />}
        <div className="actionCopy">{saveCopy[saveStatus]}</div>
      </button>
      {!isAuthenticated && shown ? <SavePopover popoverRef={popBody} id={id} /> : null}
    </>
  )
}
