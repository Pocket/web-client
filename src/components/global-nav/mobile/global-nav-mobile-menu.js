import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { css } from 'linaria'
import classnames from 'classnames'
import {
  DiscoverIcon,
  ListViewIcon,
  PremiumIcon,
  MenuIcon,
  ChevronLeftIcon
} from '@pocket/web-ui'
import { Drawer } from '@pocket/web-ui'
import { Button } from '@pocket/web-ui'
import { testIdAttribute } from '@pocket/web-utilities/test-utils'

const premiumLinks = [
  {
    name: 'upgrade',
    id: 'upgrade-to-premium',
    label: 'Upgrade',
    url: 'https://getpocket.com/premium?src=navbar',
    icon: <PremiumIcon />
  }
]

const listStyle = css`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  font-family: var(--fontSansSerif);
  font-size: var(--fontSize100);
  font-weight: 500;
  flex-direction: column;
  background-color: var(--color-popoverCanvas);

  li {
    padding: 0;
    margin: 0;
  }

  a {
    display: inline-flex;
    padding: var(--spacing075) var(--size100);
    text-decoration: none;
    position: relative;
    line-height: 1.5rem;
    width: 100%;
    color: var(--color-textPrimary);
    align-items: center;
    transition: background-color 0.1s ease-out;

    &:focus {
      outline: 0;

      &::before {
        content: '';
        display: block;
        box-sizing: border-box;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        border: 2px solid var(--color-actionFocus);
        border-radius: 2px;
      }
    }

    &:hover:not(.selected):not(.disabled) {
      background-color: var(--color-actionPrimary);
      color: var(--color-actionPrimaryText);
    }

    &.selected {
      background-color: var(--color-navCurrentTab); /* needs alpha */
      color: var(--color-navCurrentTabText);
    }

    &.disabled,
    &.disabled:hover {
      opacity: 50%;
    }

    &:active:not(.selected):not(.disabled) {
      color: var(--color-menuItemHoverText);
      background-color: var(--color-menuItemActive);
    }

    /* don't display custom focus styles for mouse interaction, preferred they
       appear while focusing via keyboard */
    &:hover,
    &:active {
      &::before {
        display: none;
      }
    }

    svg {
      width: var(--size150);
      height: var(--size150);
      margin-right: var(--spacing075);
      margin-top: -1px;
    }
  }

  .nav-divider {
    margin: var(--size050) 0;
    border: none;
    border-bottom: solid 1px var(--color-popoverBorder);
  }

  .subhead {
    padding: var(--spacing075) var(--size100);
    opacity: 50%;
  }
`
const iconStyle = css`
  width: var(--size300);
  height: var(--size300);

  svg,
  span {
    width: var(--size150);
    height: var(--size150);
    margin-bottom: -2px;
  }
`

export const MobileLink = ({
  link: { name, isDisabled = false, url, icon, label, id },
  isSelected,
  handleClick
}) => (
  <li>
    <a
      id={id}
      className={classnames({
        selected: isSelected,
        disabled: isDisabled
      })}
      href={isDisabled ? null : url}
      onClick={(event) => {
        handleClick(event, name, url)
      }}>
      {icon ? icon : null}
      {label}
    </a>
  </li>
)

const drawerHeaderStyles = css`
  height: var(--size400);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-bottom: solid 1px var(--color-popoverBorder);
  margin-bottom: var(--spacing050);
  padding: 0;
  display: flex;
  align-items: center;
`
const DrawerHeader = ({ handleClose }) => {
  return (
    <div className={drawerHeaderStyles}>
      <Button onClick={handleClose} variant="inline" className={iconStyle}>
        <ChevronLeftIcon
          id="mobile-menu-chevron-icon"
          title="Close"
          description="Close the Pocket mobile menu"
        />
      </Button>
    </div>
  )
}

