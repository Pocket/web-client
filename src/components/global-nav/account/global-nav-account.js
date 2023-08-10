import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { css, cx } from '@emotion/css'
import { Trans, useTranslation } from 'next-i18next'
import { useCorrectEffect } from 'common/utilities/hooks/use-correct-effect'
import { KEYS, PREMIUM_URL } from 'common/constants'
import { NewViewIcon } from 'components/icons/NewViewIcon'
import { breakpointLargeHandset } from 'common/constants'
import { ProfileIcon } from 'components/icons/ProfileIcon'
import { PremiumIcon } from 'components/icons/PremiumIcon'
import { AvatarButton } from 'components/avatar/avatar-button'
import { PopupMenu, PopupMenuGroup, PopupMenuItem } from 'components/popup-menu/popup-menu'
import { bottomTooltip } from 'components/tooltip/tooltip'
import { ThemeSettings } from 'components/display-settings/theme'
import { ListSettings } from 'components/display-settings/list-modes'
import VisibilitySensor from 'components/visibility-sensor/visibility-sensor'

import { FloatingNotification } from './notification'

const accountLinkStyle = css`
  display: inline-block;
  position: relative;
  padding: var(--spacing075) var(--spacing050);
  margin-right: var(--spacing150);
  vertical-align: middle;
  line-height: 110%;
  font-family: var(--fontSansSerif);
  font-weight: 500;
  text-decoration: none;

  &:focus {
    outline: 0;

    &::before {
      content: '';
      display: block;
      box-sizing: border-box;
      position: absolute;
      left: -2px;
      right: -2px;
      top: -2px;
      bottom: -2px;
      border: 2px solid var(--color-actionPrimary);
      border-radius: 4px;
    }
  }

  &:hover {
    text-decoration: none;

    &::before {
      display: none;
    }
  }

  &:active {
    &::before {
      display: none;
    }
  }

  .icon {
    height: 1.5rem;
    margin-right: var(--spacing050);
  }

  ${breakpointLargeHandset} {
    &.login-link {
      display: none;
    }
  }
`

const signupLinkStyle = css`
  font-weight: 500;
  vertical-align: middle;

  .icon {
    display: none;
  }

  ${breakpointLargeHandset} {
    // needed specificity to override secondary variant styles
    &.secondary {
      border: none;

      &:hover {
        background: none;
        color: var(--color-textLinkHover);
      }

      &:active {
        color: var(--color-textLinkPressed);
      }

      .label {
        position: absolute;
        left: -99999px;
      }

      .icon {
        height: var(--fontSize150);
        display: inline-block;
        margin-top: 0;
      }
    }
  }
`

const upgradeLinkStyle = css`
  ${breakpointLargeHandset} {
    margin-right: var(--spacing075);

    .icon {
      margin-right: 0;
    }

    .label {
      position: absolute;
      left: -99999px;
    }
  }
`

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

/**
 * Component for displaying account links and menu in the GlobalNav. Renders
 * login/signup/premium links depending on user state, as well as an avatar
 * with account menu for logged in users.
 */
