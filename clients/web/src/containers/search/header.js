import { css } from '@emotion/css'
import { breakpointLargeTablet } from 'common/constants'
import { breakpointSmallHandset } from 'common/constants'
import { breakpointLargeHandset } from 'common/constants'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { savedItemsSetSortOrder } from 'containers/saves/saved-items/saved-items.state'
import { savedItemsSetSortBy } from 'containers/saves/saved-items/saved-items.state'
import { SearchFilterMenu } from 'components/list-filter-menu/search-filter-menu'
import { ListSort } from 'components/list-sort/list-sort'
import { useDispatch } from 'react-redux'

const searchStyles = css`
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-dividerTertiary);

  h1 {
    font-style: normal;
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 1.2;
    letter-spacing: -0.005em;
    margin-bottom: 1rem;

    ${breakpointLargeTablet} {
      font-size: 2rem;
    }

    ${breakpointLargeHandset} {
      font-size: 1.5rem;
    }

    ${breakpointSmallHandset} {
      font-size: 1.25rem;
    }
  }

  .filter-wrapper {
    flex-grow: 1;
  }

  .query {
    text-transform: capitalize;
  }
  ${breakpointLargeTablet} {
    flex-wrap: wrap;

    .filter-wrapper {
      margin-bottom: 1rem;
      padding-left: 0;
      order: 3;
      width: 100%;
    }
  }
  .sourceBar {
    display: flex;
    justify-content: space-between;
    a {
      text-decoration: none;
      display: inline-block;
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1.25;
      padding: 0.875rem 0.5rem;
      border-bottom: 4px solid transparent;

      &.active {
        color: var(--color-navCurrentTabText);
        border-color: var(--color-navCurrentTabText);
      }
    }
  }
`

export const SearchPageHeader = ({
  total,
  loading,
  query,
  searchType,
  filter,
  sortOrder,
  isPremium
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleNewest = () => dispatch(savedItemsSetSortOrder('DESC'))
  const handleOldest = () => dispatch(savedItemsSetSortOrder('ASC'))
  const handleRelevance = () => dispatch(savedItemsSetSortBy('RELEVANCE'))

  return query ? (
    <header className={searchStyles}>
      <h1 className="pageTitle" data-testid="page-title">
        {loading ? (
          <span>{t('search:searching', 'Searching')}</span>
        ) : (
          <span>{t('search:search-results', 'search results')}</span>
        )}
        <em data-testid="search-query" className="query">
          {' '}
          — “{query}”
        </em>
      </h1>
      <div className="sourceBar">
        <div>
          <Link className={searchType === 'all' ? 'active' : ''} href={`/search?q=${query}&st=all`}>
            All of Pocket
          </Link>{' '}
          <Link
            className={searchType === 'saves' ? 'active' : ''}
            href={`/search?q=${query}&st=saves`}>
            Only My Saves
          </Link>
          {searchType === 'saves' ? (
            <SearchFilterMenu
              subset="search"
              query={query}
              filter={filter}
              sortOrder={sortOrder}
              total={total}
            />
          ) : null}
        </div>
        {searchType === 'saves' ? (
          <ListSort
            query={query}
            filter={filter}
            showRelevance={isPremium}
            sortOrder={sortOrder}
            handleNewest={handleNewest}
            handleOldest={handleOldest}
            handleRelevance={handleRelevance}
          />
        ) : null}
      </div>
    </header>
  ) : null
}
