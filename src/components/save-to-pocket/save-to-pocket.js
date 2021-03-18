import { css } from 'linaria'
import { usePopover, popoverBase } from 'components/popover/popover'
import { LOGIN_URL, SIGNUP_URL } from 'common/constants'
import { SaveIcon } from '@pocket/web-ui'
import { SaveFilledIcon } from '@pocket/web-ui'
import classNames from 'classnames'
import { buttonReset } from 'components/buttons/button-reset'

const saveContainer = css`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
  font-size: var(--fontSize150);
  min-width: 3.913em;
  color: var(--color-textSecondary);
  cursor: pointer;
  padding-top: 8px;

  span {
    margin-top: -0.15em;
  }

  svg {
    transition: transform 200ms ease-out;
    display: block;
    margin-right: var(--size050);
    height: 1.1em;
  }

  .actionCopy {
    font-size: 0.667em;
    height: var(--size150);
    line-height: var(--size150);
  }

  a {
    text-decoration: none;
  }

  &:hover,
  &.saved {
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

  &.saved.readNow {
    cursor: default;
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
      <a className="popoverLink" href={loginUrl}>Log in</a> or{' '}
      <a className="popoverLink" href={signupUrl}>Sign up</a> to save this article.
    </div>
  )
}

/**
 * Pocket logomark with click interaction to save a story to Pocket.
 */
export const SaveToPocket = function ({
  saveAction,
  isAuthenticated,
  saveStatus,
  id,
  readNow
}) {
  const saveCopy = {
    unsaved: 'Save',
    saving: 'Save',
    saved: readNow ? 'Read now' : 'Saved'
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
    { readNow }
  )

  return (
    <>
      <button
        className={saveClasses}
        onClick={handleClick}
        ref={popTrigger}
        data-cy={`article-save-btn-${id}`}>
        {saveStatus === 'saved' ? <SaveFilledIcon /> : <SaveIcon />}
        <div className="actionCopy">{saveCopy[saveStatus]}</div>
      </button>
      {!isAuthenticated && shown ? (
        <SavePopover popoverRef={popBody} id={id} />
      ) : null}
    </>
  )
}
