import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { testIdAttribute } from '@pocket/web-utilities/test-utils'
import { css } from 'linaria'

import { breakpointLargeHandset } from '@pocket/web-ui'
import { ProfileIcon, PremiumIcon } from '@pocket/web-ui'
import { Button } from '@pocket/web-ui'
import { AvatarButton } from 'components/avatar/avatar-button'
import { PopupMenu, PopupMenuGroup, PopupMenuItem } from '@pocket/web-ui'
import { WithTooltip } from '@pocket/web-ui'

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
  isLoggedIn,
  isPremium,
  avatarSrc,
  accountName,
  profileUrl,
  appRootSelector,
  onLinkClick,
  onLoginClick,
  onAccountClick,
  userStatus
}) => {
  const accountMenuTriggerRef = useRef(null)

  function handleLinkClick(name, event) {
    onLinkClick(name, event)
  }

  // Hold off on rendering until we have a clear response on user status
  if (userStatus === 'pending') return <></>

  return !isLoggedIn ? (
    <div>
      <a
        href="https://getpocket.com/login?src=navbar"
        id="global-nav-login-link"
        className={`${accountLinkStyle} login-link`}
        onClick={(event) => {
          onLoginClick(event)
        }}
        {...testIdAttribute('login-link')}>
        Log in
      </a>
      <Button
        href="https://getpocket.com/signup?src=navbar"
        id="global-nav-signup-link"
        className={signupLinkStyle}
        variant="secondary"
        onClick={(event) => {
          handleLinkClick('signup', event)
        }}
        {...testIdAttribute('signup-link')}>
        <ProfileIcon />
        <span className="label">Sign up</span>
      </Button>
    </div>
  ) : (
    <div>
      {!isPremium ? (
        <a
          href="https://getpocket.com/premium?src=navbar"
          id="global-nav-upgrade-link"
          className={`${accountLinkStyle} ${upgradeLinkStyle}`}
          onClick={(event) => {
            handleLinkClick('premium', event)
          }}
          {...testIdAttribute('upgrade-link')}>
          <PremiumIcon />
          <span className="label">Upgrade</span>
        </a>
      ) : null}
      <WithTooltip label="Account">
        <AvatarButton
          src={avatarSrc}
          ref={accountMenuTriggerRef}
          size="40px"
          label={null}
          className={avatarStyle}
          {...testIdAttribute('account-menu-avatar')}
        />
      </WithTooltip>
      <PopupMenu
        trigger={accountMenuTriggerRef}
        title="Account"
        screenReaderLabel="Account menu"
        appRootSelector={appRootSelector}
        onOpen={onAccountClick}
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
        {...testIdAttribute('account-menu')}>
        <PopupMenuGroup>
          <PopupMenuItem
            helperText="View profile"
            href={profileUrl}
            id="account-menu-profile-link"
            onClick={(event) => {
              handleLinkClick('view-profile', event)
            }}
            {...testIdAttribute('account-menu-profile-link')}>
            {accountName}
          </PopupMenuItem>
        </PopupMenuGroup>
        <PopupMenuGroup>
          <PopupMenuItem
            href="https://getpocket.com/options?src=navbar"
            id="account-menu-manage-account-link"
            onClick={(event) => {
              handleLinkClick('manage-account', event)
            }}>
            Manage account
          </PopupMenuItem>
          <PopupMenuItem
            href="https://help.getpocket.com/category/847-category?src=navbar"
            id="account-menu-help-link"
            onClick={(event) => {
              handleLinkClick('help', event)
            }}>
            Get help
          </PopupMenuItem>
        </PopupMenuGroup>
        <PopupMenuGroup>
          <PopupMenuItem
            href="https://getpocket.com/lo?src=navbar"
            id="account-menu-logout-link"
            onClick={(event) => {
              handleLinkClick('logout', event)
            }}>
            Log out
          </PopupMenuItem>
        </PopupMenuGroup>
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

GlobalNavAccount.defaultProps = {
  isLoggedIn: false,
  isPremium: false,
  avatarSrc: null,
  accountName: 'You',
  profileUrl: null,
  onLinkClick(linkName) {},
  onAccountClick() {}
}

export default GlobalNavAccount