const GlobalNavAccount = ({
  appRootSelector,
  onLoginClick,
  userStatus,
  listMode,
  colorMode,
  setColorMode,
  setListMode,
  setGridMode,
  setDetailMode,
  sendImpression,
  showNotification,
  isLoggedIn = false,
  isPremium = false,
  isFxa,
  avatarSrc = null,
  accountName = 'You',
  accountEmail,
  profileUrl = null,
  onLinkClick = () => {},
  onAccountClick = () => {}
}) => {
  const { t } = useTranslation()

  const brazeInitialized = useSelector((state) => state?.braze?.initialized)

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

  const handleSignupCase = () => onLinkClick('signup')
  const handlePremiumCase = () => onLinkClick('premium')
  const handleViewProfileCase = () => onLinkClick('view-profile')
  const handleManageAccountCase = () => onLinkClick('manage-account')
  const handleHelpCase = () => onLinkClick('help')
  const handleMessagesCase = () => onLinkClick('messages')
  const handleLogoutCase = () => {
    onLinkClick('logout')
    // Fire for all users when Braze launches
    if (brazeInitialized)
      import('common/utilities/braze/braze-lazy-load').then(({ destroy }) => destroy())
  }

  function handleVisible() {
    sendImpression('global-nav.upgrade-link')
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

  return !isLoggedIn ? (
    <div>
      <a
        href="https://getpocket.com/login?src=navbar"
        id="global-nav-login-link"
        className={`${accountLinkStyle} login-link`}
        onClick={onLoginClick}
        data-cy="login-link">
        <Trans i18nKey="nav:log-in">Log in</Trans>
      </a>
      <a
        href="https://getpocket.com/signup?src=navbar"
        id="global-nav-signup-link"
        className={cx(signupLinkStyle, 'button secondary')}
        onClick={handleSignupCase}
        data-cy="signup-link">
        <ProfileIcon />
        <span className="label">
          <Trans i18nKey="nav:sign-up">Sign up</Trans>
        </span>
      </a>
    </div>
  ) : (
    <div ref={menuRef}>
      {!isPremium ? (
        <VisibilitySensor onVisible={handleVisible}>
          <a
            href={`${PREMIUM_URL}&utm_campaign=global-nav&src=navbar`}
            id="global-nav.upgrade-link"
            className={`${accountLinkStyle} ${upgradeLinkStyle}`}
            onClick={handlePremiumCase}
            data-cy="upgrade-link">
            <PremiumIcon />
            <span className="label">
              <Trans i18nKey="nav:upgrade">Upgrade</Trans>
            </span>
          </a>
        </VisibilitySensor>
      ) : null}
      <div className={cx(avatarWrapper, bottomTooltip)} data-tooltip={t('nav:account', 'Account')}>
        <AvatarButton
          aria-label={t('nav:open-account-menu', 'Open Account Menu')}
          src={avatarSrc}
          ref={accountMenuTriggerRef}
          size="40px"
          label={null}
          className={avatarStyle}
          data-cy="account-menu-avatar"
          onClick={handleOpen}
          onKeyPress={updateFocus}
        />
        {showNotification ? <FloatingNotification data-cy="notification-avatar" /> : null}
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
        data-cy="account-menu">
        <PopupMenuGroup>
          <PopupMenuItem
            external={true}
            href={profileUrl}
            helperText={t('nav:view-profile', 'View Profile')}
            id="account-menu-profile-link"
            onClick={handleViewProfileCase}
            data-cy="account-menu-profile-link">
            {accountName}
          </PopupMenuItem>
        </PopupMenuGroup>
        <PopupMenuGroup>
          <PopupMenuItem
            href="/account?src=navbar"
            id="account-menu-manage-account-link"
            onClick={handleManageAccountCase}
            data-cy="account-menu-manage-account-link">
            <Trans i18nKey="nav:manage-profile">Manage profile</Trans>
          </PopupMenuItem>
          {isFxa ? (
            <PopupMenuItem
              href="https://accounts.firefox.com/"
              id="account-menu-manage-fxa-link"
              className="label-wide"
              data-cy="account-menu-manage-fxa-link">
              <div className="manage-account">
                <div>
                  {accountEmail ? `${accountEmail}` : null}
                  <div className="label-secondary">
                    <Trans i18nKey="nav:manage-fxa">Manage your account</Trans>
                  </div>
                </div>
                <NewViewIcon className="label-secondary" />
              </div>
            </PopupMenuItem>
          ) : null}
          <PopupMenuItem
            href="https://help.getpocket.com/category/847-category?src=navbar"
            id="account-menu-help-link"
            onClick={handleHelpCase}
            data-cy="account-menu-help-link">
            <Trans i18nKey="nav:get-help">Get help</Trans>
          </PopupMenuItem>
        </PopupMenuGroup>
        <PopupMenuGroup>
          <PopupMenuItem
            external={true}
            href="https://getpocket.com/lo?src=navbar"
            id="account-menu-logout-link"
            onClick={handleLogoutCase}
            data-cy="account-menu-logout-link">
            <Trans i18nKey="nav:log-out">Log out</Trans>
          </PopupMenuItem>
        </PopupMenuGroup>
        <ThemeSettings setColorMode={setColorMode} colorMode={colorMode} />
        <ListSettings
          listMode={listMode}
          setListMode={setListMode}
          setGridMode={setGridMode}
          setDetailMode={setDetailMode}
        />
      </PopupMenu>
    </div>
  )
}

GlobalNavAccount.propTypes = {
  /**
   * query selector specifying root element of React App, for use by the modal
   * for the account menu
   */
  appRootSelector: PropTypes.string.isRequired,

  /**
   * Controls what UI the user sees, appropriate for logged-in status.
   */
  isLoggedIn: PropTypes.bool,

  /**
   * Controls whether the user sees a premium signup link.
   */
  isPremium: PropTypes.bool,

  /**
   * Image src for the avatar used for the account menu.
   */
  avatarSrc: PropTypes.string,

  /**
   * Name of the account holder
   */
  accountName: PropTypes.string,

  /**
   * Url to the user's profile page (based on user id)
   */
  profileUrl: PropTypes.string,

  /**
   * Called when a user clicks on any link inside the account component. Is passed
   * the name of the link.
   */
  onLinkClick: PropTypes.func,

  /**
   * Called when the user clicks on the avatar to open the account menu
   */
  onAccountClick: PropTypes.func
}

export default GlobalNavAccount
