import Link from 'next/link'

import { HomeIcon } from '@pocket/web-ui'
import { DiscoverIcon } from '@pocket/web-ui'
import { ArticleIcon } from '@pocket/web-ui'
import { ArchiveIcon } from '@pocket/web-ui'

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
      <a href="/">
        <button className={subActive('home')}>
          <HomeIcon className="side-nav-icon" /> Home
        </button>
      </a>

      <a href="/discover">
        <button className={subActive('discover')}>
          <DiscoverIcon className="side-nav-icon" /> Discover
        </button>
      </a>

      <a href="/my-list">
        <button className={subActive('unread')}>
          <ArticleIcon className="side-nav-icon" /> My List
        </button>
      </a>
      {isLoggedIn ? (
        <>
          <div className={sideNavHeader}>Quick Links</div>

          <Link href="/my-list/archive">
            <button className={subActive('archive')}>Archive</button>
          </Link>

          <Link href="/my-list/favorites">
            <button className={subActive('favorites')}>Favorites</button>
          </Link>

          <Link href="/my-list/highlights">
            <button className={subActive('highlights')}>Highlights</button>
          </Link>

          {/* <Link href="/my-list/tags">
        <button className={subActive('tags')}>Tags</button>
      </Link> */}

          <Link href="/my-list/articles">
            <button className={subActive('articles')}>Articles</button>
          </Link>

          <Link href="/my-list/videos">
            <button className={subActive('videos')}>Videos</button>
          </Link>
        </>
      ) : null}
    </nav>
  )
}
