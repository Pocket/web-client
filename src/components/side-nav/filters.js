import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { FavoriteIcon } from 'components/icons/FavoriteIcon'
import { HighlightIcon } from 'components/icons/HighlightIcon'
import { TagIcon } from 'components/icons/TagIcon'
import { ArticleIcon } from 'components/icons/ArticleIcon'
import { ArchiveIcon } from 'components/icons/ArchiveIcon'
import { VideoIcon } from 'components/icons/VideoIcon'

import { sideNavHeader } from './side-nav'

export function FiltersSideNav({ subActive, pinned, clickEvent }) {
  const { t } = useTranslation()

  return (
    <>
      <div className={sideNavHeader}>{t('nav:filters', 'Filters')}</div>

      <Link href="/my-list/archive">
        <button className={subActive('archive')} onClick={clickEvent} data-cy="side-nav-archive">
          <ArchiveIcon className="side-nav-icon" /> {t('nav:archive', 'Archive')}
        </button>
      </Link>

      <Link href="/my-list/favorites">
        <button
          className={subActive('favorites')}
          onClick={clickEvent}
          data-cy="side-nav-favorites">
          <FavoriteIcon className="side-nav-icon" /> {t('nav:favorites', 'Favorites')}
        </button>
      </Link>

      <Link href="/my-list/highlights">
        <button
          className={subActive('highlights')}
          onClick={clickEvent}
          data-cy="side-nav-highlights">
          <HighlightIcon className="side-nav-icon" /> {t('nav:highlights', 'Highlights')}
        </button>
      </Link>

      <Link href="/my-list/articles">
        <button className={subActive('articles')} onClick={clickEvent} data-cy="side-nav-articles">
          <ArticleIcon className="side-nav-icon" /> {t('nav:articles', 'Articles')}
        </button>
      </Link>

      <Link href="/my-list/videos">
        <button className={subActive('videos')} onClick={clickEvent} data-cy="side-nav-videos">
          <VideoIcon className="side-nav-icon" /> {t('nav:videos', 'Videos')}
        </button>
      </Link>
      <div className={sideNavHeader}>{t('nav:tags', 'Tags')}</div>
      <Link href="/my-list/tags">
        <button className={subActive('tag')} onClick={clickEvent} data-cy="side-nav-all-tags">
          <TagIcon className="side-nav-icon" /> {t('nav:all-tags', 'All Tags')}
        </button>
      </Link>
      {pinned.length
        ? pinned.map((tag) => (
            <Link href={`/my-list/tags/${encodeURIComponent(tag)}`} key={tag}>
              <button
                className={subActive(tag, true)}
                onClick={clickEvent}
                data-cy={`side-nav-tags-${tag}`}>
                {tag}
              </button>
            </Link>
          ))
        : null}
    </>
  )
}
