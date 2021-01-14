import { css } from 'linaria'
import { ChevronDownIcon } from '@pocket/web-ui'
import { capitalizeFirstLetter } from 'common/utilities'
import { usePopover, popoverBase } from 'components/popover/popover'
import Link from 'next/link'

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
  color: var(--color-dividerSecondary);
  font-size: var(--fontSize085);

  button {
    display: flex;
    align-items: center;
    align-content: center;
    width: 100%;
    padding: 0 20px 0 30px;
    font-size: var(--fontSize085);
    font-weight: 300;
    color: var(--color-dividerSecondary);
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
    <div className={filterStyle}>
      <span ref={popTrigger} className="filter-trigger">
        {capitalizeFirstLetter(activeTitle)}
        <ChevronDownIcon style={{ marginTop: 0, paddingLeft: '3px' }} />
      </span>
      {shown ? (
        <div className="filter-menu" ref={popBody}>
          <div>
            <Link href={`/my-list/${path}`}>
              <button className={filterActive()}>All items</button>
            </Link>
          </div>
          <div>
            <Link href={`/my-list/${path}/unread`}>
              <button className={filterActive('unread')}>Unread</button>
            </Link>
          </div>
          <div>
            <Link href={`/my-list/${path}/archive`}>
              <button className={filterActive('archive')}>Archive</button>
            </Link>
          </div>
          {path === 'favorites' ? null : (
            <div>
              <Link href={`/my-list/${path}/favorites`}>
                <button className={filterActive('favorites')}>Favorites</button>
              </Link>
            </div>
          )}
        </div>
      ) : null}
    </div>
  ) : null
}
