import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { FavoriteIcon } from '@ui/icons/FavoriteIcon'
import { HighlightIcon } from '@ui/icons/HighlightIcon'
import { TagIcon } from '@ui/icons/TagIcon'
import { ArticleIcon } from '@ui/icons/ArticleIcon'
import { ArchiveIcon } from '@ui/icons/ArchiveIcon'
import { VideoIcon } from '@ui/icons/VideoIcon'
import { AddIcon } from '@ui/icons/AddIcon'
import { ListViewAltIcon } from '@ui/icons/ListViewAltIcon'
import { ListViewAltFilledIcon } from '@ui/icons/ListViewAltFilledIcon'

import { sideNavHeader } from './side-nav'
import { sideNavActionHeader } from './side-nav'
import { bottomTooltip } from 'components/tooltip/tooltip'
import { buttonReset } from 'components/buttons/button-reset'

export function FiltersSideNav({ subActive, pinned, clickEvent, handleCreateList, recentLists }) {
  const { t } = useTranslation()

  const listNames = recentLists ? Object.keys(recentLists).slice(0, 3) : []

  return (
    <>
      <div className={sideNavActionHeader}>
        <h4 className={sideNavHeader}>{t('nav:lists', 'Lists')}</h4>
        <button
          className={buttonReset}
          onClick={handleCreateList}
          data-testid="side-nav-create-list">
          <AddIcon
            className={`${bottomTooltip} small`}
            data-tooltip={t('nav:create-list', 'Create List')}
          />
        </button>
      </div>
      <Link href="/lists" legacyBehavior>
        <button
          className={subActive('lists')}
          onClick={clickEvent}
          data-testid="side-nav-all-lists">
          <ListViewAltIcon className="side-nav-icon inactive" />
          <ListViewAltFilledIcon className="side-nav-icon active" />
          {t('nav:all-lists', 'All Lists')}
        </button>
      </Link>
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

      <h4 className={sideNavHeader}>{t('nav:tags', 'Tags')}</h4>
      <Link href="/saves/tags" legacyBehavior>
        <button className={subActive('tag')} onClick={clickEvent} data-testid="side-nav-all-tags">
          <TagIcon className="side-nav-icon" /> {t('nav:all-tags', 'All Tags')}
        </button>
      </Link>
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
