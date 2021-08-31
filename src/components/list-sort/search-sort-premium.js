import { css, cx } from 'linaria'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { SortByNewestIcon } from '@pocket/web-ui'
import { SortByOldestIcon } from '@pocket/web-ui'
import { RelevanceIcon } from '@pocket/web-ui'
import { buttonReset } from 'components/buttons/button-reset'
import { useTranslation } from 'next-i18next'
import { PopupMenu, PopupMenuItem } from '@pocket/web-ui'
import { sortOrderSetNew, sortOrderSetOld, sortOrderSetRelevance } from 'connectors/app/app.state'

const sortStyles = css`
  display: inline-block;
  margin-left: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: var(--borderRadius);
  border: 2px solid var(--color-canvas);

  &:hover {
    color: var(--color-textLinkHover);
  }

  .icon {
    height: 1.5rem;
    width: 1.5rem;
  }
`

export const SearchSortPremium = ({ sortOrder = 'newest' }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const appRootSelector = '#__next'

  const sortOptionsRef = useRef(null)

  const sortIcon = {
    'newest': <SortByNewestIcon />,
    'oldest': <SortByOldestIcon />,
    'relevance': <RelevanceIcon />
  }

  const handleNewest = () => dispatch(sortOrderSetNew())
  const handleOldest = () => dispatch(sortOrderSetOld())
  const handleRelevance = () => dispatch(sortOrderSetRelevance())

  return (
    <div>
      <button
        ref={sortOptionsRef}
        className={cx(buttonReset, sortStyles)}>
        {sortIcon[sortOrder]}
      </button>
      <PopupMenu
        trigger={sortOptionsRef}
        title={t('settings:search-sort-options', 'Search sort options')}
        screenReaderLabel={t('settings:search-sort-options', 'Search sort options')}
        appRootSelector={appRootSelector}
        data-cy='search-sort-options'
        popperOptions={{
          placement: 'bottom-end',
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 4]
              }
            }
          ]
        }}>
        <PopupMenuItem
          data-cy="search-sort-oldest"
          onClick={handleOldest}>
            <SortByOldestIcon />
            {t('settings:search-sort-oldest', 'Oldest first')}
        </PopupMenuItem>
        <PopupMenuItem
          data-cy="search-sort-newest"
          onClick={handleNewest}>
            <SortByNewestIcon />
            {t('settings:search-sort-newest', 'Newest first')}
        </PopupMenuItem>
        <PopupMenuItem
          data-cy="search-sort-relevance"
          onClick={handleRelevance}>
            <RelevanceIcon />
            {t('settings:search-sort-relevance', 'By relevance')}
        </PopupMenuItem>
      </PopupMenu>
    </div>
  )
}
