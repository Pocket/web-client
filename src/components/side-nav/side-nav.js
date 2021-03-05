import Link from 'next/link'
import { Trans, useTranslation } from 'common/setup/i18n'

import { HomeIcon } from '@pocket/web-ui'
import { FavoriteIcon } from '@pocket/web-ui'
import { HighlightIcon } from '@pocket/web-ui'
import { TagIcon } from '@pocket/web-ui'
import { ArticleIcon } from '@pocket/web-ui'
import { ArchiveIcon } from '@pocket/web-ui'
import { VideoIcon } from '@pocket/web-ui'
import { ChevronUpIcon } from '@pocket/web-ui'
import { DiscoverIcon } from '@pocket/web-ui'
import { ListViewIcon } from '@pocket/web-ui'

import { css, cx } from 'linaria'

import { useInView } from 'react-intersection-observer'

export const sideNavWrapper = css`
  position: relative;
  grid-column: span 2;
  min-height: 50vh;
  max-width: 165px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &.disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  .top-nav {
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

export function SideNav({ subset, tag, pinnedTags, isDisabled, showHome }) {
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

  return (
    <div className={wrapperClass}>
      <nav role="navigation">
        {showHome ? (
          <>
            <Link href="/home">
              <button className={subActive('home')} ref={ref}>
                <HomeIcon className="side-nav-icon" />{' '}
                <Trans i18nKey="nav:home">Home</Trans>
              </button>
            </Link>
            <Link href="/explore">
              <button className={subActive('discover')} ref={ref}>
                <DiscoverIcon className="side-nav-icon" />{' '}
                <Trans i18nKey="nav:discover">Discover</Trans>
              </button>
            </Link>
            <Link href="/my-list">
              <button className={subActive('unread')} ref={ref}>
                <ListViewIcon className="side-nav-icon" />{' '}
                <Trans i18nKey="nav:my-list">My List</Trans>
              </button>
            </Link>
          </>
        ) : (
          <Link href="/my-list">
            <button className={subActive('unread')} ref={ref}>
              <HomeIcon className="side-nav-icon" />{' '}
              <Trans i18nKey="nav:my-list">My List</Trans>
            </button>
          </Link>
        )}

        <Link href="/my-list/archive">
          <button className={subActive('archive')}>
            <ArchiveIcon className="side-nav-icon" />{' '}
            <Trans i18nKey="nav:archive">Archive</Trans>
          </button>
        </Link>

        <div className={sideNavHeader}>
          <Trans i18nKey="nav:filters">Filters</Trans>
        </div>

        <Link href="/my-list/favorites">
          <button className={subActive('favorites')}>
            <FavoriteIcon className="side-nav-icon" />{' '}
            <Trans i18nKey="nav:favorites">Favorites</Trans>
          </button>
        </Link>

        <Link href="/my-list/highlights">
          <button className={subActive('highlights')}>
            <HighlightIcon className="side-nav-icon" />{' '}
            <Trans i18nKey="nav:highlights">Highlights</Trans>
          </button>
        </Link>

        <Link href="/my-list/articles">
          <button className={subActive('articles')}>
            <ArticleIcon className="side-nav-icon" />{' '}
            <Trans i18nKey="nav:articles">Articles</Trans>
          </button>
        </Link>

        <Link href="/my-list/videos">
          <button className={subActive('videos')}>
            <VideoIcon className="side-nav-icon" />{' '}
            <Trans i18nKey="nav:videos">Videos</Trans>
          </button>
        </Link>
        <div className={sideNavHeader}>Tags</div>
        <Link href="/my-list/tags">
          <button className={subActive('tag')}>
            <TagIcon className="side-nav-icon" />{' '}
            <Trans i18nKey="nav:all-tags">All Tags</Trans>
          </button>
        </Link>
        {pinnedTags.length
          ? pinnedTags.map((tag) => {
              return (
                <Link href={`/my-list/tags/${tag}`} key={tag}>
                  <button className={subActive(tag, true)}>{tag}</button>
                </Link>
              )
            })
          : null}
      </nav>
      <div className="bottom-nav">
        <button
          onClick={scrollToTop}
          aria-label={t('nav:return-to-top', 'Return to top')}
          className={!inView ? 'visible' : 'hidden'}>
          <ChevronUpIcon />
        </button>
      </div>
    </div>
  )
}
