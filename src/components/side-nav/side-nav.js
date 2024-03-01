import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { css, cx } from '@emotion/css'
import { useRef } from 'react'
import { HomeIcon } from 'components/icons/HomeIcon'
import { SaveIcon } from 'components/icons/SaveIcon'
import { SaveFilledIcon } from 'components/icons/SaveFilledIcon'
import { ChevronUpIcon } from 'components/icons/ChevronUpIcon'
import { DiscoverIcon } from 'components/icons/DiscoverIcon'
import { CollectionsIcon } from 'components/icons/CollectionsIcon'

import { useIntersectionObserver } from 'common/utilities/intersection/intersection'

import { FiltersSideNav } from './filters'
import { AccountSideNav } from './account'

export const sideNavWrapper = css`
  position: relative;
  grid-column: span 2;
  max-width: 165px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  a {
    text-decoration: none;
    text-align: left;
  }

  &.disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  .bottom-nav {
    margin: 0;
    position: sticky;
    bottom: 50px;

    button {
      background-color: var(--color-popoverCanvas);
      color: var(--color-textSecondary);
      font-size: var(--size150);
      border-radius: 50%;
      height: 32px;
      width: 32px;
      text-align: center;
      padding: 2px 0 0;
      pointer-events: none;
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15);
      opacity: 0;
      transition:
        all 150ms ease-in-out,
        opacity 450ms ease-in-out;

      &:hover {
        color: var(--color-textPrimary);
        background-color: var(--color-actionPrimarySubdued);
        box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.15);
      }
      &.visible {
        pointer-events: auto;
        opacity: 1;
      }
    }
  }

  .dummy-nav {
    min-height: 550px;
  }
`

export const sideNavActionHeader = css`
  display: flex;
  justify-content: space-between;
  margin: 25px 0 5px;

  h4 {
    margin-top: 0;
  }

  button {
    padding: 0.5rem;
  }
`

export const sideNavHeader = css`
  font-family: var(--fontSansSerif);
  font-size: var(--fontSize100);
  font-weight: 500;
  line-height: 1;
  padding: var(--spacing050);
  margin: 25px 0 5px;
  color: var(--color-textSecondary);
`

export const sideNavItem = css`
  display: flex;
  align-items: center;
  align-content: center;
  width: 100%;
  padding: 0 var(--size050);
  font-size: var(--fontSize100);
  font-weight: 400;
  line-height: 24px;
  height: 40px;
  margin-bottom: 5px;
  border-radius: 4px;
  text-decoration: none;
  text-align: left;
  color: var(--color-textPrimary);
  background-color: transparent;

  &.wrap {
    align-items: flex-start;
    text-align: left;
    line-height: 1.25;
  }

  &.tag-class {
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: var(--fontSize085);
    text-align: left;
    padding: var(--spacing025) var(--spacing050);
    height: initial;
  }

  .side-nav-icon {
    height: 24px;
    padding-right: 10px;
    margin-top: 0;

    &.active {
      display: none;
    }
  }

  .beta {
    padding: 0 5px;
    margin-left: 0.75rem;
  }

  &:hover {
    color: var(--color-actionPrimary);
    background-color: transparent;
  }
  &:active,
  &:focus {
    transition: none;
    color: var(--color-navCurrentTabText);
    outline: 1px auto var(--color-navCurrentTab);
  }
  &.active {
    color: var(--color-navCurrentTabText);
    background-color: var(--color-navCurrentTab);

    .side-nav-icon {
      &.active {
        display: block;
      }
      &.inactive {
        display: none;
      }
    }
  }
`

export function SideNav({
  type,
  subset,
  tag,
  pinned,
  isDisabled,
  trackMenuClick,
  handleCreateList,
  recentLists
}) {
  const { t } = useTranslation()
  const viewRef = useRef(null)

  // Fire when item is in view
  const entry = useIntersectionObserver(viewRef, { threshold: 0.5 })
  const inView = !!entry?.isIntersecting

  const subActive = (active, isTag) => {
    const isActive = tag ? active === tag : active === subset
    const activeClass = isActive ? 'active' : ''
    const tagClass = isTag ? 'tag-class' : ''
    return `${sideNavItem} ${activeClass} ${tagClass}`
  }

  const scrollToTop = () => window.scroll({ top: 0, left: 0 })
  const wrapperClass = cx(sideNavWrapper, 'side-nav', isDisabled && 'disabled')
  const clickEvent = (e) => trackMenuClick(e.target.textContent)

  const navTypes = {
    saves: FiltersSideNav,
    account: AccountSideNav
  }
  const SubNav = navTypes[type]

  return (
    <div className={wrapperClass} data-testid="side-nav">
      <nav role="navigation">
        <Link
          href="/home?src=sidebar"
          ref={viewRef} // when ref offscreen, show "Return to top" button
          className={subActive('home')}
          onClick={clickEvent}
          data-testid="side-nav-home">
          <HomeIcon className="side-nav-icon" /> {t('nav:home', 'Home')}
        </Link>
        <Link
          href="/saves?src=sidebar"
          className={subActive('unread')}
          onClick={clickEvent}
          data-testid="side-nav-saves">
          <SaveIcon className="side-nav-icon inactive" />
          <SaveFilledIcon className="side-nav-icon active" />
          {t('nav:saves', 'Saves')}
        </Link>
        <Link
          href="/explore?src=sidebar"
          className={subActive('discover')}
          onClick={clickEvent}
          data-testid="side-nav-discover">
          <DiscoverIcon className="side-nav-icon" /> {t('nav:discover', 'Discover')}
        </Link>
        <Link
          href="/collections?src=sidebar"
          className={subActive('collections')}
          onClick={clickEvent}
          data-testid="side-nav-collections">
          <CollectionsIcon className="side-nav-icon" /> {t('nav:collections', 'Collections')}
        </Link>
        {SubNav ? (
          <SubNav
            subActive={subActive}
            pinned={pinned}
            clickEvent={clickEvent}
            handleCreateList={handleCreateList}
            recentLists={recentLists}
          />
        ) : null}
      </nav>
      <div className="bottom-nav">
        <button
          onClick={scrollToTop}
          aria-label={t('nav:return-to-top', 'Return to top')}
          className={!inView ? 'visible' : 'hidden'}
          data-testid="side-nav-scroll-to-top">
          <ChevronUpIcon />
        </button>
      </div>
    </div>
  )
}
