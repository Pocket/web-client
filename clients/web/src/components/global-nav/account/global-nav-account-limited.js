import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { css, cx } from '@emotion/css'
import { Trans, useTranslation } from 'next-i18next'
import { useCorrectEffect } from 'common/utilities/hooks/use-correct-effect'
import { KEYS } from 'common/constants'
import { AvatarButton } from 'components/avatar/avatar-button'
import { PopupMenu, PopupMenuGroup, PopupMenuItem } from 'components/popup-menu/popup-menu'
import { bottomTooltip } from 'components/tooltip/tooltip'
import { FloatingNotification } from './notification'

const avatarWrapper = css`
  position: relative;
  display: inline-block;

  button:focus {
    transition: none;
    color: var(--color-navCurrentTabText);
    outline: 1px auto var(--color-navCurrentTab);
  }
`

const avatarStyle = css`
  vertical-align: middle;
  background-color: transparent;
  color: var(--color-textSecondary);
  &:hover {
    color: var(--color-textPrimary);
    background-color: transparent;
  }
`

const staticMenu = css`
  display: flex;
  flex-direction: column;
  padding: 0.75rem 1rem;
  div {
    width: 100%;
    background: none;
    color: var(--color-textPrimary);
    font-size: 1rem;
    font-weight: 500;
    text-align: left;
    line-height: 1.5rem;
  }
  .sub {
    font-weight: 400;
    font-size: 0.875rem;
  }
`

/**
 * Component for displaying account links and menu in the GlobalNav. Renders
 * login/signup/premium links depending on user state, as well as an avatar
 * with account menu for logged in users.
 */
const GlobalNavAccountLimited = ({
  appRootSelector,
  userStatus,
  showNotification,
  avatarSrc = null,
  accountName = 'You',
  accountEmail = false,
  onLinkClick = () => {},
  onAccountClick = () => {}
}) => {
  const { t } = useTranslation()

  const accountMenuTriggerRef = useRef(null)
  const menuRef = useRef(null)

  const [menuOpen, setMenuOpen] = useState(false)
  const [focus, setFocus] = useState(false)

  useCorrectEffect(() => {
    if (!focus || !menuOpen) return

    menuRef.current.querySelector('li a').focus()
    menuRef.current.addEventListener('focusout', checkInnerFocus)

    return () => {
      menuRef.current.removeEventListener('focusout', checkInnerFocus)
    }
  }, [focus, menuOpen])

  const checkInnerFocus = () => {
    if (menuRef.current.querySelectorAll(':focus-within').length === 0) {
      handleClose()
      accountMenuTriggerRef.current.click()
    }
  }

  const handleHelpCase = () => onLinkClick('help')
  const handleLogoutCase = () => {
    onLinkClick('logout')
  }

  const updateFocus = (e) => {
    if (e.charCode === KEYS.SPACE || e.charCode === KEYS.ENTER) setFocus(true)
  }

  const handleOpen = () => setMenuOpen(true)
  const handleClose = () => {
    setMenuOpen(false)
    setFocus(false)
  }

  // Hold off on rendering until we have a clear response on user status
  if (userStatus === 'pending') return <></>

  return (
    <div ref={menuRef}>
      <div className={cx(avatarWrapper, bottomTooltip)} data-tooltip={t('nav:account', 'Account')}>
        <AvatarButton
          aria-label={t('nav:open-account-menu', 'Open Account Menu')}
          src={avatarSrc}
          ref={accountMenuTriggerRef}
          size="40px"
          label={null}
          className={avatarStyle}
          data-testid="account-menu-avatar"
          onClick={handleOpen}
          onKeyPress={updateFocus}
        />
        {showNotification ? <FloatingNotification data-testid="notification-avatar" /> : null}
      </div>
      <PopupMenu
        trigger={accountMenuTriggerRef}
        title={t('nav:account', 'Account')}
        screenReaderLabel={t('nav:account-menu', 'Account Menu')}
        appRootSelector={appRootSelector}
        onOpen={onAccountClick}
        onClose={handleClose}
        popperOptions={{
          placement: 'bottom-end',
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 4]
              }
            }
          ]
        }}
        data-testid="account-menu">
        <PopupMenuGroup>
          <div className={staticMenu}>
            <div>{accountName}</div>
            {accountEmail ? <div className="sub">{accountEmail}</div> : null}
          </div>
        </PopupMenuGroup>
        <PopupMenuGroup>
          <PopupMenuItem
            href="https://help.getpocket.com/category/847-category?src=navbar"
            id="account-menu-help-link"
            onClick={handleHelpCase}
            data-testid="account-menu-help-link">
            <Trans i18nKey="nav:get-help">Get help</Trans>
          </PopupMenuItem>
        </PopupMenuGroup>
        <PopupMenuGroup>
          <PopupMenuItem
            external={true}
            href="https://getpocket.com/lo?src=navbar"
            id="account-menu-logout-link"
            onClick={handleLogoutCase}
            data-testid="account-menu-logout-link">
            <Trans i18nKey="nav:log-out">Log out</Trans>
          </PopupMenuItem>
        </PopupMenuGroup>
      </PopupMenu>
    </div>
  )
}

export default GlobalNavAccountLimited
