import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { FavoriteIcon } from '@ui/icons/FavoriteIcon'
import { HighlightIcon } from '@ui/icons/HighlightIcon'
import { ArticleIcon } from '@ui/icons/ArticleIcon'
import { ArchiveIcon } from '@ui/icons/ArchiveIcon'
import { VideoIcon } from '@ui/icons/VideoIcon'
import { AddIcon } from '@ui/icons/AddIcon'

import { sideNavHeader } from './side-nav'
import { bottomTooltip } from 'components/tooltip/tooltip'
import { buttonReset } from 'components/buttons/button-reset'

export function FiltersSideNav({ subActive, pinned, clickEvent, handleCreateList, recentLists }) {
  const { t } = useTranslation()

  const listNames = recentLists ? Object.keys(recentLists).slice(0, 3) : []

  return (
    <>
      <h4 className={sideNavHeader}>
        <Link href="/lists" legacyBehavior>
          {t('nav:my-collections', 'My Collections')}
        </Link>
        <button
          className={`${buttonReset} ${bottomTooltip} inline`}
          onClick={handleCreateList}
          data-testid="side-nav-create-list"
          data-tooltip-delay={true}
          data-tooltip={t('nav:create-collection', 'Create Collection')}>
          <AddIcon />
        </button>
      </h4>

      {listNames.length
        ? listNames.map((title) => (
            <Link href={`/lists/${recentLists[title]}`} key={recentLists[title]} legacyBehavior>
              <button
                className={subActive(recentLists[title], true)}
                onClick={clickEvent}
                data-testid={`side-nav-lists-${recentLists[title]}`}>
                {title}
              </button>
            </Link>
          ))
        : null}

      <h4 className={sideNavHeader}>{t('nav:filters', 'Filters')}</h4>

      <Link href="/saves/archive" legacyBehavior>
        <button
          className={subActive('archive')}
          onClick={clickEvent}
          data-testid="side-nav-archive">
          <ArchiveIcon className="side-nav-icon" /> {t('nav:archive', 'Archive')}
        </button>
      </Link>

      <Link href="/saves/favorites" legacyBehavior>
        <button
          className={subActive('favorites')}
          onClick={clickEvent}
          data-testid="side-nav-favorites">
          <FavoriteIcon className="side-nav-icon" /> {t('nav:favorites', 'Favorites')}
        </button>
      </Link>

      <Link href="/saves/highlights" legacyBehavior>
        <button
          className={subActive('highlights')}
          onClick={clickEvent}
          data-testid="side-nav-highlights">
          <HighlightIcon className="side-nav-icon" /> {t('nav:highlights', 'Highlights')}
        </button>
      </Link>

      <Link href="/saves/articles" legacyBehavior>
        <button
          className={subActive('articles')}
          onClick={clickEvent}
          data-testid="side-nav-articles">
          <ArticleIcon className="side-nav-icon" /> {t('nav:articles', 'Articles')}
        </button>
      </Link>

      <Link href="/saves/videos" legacyBehavior>
        <button className={subActive('videos')} onClick={clickEvent} data-testid="side-nav-videos">
          <VideoIcon className="side-nav-icon" /> {t('nav:videos', 'Videos')}
        </button>
      </Link>

      <h4 className={sideNavHeader}>
        <Link href="/saves/tags" legacyBehavior className={subActive('tags')}>
          <a data-testid="side-nav-all-tags" onClick={clickEvent}>
            {t('nav:tags', 'Tags')}
          </a>
        </Link>
      </h4>
      {pinned.length
        ? pinned.map((tag) => (
            <Link href={`/saves/tags/${encodeURIComponent(tag)}`} key={tag} legacyBehavior>
              <button
                className={subActive(tag, true)}
                onClick={clickEvent}
                data-testid={`side-nav-tags-${tag}`}>
                {tag}
              </button>
            </Link>
          ))
        : null}
    </>
  )
}