export const Menu = ({
  links,
  selectedLink,
  isUserLoggedIn,
  isUserPremium,
  handleClick
}) => (
  <ul className={listStyle}>
    {links.map((link) => {
      const isSelected = link.name === selectedLink
      const key = `global-nav-mobile-menu-${link?.name}`
      return (
        <MobileLink
          link={link}
          isSelected={isSelected}
          handleClick={(event) => {
            handleClick(event, link.name, link.url)
          }}
          key={key}
        />
      )
    })}
    {isUserLoggedIn && !isUserPremium ? (
      <>
        <hr className="nav-divider" />
        <span className="subhead" {...testIdAttribute('premium-nudge-section')}>
          Try Premium
        </span>
        {premiumLinks.map((premiumLink) => {
          const isSelected = premiumLink.name === selectedLink
          return (
            <MobileLink
              link={premiumLink}
              isSelected={isSelected}
              handleClick={handleClick}
              key={`global-nav-mobile-menu-${premiumLink?.name}`}
            />
          )
        })}
      </>
    ) : null}
  </ul>
)

/**
 * Component to render navigational links in the GlobalNav. Accepts a list of links
 * to render so that links may be customized per page context.
 */
const GlobalNavMobileMenu = ({
  links,
  selectedLink,
  onLinkClick,
  isUserLoggedIn,
  isUserPremium,
  onOpen,
  onClosed,
  appRootSelector,
  isOpen,
  toggleMenuOpen,
  toggleClass
}) => {
  function handleClick(event, linkName, linkUrl) {
    onLinkClick(linkName, linkUrl)
  }

  const handleClose = () => {
    onClosed()
    toggleMenuOpen(false)
  }

  const handleOpen = () => {
    onOpen()
    toggleMenuOpen(true)
  }

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="inline"
        className={classnames(iconStyle, toggleClass)}>
        <MenuIcon
          id="mobile-menu-menu-icon"
          title="Open"
          description="Open the Pocket mobile menu"
        />
      </Button>
      <Drawer
        appRootSelector={appRootSelector}
        isOpen={isOpen}
        handleClose={handleClose}
        screenReaderLabel="Pocket Mobile Menu">
        <DrawerHeader handleClose={handleClose} />
        <Menu
          links={links}
          selectedLink={selectedLink}
          handleClick={handleClick}
          isUserPremium={isUserPremium}
          isUserLoggedIn={isUserLoggedIn}
        />
      </Drawer>
    </>
  )
}

GlobalNavMobileMenu.propTypes = {
  /**
   * query selector specifying root element of React App (e.g. '#root'). This is
   * where the Drawer markup will be injected.
   */
  appRootSelector: PropTypes.string.isRequired,
  /**
   * Links to display. Accepted as a prop so that links can be customized per page
   * context via the GlobalNav parent. Each link should have a name (id), label
   * (for display), and url. Each link will be rendered as an MobileLink in a menu.
   */
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      isDisabled: PropTypes.bool,
      icon: PropTypes.node
    })
  ),

  /**
   * Name of a link that is selected, if any. Should match the name of one of the
   * links passed in with props. If a link matches this name, it will have an
   * "selected" style applied.
   */
  selectedLink: PropTypes.string,

  /**
   * Callback function called when any link is clicked. Gets passed the name and
   * url of that link.
   */
  onLinkClick: PropTypes.func,

  /**
   * Callback function called when the mobile menu is opened. Useful for analytics
   */
  onOpen: PropTypes.func,

  /**
   * Callback function called when the mobile menu is closed. Useful for analytics
   */
  onClosed: PropTypes.func,

  /**
   * Boolean indicating whether the user is logged in
   * url of that link.
   */
  isUserLoggedIn: PropTypes.bool,

  /**
   * Boolean indicating whether the user is a Premium User
   */
  isUserPremium: PropTypes.bool,
  /**
   * Boolean targeting dev users and tests, to provide an initial open state
   * for mobile menu
   */
  forceShow: PropTypes.bool
}

GlobalNavMobileMenu.defaultProps = {
  links: [
    {
      name: 'discover',
      id: 'global-nav-discover-link',
      label: 'Discover',
      url: 'https://getpocket.com/explore?src=navbar',
      icon: <DiscoverIcon />
    },
    {
      name: 'my-list',
      id: 'global-nav-my-list-link',
      label: 'My List',
      url: 'https://app.getpocket.com?src=navbar',
      icon: <ListViewIcon />
    }
  ],
  selectedLink: null,
  onLinkClick(event, linkName, linkUrl) {},
  onOpen() {},
  onClosed() {},
  isUserLoggedIn: false,
  isUserPremium: false,
  forceShow: false
}

export default GlobalNavMobileMenu
