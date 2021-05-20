import { css, cx } from 'linaria'
import { breakpointSmallHandset } from '@pocket/web-ui'
import { breakpointLargeHandset } from '@pocket/web-ui'
import { breakpointLargeTablet } from '@pocket/web-ui'
import { FilterMenu } from 'components/list-filter-menu/list-filter-menu'
import { Trans } from 'next-i18next'
import { Loader } from 'components/loader/loader'
import { ListSort } from 'components/list-sort/list-sort'
import { myListHeaderStyle } from './my-list-header'

const searchStyles = css`
  ${breakpointLargeTablet} {
    flex-wrap: wrap;

    .filter-wrapper {
      margin-bottom: 1rem;
      padding-left: 0;
      order: 3;
      width: 100%;
    }
  }
`

export const SearchPageHeader = ({ filter, total, query, sortOrder, toggleSortOrder }) => {
  const isLoading = total === false
  return query ? (
    <header className={cx(myListHeaderStyle, searchStyles)}>
      <h1 className="pageTitle">
        <em>"{query}"</em> —{' '}
        {isLoading ? (
          <span>
            Searching <Loader />{' '}
          </span>
        ) : (
          <span>
            {total || 0}{' '}
            <Trans i18nKey="search:search-results">Search Results</Trans>
          </span>
        )}
      </h1>
      <FilterMenu subset="search" query={query} filter={filter} />
      <ListSort toggleSortOrder={toggleSortOrder} sortOrder={sortOrder} />
    </header>
  ) : null
}
