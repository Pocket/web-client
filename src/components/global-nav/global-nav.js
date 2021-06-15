import React, { useState } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { css } from 'linaria'
import classnames from 'classnames'
import { useCorrectEffect } from 'common/utilities/hooks/use-correct-effect'
import { useTranslation } from 'next-i18next'

import { breakpointSmallTablet } from '@pocket/web-ui'
import { breakpointLargeTablet } from '@pocket/web-ui'
import { fontSansSerif } from '@pocket/web-ui'
import { fontSize100 } from '@pocket/web-ui'
import { screenLargeTablet } from '@pocket/web-ui'
import { PageContainer } from '@pocket/web-ui'
import { Logo } from '@pocket/web-ui'
import { LogoMark } from '@pocket/web-ui'
import { useViewport } from '@pocket/web-ui'

import GlobalNavLinks from './links/global-nav-links'
import GlobalNavMobileMenu from './mobile/global-nav-mobile-menu'
import GlobalNavTools from './tools/global-nav-tools'
import GlobalNavAccount from './account/global-nav-account'

const headerStyle = css`
  width: 100%;
  background: var(--color-canvas);
  box-shadow: var(--raisedCanvas);
  /*bottom border custom color adds a subtle "shadow" effect */
  border-bottom: solid 1px var(--color-dividerTertiary);
  position: fixed;
  z-index: var(--zIndexTooltip);
  .pocket-logo {
    display: inline-block;
    position: relative;
    margin-right: 6rem;
    margin-left: calc(-1 * var(--spacing075));
    padding: var(--spacing050) var(--spacing050);
    line-height: 1;

    &:focus {
      outline: none;

      &::before {
        content: '';
        display: block;
        position: absolute;
        top: -2px;
        left: -2px;
        bottom: -2px;
        right: -2px;
        border: 2px solid var(--color-actionPrimary);
        border-radius: 4px;
      }
    }

    &:hover,
    &:active {
      &::before {
        display: none;
      }
    }
  }

  .logo-mark {
    display: none;
  }

  ${breakpointSmallTablet} {
    .pocket-logo {
      &:hover {
        cursor: pointer;
      }
    }
  }

  ${breakpointLargeTablet} {
    .pocket-logo {
      margin-right: 1rem;
    }
    &.logged-in {
      .logo {
        display: none;
      }
    }

    &.logged-in .logo-mark {
      display: block;
    }
    .links {
      display: none;
    }
  }

  .global-nav-container {
    padding-top: 0;
    padding-bottom: 0;
    height: var(--size400);
  }

  @media print {
    display: none;
  }
`

const navStyle = css`
  display: flex;
  align-items: center;
  height: 100%;

  .site-nav {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
  }

  .hamburger-icon {
    display: none;
    &:focus {
      transition: none;
      color: var(--color-navCurrentTabText);
      outline: 1px auto var(--color-navCurrentTab);
    }
  }

  ${breakpointLargeTablet} {
    .hamburger-icon {
      display: block;
      margin-left: calc(-1 * var(--spacing075));
    }
  }
`

const linksStyle = css`
  flex-grow: 2;
  justify-content: flex-start;
  display: flex;
  font-family: ${fontSansSerif};
  line-height: 1;
  white-space: nowrap;

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-size: ${fontSize100};
  }

  li {
    display: inline-block;
  }

  a {
    font-weight: 500;
    text-decoration: none;
    line-height: 1.5rem;
  }
`

const toolsStyle = css`
  margin-right: var(--spacing100);
  padding-right: var(--spacing100);
  position: relative;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 20%;
    right: 0;
    width: 1px;
    height: 60%;
    border-right: var(--dividerStyle);
  }

  &.is-premium {
    padding-right: 0;

    &::after {
      display: none;
    }
  }
`

/**
 * Navigation UI that sits at the top of any standard Pocket Web view.
 *
 * ```js
 * import { GlobalNav } from '@pocket/web-ui'
 *
 * //...
 * <GlobalNav isLoggedIn={!!state.user.auth} />
 * ```
 */
