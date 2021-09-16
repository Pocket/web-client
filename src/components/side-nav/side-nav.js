import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { HomeIcon } from '@pocket/web-ui'
import { ChevronUpIcon } from '@pocket/web-ui'
import { DiscoverIcon } from '@pocket/web-ui'
import { ListViewIcon } from '@pocket/web-ui'
import { css, cx } from 'linaria'
import { CollectionsIcon } from '@pocket/web-ui'
import { BetaTag } from 'components/tags/tags'

import { useInView } from 'react-intersection-observer'

import { FiltersSideNav } from './filters'
import { TopicsSideNav } from './topics'
import { AccountSideNav } from './account'
import { BookmarkIcon } from './bookmark-icon'

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
      transition: all 150ms ease-in-out, opacity 450ms ease-in-out;

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
  }
`

export function SideNav({ type, subset, tag, pinned, isDisabled, newSaveCount, trackMenuClick }) {
  const { t } = useTranslation()

  const [ref, inView] = useInView({ threshold: 0.5 })

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
    home: TopicsSideNav,
    'my-list': FiltersSideNav,
    account: AccountSideNav
  }
  const SubNav = navTypes[type]

  return (
    <div className={wrapperClass}>
      <nav role="navigation">
        <Link href="/home?src=sidebar">
          <button
            ref={ref} // when ref offscreen, show "Return to top" button
            className={subActive('home')}
            onClick={clickEvent}
            data-cy="side-nav-home">
            <HomeIcon className="side-nav-icon" /> {t('nav:home', 'Home')}
            <BetaTag>BETA</BetaTag>
          </button>
        </Link>
        <Link href="/my-list?src=sidebar">
          <button className={subActive('unread')} onClick={clickEvent} data-cy="side-nav-mylist">
            <ListViewIcon className="side-nav-icon" /> {t('nav:my-list', 'My List')}
            <BookmarkIcon newSaveCount={newSaveCount} />
          </button>
        </Link>
        <Link href="/explore?src=sidebar">
          <button
            className={subActive('discover')}
            onClick={clickEvent}
            data-cy="side-nav-discover">
            <DiscoverIcon className="side-nav-icon" /> {t('nav:discover', 'Discover')}
          </button>
        </Link>
        <Link href="/collections?src=sidebar">
          <button
            className={subActive('collections')}
            onClick={clickEvent}
            ref={ref}
            data-cy="side-nav-collections">
            <CollectionsIcon className="side-nav-icon" /> {t('nav:collections', 'Collections')}
          </button>
        </Link>
        {SubNav ? <SubNav subActive={subActive} pinned={pinned} clickEvent={clickEvent} /> : null}
      </nav>
      <div className="bottom-nav">
        <button
          onClick={scrollToTop}
          aria-label={t('nav:return-to-top', 'Return to top')}
          className={!inView ? 'visible' : 'hidden'}
          data-cy="side-nav-scroll-to-top">
          <ChevronUpIcon />
        </button>
      </div>
    </div>
  )
}
