import Link from 'next/link'

import { HomeIcon } from '@pocket/web-ui'
import { FavoriteIcon } from '@pocket/web-ui'
import { HighlightIcon } from '@pocket/web-ui'
import { TagIcon } from '@pocket/web-ui'
import { ArticleIcon } from '@pocket/web-ui'
import { ArchiveIcon } from '@pocket/web-ui'
import { VideoIcon } from '@pocket/web-ui'

import { css } from 'linaria'

export const sideNav = css`
  /* position: fixed;
  height: 100%;
  overflow: hidden; */
`

export const sideNavHeader = css`
  font-family: var(--fontSansSerif);
  font-size: var(--fontSize100);
  font-weight: 500;
  line-height: 0.8;
  padding: 20px 20px 10px;
  margin: 5px 0;
  color: var(--color-grey65); /* ! Don't use colors direct */
`

export const sideNavItem = css`
  display: flex;
  align-items: center;
  align-content: center;
  width: 100%;
  padding: 0 20px;
  font-size: var(--fontSize100);
  font-weight: 400;
  line-height: 16px;
  height: 40px;
  margin-bottom: 5px;
  border-radius: 4px;
  text-decoration: none;
  color: var(--color-textPrimary);
  background-color: transparent;

  .side-nav-icon {
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
    color: var(--color-actionPrimary);
    outline: 1px auto var(--color-navCurrentTab);
  }
  &.active {
    color: var(--color-actionPrimaryHover);
    background-color: var(--color-navCurrentTab);
  }
`

export function SideNav({ subset, home, isLoggedIn }) {
  const subActive = (sub) => {
    const activeClass = sub === subset ? 'active' : ''
    return `${sideNavItem} ${activeClass}`
  }

  return (
    <nav role="navigation" className="side-nav">
      <Link href="/my-list">
        <button className={subActive('unread')}>
          <HomeIcon className="side-nav-icon" /> My List
        </button>
      </Link>
      <Link href="/my-list/archive">
        <button className={subActive('archive')}>
          <ArchiveIcon className="side-nav-icon" /> Archive
        </button>
      </Link>
      <Link href="/my-list/tags">
        <button className={subActive('tags')}>
          <TagIcon className="side-nav-icon" /> Tags
        </button>
      </Link>
      <div className={sideNavHeader}>Filters</div>

      <Link href="/my-list/favorites">
        <button className={subActive('favorites')}>
          <FavoriteIcon className="side-nav-icon" /> Favorites
        </button>
      </Link>

      <Link href="/my-list/highlights">
        <button className={subActive('highlights')}>
          <HighlightIcon className="side-nav-icon" /> Highlights
        </button>
      </Link>

      <Link href="/my-list/articles">
        <button className={subActive('articles')}>
          <ArticleIcon className="side-nav-icon" /> Articles
        </button>
      </Link>

      <Link href="/my-list/videos">
        <button className={subActive('videos')}>
          <VideoIcon className="side-nav-icon" /> Videos
        </button>
      </Link>
    </nav>
  )
}
