import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { FavoriteIcon } from 'components/icons/FavoriteIcon'
import { HighlightIcon } from 'components/icons/HighlightIcon'
import { TagIcon } from 'components/icons/TagIcon'
import { ArticleIcon } from 'components/icons/ArticleIcon'
import { ArchiveIcon } from 'components/icons/ArchiveIcon'
import { VideoIcon } from 'components/icons/VideoIcon'
import { PlaylistPlayIcon } from 'components/icons/PlaylistPlayIcon'
import { AddIcon } from 'components/icons/AddIcon'

import { sideNavHeader } from './side-nav'
import { sideNavActionHeader } from './side-nav'
import { bottomTooltip } from 'components/tooltip/tooltip'
import { buttonReset } from 'components/buttons/button-reset'

export function FiltersSideNav({
  subActive,
  pinned,
  clickEvent,
  inListsExperiment,
  handleCreateList
}) {
  const { t } = useTranslation()

  return (
    <>
      <h4 className={sideNavHeader}>{t('nav:filters', 'Filters')}</h4>

      <Link href="/saves/archive">
        <button className={subActive('archive')} onClick={clickEvent} data-cy="side-nav-archive">
          <ArchiveIcon className="side-nav-icon" /> {t('nav:archive', 'Archive')}
        </button>
      </Link>

      <Link href="/saves/favorites">
        <button
          className={subActive('favorites')}
          onClick={clickEvent}
          data-cy="side-nav-favorites">
          <FavoriteIcon className="side-nav-icon" /> {t('nav:favorites', 'Favorites')}
        </button>
      </Link>

      <Link href="/saves/highlights">
        <button
          className={subActive('highlights')}
          onClick={clickEvent}
          data-cy="side-nav-highlights">
          <HighlightIcon className="side-nav-icon" /> {t('nav:highlights', 'Highlights')}
        </button>
      </Link>

      <Link href="/saves/articles">
        <button className={subActive('articles')} onClick={clickEvent} data-cy="side-nav-articles">
          <ArticleIcon className="side-nav-icon" /> {t('nav:articles', 'Articles')}
        </button>
      </Link>

      <Link href="/saves/videos">
        <button className={subActive('videos')} onClick={clickEvent} data-cy="side-nav-videos">
          <VideoIcon className="side-nav-icon" /> {t('nav:videos', 'Videos')}
        </button>
      </Link>

      {inListsExperiment ? (
        <>
          <div className={sideNavActionHeader}>
            <h4 className={sideNavHeader}>Lists</h4>
            <button
              className={buttonReset}
              onClick={handleCreateList}
              data-cy="side-nav-create-list">
              <AddIcon className={bottomTooltip} data-tooltip="Create List" />
            </button>
          </div>
          <Link href="/lists">
            <button
              className={subActive('lists')}
              onClick={clickEvent}
              data-cy="side-nav-all-lists">
              <PlaylistPlayIcon className="side-nav-icon" /> All Lists
            </button>
          </Link>
        </>
      ) : null}

      <h4 className={sideNavHeader}>{t('nav:tags', 'Tags')}</h4>
      <Link href="/saves/tags">
        <button className={subActive('tag')} onClick={clickEvent} data-cy="side-nav-all-tags">
          <TagIcon className="side-nav-icon" /> {t('nav:all-tags', 'All Tags')}
        </button>
      </Link>
      {pinned.length
        ? pinned.map((tag) => (
            <Link href={`/saves/tags/${encodeURIComponent(tag)}`} key={tag}>
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
