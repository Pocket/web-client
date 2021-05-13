import { css, cx } from 'linaria'
import { ChevronDownIcon } from '@pocket/web-ui'
import { capitalizeFirstLetter } from 'common/utilities'
import { usePopover, popoverBase } from 'components/popover/popover'
import { buttonReset } from 'components/buttons/button-reset'
import Link from 'next/link'
import { Trans } from 'next-i18next'

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

export function FilterMenu({ subset, filter, tag }) {
  const hasFilter = [
    'favorites',
    'highlights',
    'articles',
    'videos',
    'tag'
  ].includes(subset)

  const filterActive = (filterLink) => {
    const activeClass = filterLink === filter ? 'active' : ''
    return `${activeClass}`
  }

  const activeTitle = filter ? filter : 'All items'

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

  const path = tag ? `tags/${tag}` : subset

  return hasFilter ? (
    <div className={cx(filterStyle, 'filter-wrapper')}>
      <button ref={popTrigger} className={cx(buttonReset, 'filter-trigger')}>
        {capitalizeFirstLetter(activeTitle)}
        <ChevronDownIcon style={{ marginTop: 0, paddingLeft: '3px' }} />
      </button>
      {shown ? (
        <div className="filter-menu" ref={popBody}>
          <div>
            <Link href={`/my-list/${path}`}>
              <button className={filterActive()} data-cy="filter-all-items">
                <Trans i18nKey="nav:all-items">All items</Trans>
              </button>
            </Link>
          </div>
          <div>
            <Link href={`/my-list/${path}/unread`}>
              <button className={filterActive('unread')} data-cy="filter-unread">
                <Trans i18nKey="nav:unread">Unread</Trans>
              </button>
            </Link>
          </div>
          <div>
            <Link href={`/my-list/${path}/archive`}>
              <button className={filterActive('archive')} data-cy="filter-archive">
                <Trans i18nKey="nav:archive">Archive</Trans>
              </button>
            </Link>
          </div>
          {path === 'favorites' ? null : (
            <div>
              <Link href={`/my-list/${path}/favorites`}>
                <button className={filterActive('favorites')} data-cy="filter-favorites">
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