const GlobalNav = ({
  subLinks,
  subset,
  tag,
  appRootSelector,
  pocketLogoOutboundUrl,
  selectedLink,
  isLoggedIn,
  isPremium,
  avatarSrc,
  accountName,
  profileUrl,
  onLinkClick,
  onToolClick,
  onLoginClick,
  onAccountClick,
  listMode,
  colorMode,
  setColorMode,
  toggleListMode,
  setListMode,
  setGridMode,
  setDetailMode,
  showNotification,
  links,
  tools,
  flagsReady,
  sendImpression,
  userStatus,
  children
}) => {
  const { t } = useTranslation()

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const viewport = useViewport()
  // if viewport not available, we're probably SSR and so set the default to the
  // desktop experience for SEO purposes
  const viewportWidth = viewport ? viewport.width : screenLargeTablet + 1
  const [isMobile, setIsMobile] = useState(viewportWidth <= screenLargeTablet)

  function handleLinkClick(linkId, event) {
    if (isMobile) {
      event.preventDefault()
      setMobileMenuOpen(true)
      return
    }
    const linkUrl = event?.currentTarget?.href
    onLinkClick(linkId, linkUrl)
  }

  // effect for handling window resize
  useCorrectEffect(() => {
    setIsMobile(viewportWidth <= screenLargeTablet)
  }, [viewportWidth])

  return (
    <header className={classnames(headerStyle, { 'logged-in': isLoggedIn })}>
      <PageContainer className="global-nav-container">
        <nav className={navStyle} data-cy="global-nav">
          <div className="site-nav">
            <GlobalNavMobileMenu
              appRootSelector={appRootSelector}
              links={links}
              subLinks={subLinks}
              subset={subset}
              tag={tag}
              onLinkClick={onLinkClick}
              selectedLink={selectedLink}
              toggleClass="hamburger-icon"
              isOpen={isMobileMenuOpen}
              toggleMenuOpen={setMobileMenuOpen}
            />
            <Link href={pocketLogoOutboundUrl} data-test="logo-link">
              <a
                id="pocket-logo-nav"
                className="pocket-logo"
                onClick={(event) => {
                  handleLinkClick('pocket', event)
                }}
                data-cy="logo-link">
                <Logo className="logo" />
                {isLoggedIn ? <LogoMark className="logo-mark" /> : null}
              </a>
            </Link>
          </div>
          {children ? (
            children
          ) : (
            <>
              {flagsReady ? (
                <div
                  className={linksStyle}
                  aria-label={t('nav:page-navigation', 'Page navigation')}>
                  <GlobalNavLinks
                    selectedLink={selectedLink}
                    className="links"
                    links={links}
                    onLinkClick={onLinkClick}
                    data-cy="primary-links"
                  />
                </div>
              ) : (
                <div className={linksStyle}></div>
              )}

              <div className={classnames(toolsStyle, { 'is-premium': isPremium })}>
                <GlobalNavTools tools={tools} onToolClick={onToolClick} />
              </div>

              <GlobalNavAccount
                onLoginClick={onLoginClick}
                appRootSelector={appRootSelector}
                isPremium={isPremium}
                isLoggedIn={isLoggedIn}
                avatarSrc={avatarSrc}
                accountName={accountName}
                profileUrl={profileUrl}
                onLinkClick={onLinkClick}
                onAccountClick={onAccountClick}
                userStatus={userStatus}
                listMode={listMode}
                colorMode={colorMode}
                setColorMode={setColorMode}
                toggleListMode={toggleListMode}
                sendImpression={sendImpression}
                setListMode={setListMode}
                setGridMode={setGridMode}
                setDetailMode={setDetailMode}
                showNotification={showNotification}
              />
            </>
          )}
        </nav>
      </PageContainer>
    </header>
  )
}

GlobalNav.propTypes = {
  /**
   * Query selector to pass to components (e.g. MobileMenu, and Popover) that
   * make use of the Modal component, this lets the Modal component correctly
   * place its markup
   */
  appRootSelector: PropTypes.string.isRequired,
  /**
   * Destination url to send user, when ze clicks the Pocket Logo in the top-left
   */
  pocketLogoOutboundUrl: PropTypes.string,
  /**
   * If true, displays account-relevant links in the nav. If false, these links
   * are replaced with the "logged out" experience.
   */
  selectedLink: PropTypes.string,
  /**
   * If true, displays account-relevant links in the nav. If false, these links
   * are replaced with the "logged out" experience.
   */
  isLoggedIn: PropTypes.bool,
  /**
   * If true, avoids presenting premium  upsells to User
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
   * Called when any link in the nav is clicked. Passes the link id and the link url.
   * Can be used for tracking analytics.
   */
  onLinkClick: PropTypes.func,
  /**
   * Called when any tool (exposed by /components/global-nav/global-nav-tools.js) in the nav is clicked. Passes tool name.
   * Can be used for tracking analytics.
   */
  onToolClick: PropTypes.func,
  /**
   * Links to display. Accepted as a prop so that links can be customized per page
   * context via the GlobalNav parent. Each link should have a name (id), label
   * (for display), and url. Each link will be rendered as an anchor in a list.
   */
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      url: PropTypes.string
    })
  ),
  /**
   * Tool icons to display. Accepted as a prop so that tools can be customized per
   * page context via the GlobalNav parent. Each tool should have a name (id),
   * label (for display), and icon component. Each icon will be rendered as a
   * button in a list.
   */
  tools: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      icon: PropTypes.node
    })
  ),
  /**
   * Child element(s) to display _in place of_ standard links + tools + user functionality
   */
  children: PropTypes.node
}

GlobalNav.defaultProps = {
  pocketLogoOutboundUrl: '/explore?src=navbar',
  selectedLink: '',
  isLoggedIn: false,
  isPremium: false,
  avatarSrc: null,
  accountName: undefined,
  profileUrl: null,
  onLinkClick(linkId, event) {},
  onToolClick(linkId, event) {},
  onAccountClick(event) {},
  tools: [],
  children: null
}

export default GlobalNav
