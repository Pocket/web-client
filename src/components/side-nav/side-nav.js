import Link from 'next/link'
import { Trans, useTranslation } from 'next-i18next'

import { HomeIcon } from '@pocket/web-ui'
import { ArchiveIcon } from '@pocket/web-ui'
import { ChevronUpIcon } from '@pocket/web-ui'
import { DiscoverIcon } from '@pocket/web-ui'
import { ListViewIcon } from '@pocket/web-ui'
import { ReadingIcon } from '@pocket/web-ui'
import { css, cx } from 'linaria'

import { useInView } from 'react-intersection-observer'

import { FiltersSideNav } from './filters'
import { TopicsSideNav } from './topics'
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
  line-height: 0.8;
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

export function SideNav({
  subset,
  tag,
  pinnedTags,
  pinnedTopics,
  isDisabled,
  newSaveCount,
  showHome,
  showSharedLists,
  showLab,
  flagsReady,
  trackMenuClick
}) {
  const { t } = useTranslation()

  const [ref, inView] = useInView({ threshold: 0.5 })

  const subActive = (active, isTag) => {
    const isActive = tag ? active === tag : active === subset
    const activeClass = isActive ? 'active' : ''
    const tagClass = isTag ? 'tag-class' : ''
    return `${sideNavItem} ${activeClass} ${tagClass}`
  }

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0
    })
  }

  const wrapperClass = cx(sideNavWrapper, 'side-nav', isDisabled && 'disabled')

  const clickEvent = (e) => trackMenuClick(e.target.textContent)

  return flagsReady ? (
    <div className={wrapperClass}>
      <nav role="navigation">
        {showHome ? (
          <>
            <Link href="/home">
              <button
                className={subActive('home')}
                onClick={clickEvent}
                ref={ref}
                data-cy="side-nav-home">
                <HomeIcon className="side-nav-icon" />{' '}
                <Trans i18nKey="nav:home">Home</Trans>
              </button>
            </Link>
            <Link href="/my-list">
              <button
                className={subActive('unread')}
                onClick={clickEvent}
                data-cy="side-nav-mylist">
                <ListViewIcon className="side-nav-icon" />{' '}
                <Trans i18nKey="nav:my-list">My List</Trans>
                { showLab ? <BookmarkIcon newSaveCount={newSaveCount} /> : null }
              </button>
            </Link>
            <a href="https://getpocket.com/explore?src=sidebar">
              <button
                className={subActive('discover')}
                onClick={clickEvent}
                data-cy="side-nav-discover">
                <DiscoverIcon className="side-nav-icon" />{' '}
                <Trans i18nKey="nav:discover">Discover</Trans>
              </button>
            </a>
          </>
        ) : (
          <Link href="/my-list">
            <button
              className={subActive('unread')}
              onClick={clickEvent}
              ref={ref}
              data-cy="side-nav-mylist">
              <HomeIcon className="side-nav-icon" />{' '}
              <Trans i18nKey="nav:my-list">My List</Trans>
            </button>
          </Link>
        )}

        {!showLab ? (
          <Link href="/my-list/archive">
            <button
              className={subActive('archive')}
              onClick={clickEvent}
              data-cy="side-nav-archive">
              <ArchiveIcon className="side-nav-icon" />{' '}
              <Trans i18nKey="nav:archive">Archive</Trans>
            </button>
          </Link>
        ) : null}

        {showSharedLists ? (
          <Link href="/shared-lists">
            <button className={`${subActive('shared-lists')} wrap`} onClick={clickEvent}>
              <ReadingIcon className="side-nav-icon" />{' '}
              <Trans i18nKey="nav:shared-list">Share Your Lists</Trans>
            </button>
          </Link>
        ) : null}

        {subset === 'home' && showLab ? (
          <TopicsSideNav
            subActive={subActive}
            pinnedTopics={pinnedTopics}
            clickEvent={clickEvent}
          />
        ) : (
          <FiltersSideNav
            showLab={showLab}
            subActive={subActive}
            pinnedTags={pinnedTags}
            clickEvent={clickEvent}
          />
        )}
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
  ) : (
    <div className={wrapperClass}>
      <nav role="navigation" className="dummy-nav" />
    </div>
  )
}
