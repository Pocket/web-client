import { css, cx } from '@emotion/css'
import { ChevronDownIcon } from '@ui/icons/ChevronDownIcon'
import { usePopover, popoverBase } from 'components/popover/popover'
import { buttonReset } from 'components/buttons/button-reset'
import Link from 'next/link'
import { Trans, useTranslation } from 'next-i18next'

// i.e., h3
const filterStyle = css`
  position: relative;
  font-style: normal;
  font-weight: 300;
  padding-left: 1.5rem;
  display: inline-flex;
  vertical-align: center;
  align-items: center;
  align-content: center;
  font-size: var(--fontSize085);

  .filter-menu button {
    display: flex;
    align-items: center;
    align-content: center;
    width: 100%;
    padding: 0 20px 0 30px;
    font-size: var(--fontSize085);
    font-weight: 300;
    line-height: 1.25;
    height: 30px;
    margin-bottom: 5px;
    border-radius: 4px;
    text-decoration: none;
    color: var(--color-textPrimary);
    background-color: transparent;
    white-space: nowrap;

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
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" fillRule="evenodd" d="M21.707 5.293a1 1 0 010 1.414l-12 12a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 16.586 20.293 5.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>');
      background-repeat: no-repeat;
      background-position: 10px 9px;
      background-size: 1em;
    }
  }

  .filter-trigger {
    cursor: pointer;
    outline-offset: 4px;
  }
  .filter-menu {
    ${popoverBase};
  }
`

export function FilterMenu({ subset, filter, tag, query }) {
  const { t } = useTranslation()

  const hasFilter = ['search', 'favorites', 'highlights', 'articles', 'videos', 'tag'].includes(
    subset
  )

  const filterActive = (filterLink) => {
    const activeClass = filterLink === filter ? 'active' : ''
    return `${activeClass}`
  }

  const filterTitles = {
    unread: t('nav:saves', 'Saves'),
    archive: t('nav:archive', 'Archive'),
    favorites: t('nav:favorites', 'Favorites')
  }
  const activeTitle = filterTitles[filter] || t('nav:all-items', 'All items')

  // Popover Effect
  const { popTrigger, popBody, shown } = usePopover({
    placement: 'bottom-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [-20, -26]
        }
      }
    ]
  })

  const path = tag ? `tags/${encodeURIComponent(tag)}` : subset
  const searchQuery = query ? `?query=${query}` : ''

  return hasFilter ? (
    <div className={cx(filterStyle, 'filter-wrapper')}>
      <button
        ref={popTrigger}
        data-testid="filter-trigger"
        className={cx(buttonReset, 'filter-trigger')}>
        {activeTitle}
        <ChevronDownIcon style={{ marginTop: 0, paddingLeft: '3px' }} />
      </button>
      {shown ? (
        <div className="filter-menu" ref={popBody}>
          <div>
            <Link href={`/saves/${path}${searchQuery}`} legacyBehavior>
              <button className={filterActive()} data-testid="filter-all-items">
                <Trans i18nKey="nav:all-items">All items</Trans>
              </button>
            </Link>
          </div>
          <div>
            <Link href={`/saves/${path}/unread${searchQuery}`} legacyBehavior>
              <button className={filterActive('unread')} data-testid="filter-saves">
                <Trans i18nKey="nav:saves">Saves</Trans>
              </button>
            </Link>
          </div>
          <div>
            <Link href={`/saves/${path}/archive${searchQuery}`} legacyBehavior>
              <button className={filterActive('archive')} data-testid="filter-archive">
                <Trans i18nKey="nav:archive">Archive</Trans>
              </button>
            </Link>
          </div>
          {path === 'favorites' || subset === 'search' ? null : (
            <div>
              <Link href={`/saves/${path}/favorites`} legacyBehavior>
                <button className={filterActive('favorites')} data-testid="filter-favorites">
                  <Trans i18nKey="nav:favorites">Favorites</Trans>
                </button>
              </Link>
            </div>
          )}
        </div>
      ) : null}
    </div>
  ) : null
}
