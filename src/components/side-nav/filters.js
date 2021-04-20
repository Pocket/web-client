import Link from 'next/link'
import { Trans } from 'next-i18next'
import { css } from 'linaria'

import { FavoriteIcon } from '@pocket/web-ui'
import { HighlightIcon } from '@pocket/web-ui'
import { TagIcon } from '@pocket/web-ui'
import { ArticleIcon } from '@pocket/web-ui'
import { ArchiveIcon } from '@pocket/web-ui'
import { VideoIcon } from '@pocket/web-ui'

import { sideNavHeader } from './side-nav'

export function FiltersSideNav({
  showLab,
  subActive,
  pinnedTags,
  clickEvent
}) {
  return (
    <>
      <div className={sideNavHeader}>
        <Trans i18nKey="nav:filters">Filters</Trans>
      </div>

      {showLab ? (
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

      <Link href="/my-list/favorites">
        <button
          className={subActive('favorites')}
          onClick={clickEvent}
          data-cy="side-nav-favorites">
          <FavoriteIcon className="side-nav-icon" />{' '}
          <Trans i18nKey="nav:favorites">Favorites</Trans>
        </button>
      </Link>

      <Link href="/my-list/highlights">
        <button
          className={subActive('highlights')}
          onClick={clickEvent}
          data-cy="side-nav-highlights">
          <HighlightIcon className="side-nav-icon" />{' '}
          <Trans i18nKey="nav:highlights">Highlights</Trans>
        </button>
      </Link>

      <Link href="/my-list/articles">
        <button
          className={subActive('articles')}
          onClick={clickEvent}
          data-cy="side-nav-articles">
          <ArticleIcon className="side-nav-icon" />{' '}
          <Trans i18nKey="nav:articles">Articles</Trans>
        </button>
      </Link>

      <Link href="/my-list/videos">
        <button
          className={subActive('videos')}
          onClick={clickEvent}
          data-cy="side-nav-videos">
          <VideoIcon className="side-nav-icon" />{' '}
          <Trans i18nKey="nav:videos">Videos</Trans>
        </button>
      </Link>
      <div className={sideNavHeader}>Tags</div>
      <Link href="/my-list/tags">
        <button
          className={subActive('tag')}
          onClick={clickEvent}
          data-cy="side-nav-all-tags">
          <TagIcon className="side-nav-icon" />{' '}
          <Trans i18nKey="nav:all-tags">All Tags</Trans>
        </button>
      </Link>
      {pinnedTags.length
        ? pinnedTags.map((tag) => (
            <Link href={`/my-list/tags/${tag}`} key={tag}>
              <button
                className={subActive(tag, true)}
                onClick={clickEvent}
                data-cy={`side-nav-tags-${tag}`}>{tag}</button>
            </Link>
          ))
        : null}
    </>
  )
}
