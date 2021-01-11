import Link from 'next/link'

import { HomeIcon } from '@pocket/web-ui'
import { FavoriteIcon } from '@pocket/web-ui'
import { HighlightIcon } from '@pocket/web-ui'
import { TagIcon } from '@pocket/web-ui'
import { ArticleIcon } from '@pocket/web-ui'
import { ArchiveIcon } from '@pocket/web-ui'
import { VideoIcon } from '@pocket/web-ui'
import { ChevronUpIcon } from '@pocket/web-ui'

import { css, cx } from 'linaria'

export const sideNavWrapper = css`
  position: relative;
  grid-column: span 2;
  min-height: 50vh;
  max-width: 165px;
  &.disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  .top-nav {
    /* position: fixed; */
  }
  .bottom-nav {
    margin: 0 auto;
    max-width: 1128px;
    position: fixed;
    bottom: 50px;
    .icon {
      cursor: pointer;
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
  color: var(--color-textTertiary);
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

export function SideNav({ subset, tag, pinnedTags, isDisabled }) {
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

  const wrapperClass = cx(sideNavWrapper, isDisabled && 'disabled')

  return (
    <div className={wrapperClass}>
      <nav role="navigation" className="top-nav">
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
        <div className={sideNavHeader}>Tags</div>
        <Link href="/my-list/tags">
          <button className={subActive('tag')}>
            <TagIcon className="side-nav-icon" /> All Tags
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
        <ChevronUpIcon onClick={scrollToTop} />
      </div>
    </div>
  )
}
