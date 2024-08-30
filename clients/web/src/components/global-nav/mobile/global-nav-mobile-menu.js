import Link from 'next/link'
import PropTypes from 'prop-types'
import { css, cx } from '@emotion/css'
import { Trans, useTranslation } from 'next-i18next'
import { PremiumIcon } from '@ui/icons/PremiumIcon'
import { MenuIcon } from '@ui/icons/MenuIcon'
import { ChevronLeftIcon } from '@ui/icons/ChevronLeftIcon'
import { Drawer } from 'components/drawer/drawer'
import { DEFAULT_LINKS } from 'components/global-nav/links/global-nav-links'
import { bottomTooltip } from 'components/tooltip/tooltip'

const premiumLinks = [
  {
    name: 'upgrade',
    id: 'upgrade-to-premium',
    label: <Trans i18nKey="nav:upgrade">Upgrade</Trans>,
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

  .beta {
    padding: 0 5px;
    margin-left: 0.5rem;
  }
`
const iconStyle = css`
  width: var(--size300);
  height: var(--size300);

  &:focus {
    transition: none;
    color: var(--color-navCurrentTabText);
    outline: 1px auto var(--color-navCurrentTab) !important;
  }

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
}) => {
  return (
    <li>
      <Link
        href={isDisabled ? null : url}
        id={id}
        className={cx(isSelected && 'selected', isDisabled && 'disabled')}
        onClick={(event) => {
          handleClick(event, name, url)
        }}>
        {icon ? icon : null}
        {label}
      </Link>
    </li>
  )
}

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
  const { t } = useTranslation()

  return (
    <div className={drawerHeaderStyles}>
      <button
        aria-label={t('nav:close-the-pocket-mobile-menu', 'Close the Pocket mobile menu')}
        data-testid="mobile-menu"
        data-tooltip={t('nav:close', 'Close')}
        onClick={handleClose}
        className={cx(iconStyle, bottomTooltip, 'inline')}>
        <ChevronLeftIcon />
      </button>
    </div>
  )
}

export const Menu = ({
  links,
  subLinks,
  selectedLink,
  isUserLoggedIn,
  isUserPremium,
  handleClick
}) => (
  <ul className={listStyle} suppressHydrationWarning>
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
    {subLinks
      ? subLinks.map((link) => {
          const isSelected = link.name === selectedLink
          const key = `global-nav-mobile-menu-${link?.name}`
          return link.url ? (
            <MobileLink
              link={link}
              isSelected={isSelected}
              handleClick={(event) => {
                handleClick(event, link.name, link.url)
              }}
              key={key}
            />
          ) : null
        })
      : null}
    {isUserLoggedIn && !isUserPremium ? (
      <>
        <hr className="nav-divider" />
        <span className="subhead" data-testid="premium-nudge-section">
          <Trans i18nKey="nav:try-premium">Try Premium</Trans>
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
  links = DEFAULT_LINKS,
  selectedLink = null,
  onLinkClick = () => {},
  onOpen = () => {},
  onClosed = () => {},
  isUserLoggedIn = false,
  isUserPremium = false,
  subLinks,
  appRootSelector,
  isOpen,
  toggleMenuOpen,
  toggleClass
}) => {
  const { t } = useTranslation()

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
      <button
        data-testid="nav-hamburger"
        onClick={handleOpen}
        aria-label={t('nav:open-the-pocket-mobile-menu', 'Open the Pocket mobile menu')}
        data-tooltip={t('nav:open', 'Open')}
        className={cx(iconStyle, toggleClass, bottomTooltip, 'inline')}
        suppressHydrationWarning>
        <MenuIcon />
      </button>
      <Drawer
        appRootSelector={appRootSelector}
        isOpen={isOpen}
        handleClose={handleClose}
        screenReaderLabel={t('nav:pocket-mobile-menu', 'Pocket Mobile Menu')}>
        <DrawerHeader handleClose={handleClose} />
        <Menu
          subLinks={subLinks}
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
      label: PropTypes.node.isRequired,
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

export default GlobalNavMobileMenu
